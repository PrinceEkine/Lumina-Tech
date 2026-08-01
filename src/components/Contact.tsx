import {FormEvent, useState} from 'react';
import {ArrowRight, CheckCircle2, Mail, MapPin, Phone} from 'lucide-react';

type Fields = {name: string; email: string; budget: string; message: string};
type Errors = Partial<Record<keyof Fields, string>>;

const budgets = ['< $5k', '$5k – $15k', '$15k – $50k', '$50k+'];

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const [fields, setFields] = useState<Fields>({
    name: '',
    email: '',
    budget: '',
    message: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>(
    {},
  );
  const [sent, setSent] = useState(false);

  const validate = (f: Fields): Errors => {
    const e: Errors = {};
    if (!f.name.trim()) e.name = 'Please enter your name.';
    if (!f.email.trim()) e.email = 'Email is required.';
    else if (!emailRe.test(f.email)) e.email = 'Enter a valid email address.';
    if (!f.message.trim()) e.message = 'Tell us a little about the project.';
    else if (f.message.trim().length < 12)
      e.message = 'A few more words would help us scope it.';
    return e;
  };

  const update = (key: keyof Fields, value: string) => {
    const next = {...fields, [key]: value};
    setFields(next);
    if (touched[key]) setErrors(validate(next));
  };

  const blur = (key: keyof Fields) => {
    setTouched((t) => ({...t, [key]: true}));
    setErrors(validate(fields));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const found = validate(fields);
    setErrors(found);
    setTouched({name: true, email: true, budget: true, message: true});
    if (Object.keys(found).length === 0) {
      // Front-end demo only — wire to your new Firebase project / email service.
      setSent(true);
    }
  };

  const fieldClass = (key: keyof Fields) => {
    const base = 'field w-full px-4 py-3.5 text-sm';
    if (errors[key]) return `${base} invalid`;
    if (touched[key] && fields[key]) return `${base} valid`;
    return base;
  };

  return (
    <section id="contact" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="overflow-hidden rounded-[2.5rem] border border-alabaster/8 bg-amethyst-deep/50">
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr]">
            {/* Left — copy + contact rail */}
            <div className="relative overflow-hidden p-10 lg:p-12">
              <div
                className="absolute -left-20 -top-20 h-64 w-64 rounded-full opacity-40 blur-3xl"
                style={{
                  background:
                    'radial-gradient(circle, #e07a5f, transparent 70%)',
                }}
              />
              <div className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-copper">
                / Let&apos;s build
              </div>
              <h2 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-alabaster">
                Start a project
                <br />
                <span className="text-copper-gradient">with Kyventis.</span>
              </h2>
              <p className="mt-5 max-w-sm text-alabaster/60">
                Tell us where you&apos;re headed. We reply within one business
                day with next steps.
              </p>

              <div className="mt-10 space-y-4">
                {[
                  {icon: Mail, label: 'hello@kyventis.tech'},
                  {icon: Phone, label: '+1 (415) 555-0199'},
                  {icon: MapPin, label: 'Remote · Worldwide'},
                ].map((c) => (
                  <div key={c.label} className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-copper/12 text-copper ring-1 ring-copper/25">
                      <c.icon className="h-4 w-4" />
                    </span>
                    <span className="text-sm text-alabaster/75">{c.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — form */}
            <div className="border-t border-alabaster/8 bg-amethyst-black/40 p-10 lg:border-l lg:border-t-0 lg:p-12">
              {sent ? (
                <div className="flex h-full min-h-[24rem] flex-col items-center justify-center text-center">
                  <span className="mb-5 grid h-16 w-16 place-items-center rounded-full bg-copper/15 text-copper ring-1 ring-copper/30">
                    <CheckCircle2 className="h-8 w-8" />
                  </span>
                  <h3 className="font-display text-2xl font-bold text-alabaster">
                    Message received.
                  </h3>
                  <p className="mt-2 max-w-xs text-alabaster/60">
                    Thanks, {fields.name.split(' ')[0] || 'there'}. We&apos;ll be
                    in touch within one business day.
                  </p>
                  <button
                    onClick={() => {
                      setSent(false);
                      setFields({name: '', email: '', budget: '', message: ''});
                      setTouched({});
                      setErrors({});
                    }}
                    className="btn-ghost mt-8 px-6 py-3 text-sm"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-alabaster/50">
                        Name
                      </label>
                      <input
                        type="text"
                        value={fields.name}
                        onChange={(e) => update('name', e.target.value)}
                        onBlur={() => blur('name')}
                        placeholder="Jane Doe"
                        className={fieldClass('name')}
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-xs text-[#ef8378]">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-alabaster/50">
                        Email
                      </label>
                      <input
                        type="email"
                        value={fields.email}
                        onChange={(e) => update('email', e.target.value)}
                        onBlur={() => blur('email')}
                        placeholder="jane@company.com"
                        className={fieldClass('email')}
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-xs text-[#ef8378]">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-alabaster/50">
                      Budget
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {budgets.map((b) => (
                        <button
                          type="button"
                          key={b}
                          onClick={() => update('budget', b)}
                          className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                            fields.budget === b
                              ? 'bg-copper text-amethyst-black'
                              : 'border border-alabaster/12 text-alabaster/60 hover:border-copper/40'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-alabaster/50">
                      Project details
                    </label>
                    <textarea
                      rows={4}
                      value={fields.message}
                      onChange={(e) => update('message', e.target.value)}
                      onBlur={() => blur('message')}
                      placeholder="What are we building together?"
                      className={`${fieldClass('message')} resize-none`}
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-xs text-[#ef8378]">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn-liquid group inline-flex w-full items-center justify-center gap-2 px-7 py-4 text-base"
                  >
                    Send message
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </button>
                  <p className="text-center text-xs text-alabaster/35">
                    Front-end demo — connect this to your new Firebase project to
                    go live.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
