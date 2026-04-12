"use client";

import { Container, Section } from "@repo/ui";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react";

const contactInfo = [
  {
    icon: <MapPin className="h-5 w-5 text-violet-500" />,
    label: "Address",
    value: "42 Rue de la Paix, 75002 Paris",
  },
  {
    icon: <Phone className="h-5 w-5 text-violet-500" />,
    label: "Phone",
    value: "+33 1 42 00 00 00",
  },
  {
    icon: <Mail className="h-5 w-5 text-violet-500" />,
    label: "Email",
    value: "hello@nexstudio.fr",
  },
  {
    icon: <Clock className="h-5 w-5 text-violet-500" />,
    label: "Hours",
    value: "Monday–Friday, 9:00–18:00",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = "Invalid email address";
    if (!formData.message.trim()) errs.message = "Message is required";
    else if (formData.message.trim().length < 10) errs.message = "Message must be at least 10 characters";
    return errs;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => { const n = { ...prev }; delete n[name]; return n; });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);
    setServerError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const data = await response.json();
        setServerError(data.error || "Failed to send message. Please try again.");
        return;
      }
      setSuccess(true);
    } catch {
      setServerError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <main className="bg-background min-h-screen">
        <Section className="pt-20">
          <Container className="max-w-2xl text-center py-24">
            <div className="flex justify-center mb-6">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h1 className="text-4xl font-black mb-4">Message sent!</h1>
            <p className="text-foreground/60 text-lg">
              Thank you for reaching out. We&apos;ll get back to you within 24 hours.
            </p>
          </Container>
        </Section>
      </main>
    );
  }

  return (
    <main className="bg-background min-h-screen">
      {/* Hero */}
      <Section className="pt-20 pb-16 bg-foreground/3">
        <Container>
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/40 px-4 py-2 rounded-full mb-6">
              Contact
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6">
              Let&apos;s talk about your project.
            </h1>
            <p className="text-lg text-foreground/60 leading-relaxed">
              Fill in the form and we&apos;ll get back to you within one business day — usually much faster.
            </p>
          </div>
        </Container>
      </Section>

      {/* Main Content */}
      <Section className="py-20">
        <Container>
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Contact info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-black mb-6">Contact details</h2>
                <div className="space-y-5">
                  {contactInfo.map((info, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="p-2 rounded-xl bg-foreground/5 flex-shrink-0">
                        {info.icon}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-foreground/40 uppercase tracking-wider mb-0.5">{info.label}</p>
                        <p className="text-sm font-medium">{info.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div className="rounded-2xl overflow-hidden bg-foreground/5 border border-foreground/10 aspect-square flex items-center justify-center">
                <div className="text-center p-6">
                  <MapPin className="h-10 w-10 text-foreground/20 mx-auto mb-3" />
                  <p className="text-sm text-foreground/40">42 Rue de la Paix<br />75002 Paris, France</p>
                  <a
                    href="https://maps.google.com/?q=42+Rue+de+la+Paix+Paris"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-xs font-semibold text-violet-600 dark:text-violet-400 hover:underline"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6 bg-foreground/3 border border-foreground/10 rounded-3xl p-8 md:p-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className={`w-full rounded-xl border px-4 py-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-violet-400 transition-shadow ${
                        errors.name ? "border-red-400" : "border-foreground/15"
                      }`}
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      className={`w-full rounded-xl border px-4 py-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-violet-400 transition-shadow ${
                        errors.email ? "border-red-400" : "border-foreground/15"
                      }`}
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Phone <span className="text-foreground/40 font-normal">(optional)</span></label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+33 6 00 00 00 00"
                      className="w-full rounded-xl border border-foreground/15 px-4 py-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-violet-400 transition-shadow"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Service of interest</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-foreground/15 px-4 py-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-violet-400 transition-shadow"
                    >
                      <option value="">Select a service…</option>
                      <option value="web-design">Web Design</option>
                      <option value="seo">SEO</option>
                      <option value="branding">Branding</option>
                      <option value="development">Development</option>
                      <option value="other">Other / Not sure yet</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Tell us about your project, goals, and timeline…"
                    className={`w-full rounded-xl border px-4 py-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-violet-400 transition-shadow resize-none ${
                      errors.message ? "border-red-400" : "border-foreground/15"
                    }`}
                  />
                  {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                </div>

                {serverError && (
                  <p className="text-sm text-red-500 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-xl px-4 py-3">
                    {serverError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-violet-600 hover:bg-violet-700 disabled:opacity-60 text-white font-bold py-4 px-8 rounded-2xl transition-colors text-sm"
                >
                  {loading ? "Sending…" : "Send message"}
                </button>

                <p className="text-xs text-foreground/40 text-center">
                  We typically respond within a few hours during business days.
                </p>
              </form>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
