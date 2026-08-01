import express from "express";
import nodemailer from "nodemailer";
import { Resend } from "resend";
import dotenv from "dotenv";
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

dotenv.config();

const app = express();

// Initialize Admin SDK Lazily and Safely
function initAdminSDK() {
  if (getApps().length) return true;

  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const projectId = process.env.FIREBASE_PROJECT_ID;
  
  if (!clientEmail || !privateKey || !projectId) {
    console.warn("FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY or FIREBASE_PROJECT_ID not set. Admin features limited.");
    return false;
  }

  try {
    // Basic validation of the private key format to avoid Firebase SDK crash
    if (!privateKey.includes('BEGIN PRIVATE KEY')) {
      throw new Error('Invalid FIREBASE_PRIVATE_KEY format. Must be a valid PEM string.');
    }

    initializeApp({
      credential: cert({
        projectId: projectId,
        clientEmail: clientEmail,
        privateKey: privateKey,
      })
    });
    console.log("Firebase Admin SDK initialized successfully.");
    return true;
  } catch (err: any) {
    console.error("CRITICAL: Failed to initialize Firebase Admin SDK:", err.message);
    return false;
  }
}

// Call check during load, but ignore failure (failure will be handled at runtime in routes)
initAdminSDK();

let smtpTransporter: nodemailer.Transporter | null = null;

function getSmtpTransporter() {
  if (!smtpTransporter) {
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!user || !pass) {
      console.warn("SMTP_USER or SMTP_PASS not set. Email simulation mode.");
      return null;
    }

    smtpTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: user,
        pass: pass // This MUST be a Gmail "App Password"
      }
    });
  }
  return smtpTransporter;
}

// --- Resend (primary email provider) ---
let resendClient: Resend | null = null;
function getResend(): Resend | null {
  if (!resendClient && process.env.RESEND_API_KEY) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
}

// Verified sender. Use your verified domain (e.g. "Kyventis Tech <hello@kyventis.tech>").
// The Resend sandbox "onboarding@resend.dev" only delivers to the account owner.
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL || "Kyventis Tech <onboarding@resend.dev>";

type MailArgs = {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
};

/**
 * Sends an email via Resend when RESEND_API_KEY is set, otherwise falls back
 * to Gmail SMTP, and finally to a no-op simulation in local/dev.
 */
