// Vercel serverless entry — mounts the shared Express app.
// The app defines its own /api/* routes (create-staff, send-email, health),
// and vercel.json rewrites all /api/* traffic to this function while
// preserving the original path so Express matches correctly.
import app from '../server-app';

export default app;