async function deliverEmail({ to, subject, html, replyTo }: MailArgs) {
  const resend = getResend();
  if (resend) {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      replyTo,
    });
    if (error) throw new Error(error.message || "Resend send failed");
    return { provider: "resend" as const, id: data?.id };
  }

  const transporter = getSmtpTransporter();
  if (transporter) {
    await transporter.sendMail({
      from: `"Kyventis Tech" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
      replyTo,
    });
    return { provider: "smtp" as const };
  }

  console.log(`[email] simulated send -> ${to} :: ${subject}`);
  return { provider: "simulated" as const };
}

// Escape user-supplied text before embedding it in HTML emails.
function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Brand-styled email shell (amethyst + copper).
function brandEmail(heading: string, bodyHtml: string): string {
  return `<div style="margin:0;padding:24px;background:#120a24;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <div style="max-width:560px;margin:0 auto;background:#1a0f33;border:1px solid #2a1b4e;border-radius:20px;overflow:hidden;">
      <div style="padding:28px 32px;background:linear-gradient(120deg,#2a1b4e,#120a24);border-bottom:1px solid #2a1b4e;">
        <span style="font-size:22px;font-weight:800;color:#f4f1de;letter-spacing:-0.5px;">Kyventis <span style="color:#e07a5f;">Tech</span></span>
      </div>
      <div style="padding:32px;color:#e9e5d6;line-height:1.7;">
        <h1 style="margin:0 0 16px;font-size:20px;color:#f4f1de;">${heading}</h1>
        ${bodyHtml}
      </div>
      <div style="padding:20px 32px;border-top:1px solid #2a1b4e;font-size:12px;color:#8a83a0;">
        <p style="margin:0;">&copy; ${new Date().getFullYear()} Kyventis Tech · Engineering Precision. Creative Artistry.</p>
      </div>
    </div>
  </div>`;
}

// Basic Security Headers
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  next();
});

app.use(express.json());

// 0. Simple In-Memory Rate Limiter
const emailRateLimit = new Map<string, number[]>();
const staffRateLimit = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_EMAILS_PER_WINDOW = 5;
const MAX_STAFF_CREATIONS_PER_WINDOW = 10;

function isRateLimited(ip: string, map: Map<string, number[]>, limit: number): boolean {
  const now = Date.now();
  const timestamps = map.get(ip) || [];
  const recentTimestamps = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW);
  
  if (recentTimestamps.length >= limit) {
    return true;
  }
  
  recentTimestamps.push(now);
  map.set(ip, recentTimestamps);
  return false;
}

// API Route: Create Staff Account (Admin only)
app.post("/api/create-staff", async (req, res) => {
  const ip = req.ip || req.headers['x-forwarded-for']?.toString() || 'unknown';
  
  if (isRateLimited(ip, staffRateLimit, MAX_STAFF_CREATIONS_PER_WINDOW)) {
    return res.status(429).json({ error: "Too many staff creations. Try again later." });
  }

  const { email, password, name, role, phone } = req.body;

  if (!initAdminSDK()) {
    return res.status(503).json({ error: "Firebase Admin is not configured. Please ensure FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY are set correctly in Settings." });
  }

  try {
    console.log(`[Staff Creation] Starting creation for: ${email}`);
    
    // 1. Create User in Auth
    let userRecord;
    try {
      userRecord = await getAuth().createUser({
        email,
        password,
        displayName: name,
      });
      console.log(`[Staff Creation] Auth user created: ${userRecord.uid}`);
    } catch (authErr: any) {
      console.error("[Staff Creation] Auth error:", authErr);
      return res.status(400).json({ error: `Auth Error: ${authErr.message}` });
    }

    // 2. Create entry in users collection
    try {
      const dbId = process.env.FIREBASE_DATABASE_ID || process.env.VITE_FIREBASE_FIRESTORE_DATABASE_ID;
      const db = getFirestore(undefined, dbId);
      await db.collection('users').doc(userRecord.uid).set({
        name,
        email,
        role,
        phone_number: phone || '',
        status: 'Active',
        created_at: FieldValue.serverTimestamp()
      });
      console.log(`[Staff Creation] Firestore entry created for: ${userRecord.uid}`);
    } catch (fsErr: any) {
      console.error("[Staff Creation] Firestore error:", fsErr);
      return res.status(500).json({ error: `Database Error: ${fsErr.message}` });
    }

    res.json({ success: true, userId: userRecord.uid });
  } catch (err: any) {
    console.error("[Staff Creation] General Error:", err);
    res.status(500).json({ error: "Internal server error during staff creation." });
  }
});

// API Route: Send Email
app.post("/api/send-email", async (req, res) => {
  const ip = req.ip || req.headers['x-forwarded-for']?.toString() || 'unknown';
  
  if (isRateLimited(ip, emailRateLimit, MAX_EMAILS_PER_WINDOW)) {
    return res.status(429).json({ error: "Too many email requests. Please try again in an hour." });
  }

  const { to, subject, message } = req.body;

  // 1. Basic Security: Input Validation
  if (!to || !subject || !message) {
    return res.status(400).json({ error: "Missing required fields: to, subject, and message are all required." });
  }

  // 2. Email Format Validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(to)) {
    return res.status(400).json({ error: "Invalid email format." });
  }

  // 3. Message Length Validation
  if (message.length > 5000) {
    return res.status(400).json({ error: "Message too long (max 5000 characters)." });
  }

  try {
    const html = brandEmail(
      "Kyventis Tech Notification",
      `<p style="margin:0 0 8px;">${escapeHtml(message)}</p>`,
    );
    const result = await deliverEmail({ to, subject, html });
    res.json({ success: true, simulated: result.provider === "simulated" });
  } catch (err) {
    console.error("Email send error:", err);
    res.status(500).json({ error: "Failed to send email. Please check server logs." });
  }
});

// API Route: Contact form -> studio inbox (receive) + auto-reply (send)
app.post("/api/contact", async (req, res) => {
  const ip = req.ip || req.headers['x-forwarded-for']?.toString() || 'unknown';

  if (isRateLimited(ip, emailRateLimit, MAX_EMAILS_PER_WINDOW)) {
    return res.status(429).json({ error: "Too many messages. Please try again later." });
  }

  const { name, email, message, budget } = req.body || {};

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email and message are required." });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }
  if (String(message).length > 5000) {
    return res.status(400).json({ error: "Message too long (max 5000 characters)." });
  }

  // The studio inbox — never taken from the client, so this is not an open relay.
  const studioInbox = process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER;
  if (!studioInbox) {
    console.error("CONTACT_TO_EMAIL / SMTP_USER not configured.");
    return res.status(500).json({ error: "Contact inbox is not configured yet." });
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");
  const safeBudget = budget ? escapeHtml(budget) : "—";

  try {
    // 1. Notify the studio (reply-to = sender, so replies go straight back).
    await deliverEmail({
      to: studioInbox,
      replyTo: email,
      subject: `New enquiry from ${safeName}`,
      html: brandEmail(
        "New project enquiry",
        `<table style="width:100%;border-collapse:collapse;">
           <tr><td style="padding:6px 0;color:#8a83a0;width:90px;">Name</td><td style="padding:6px 0;color:#f4f1de;">${safeName}</td></tr>
           <tr><td style="padding:6px 0;color:#8a83a0;">Email</td><td style="padding:6px 0;color:#e07a5f;">${safeEmail}</td></tr>
           <tr><td style="padding:6px 0;color:#8a83a0;">Budget</td><td style="padding:6px 0;color:#f4f1de;">${safeBudget}</td></tr>
         </table>
         <div style="margin-top:16px;padding:16px;background:#120a24;border-radius:12px;border:1px solid #2a1b4e;">
           <p style="margin:0;color:#e9e5d6;">${safeMessage}</p>
         </div>`,
      ),
    });

    // 2. Acknowledge the sender (best-effort — don't fail the request if this errors).
    try {
      await deliverEmail({
        to: email,
        replyTo: studioInbox,
        subject: "We received your message — Kyventis Tech",
        html: brandEmail(
          `Thanks, ${safeName}!`,
          `<p style="margin:0 0 12px;">We've received your message and a member of the studio will reply within one business day.</p>
           <p style="margin:0 0 4px;color:#8a83a0;font-size:13px;">Your message:</p>
           <div style="padding:14px;background:#120a24;border-radius:12px;border:1px solid #2a1b4e;">
             <p style="margin:0;color:#e9e5d6;">${safeMessage}</p>
           </div>`,
        ),
      });
    } catch (ackErr) {
      console.warn("Auto-reply failed (non-fatal):", ackErr);
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Contact send error:", err);
    res.status(500).json({ error: "Failed to send your message. Please try again." });
  }
});

// 4. Security: Health Check (Minimal Info)
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

export default app;
