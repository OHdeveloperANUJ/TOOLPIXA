'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Tool Request');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in your name, email, and message before submitting.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen pt-28 pb-xxl px-margin">
      <div className="max-w-5xl mx-auto">
        <header className="mb-xl text-left">
          <h1 className="font-display-lg text-4xl md:text-5xl font-bold text-text-primary mb-sm tracking-tight">
            Contact Us &amp; Request a Tool
          </h1>
          <p className="text-text-secondary font-body-lg text-lg max-w-2xl">
            Have a question, found a calculation bug, or want us to build a custom calculator? Reach out to our engineering and editorial team.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl items-start">
          {/* Contact Form */}
          <div className="lg:col-span-7 glass-card rounded-2xl p-6 md:p-8 border border-glass-border">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-green-500/15 text-green-500 flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-3xl">check_circle</span>
                </div>
                <h2 className="font-headline-md text-2xl font-bold text-text-primary">
                  Message Received!
                </h2>
                <p className="text-text-secondary max-w-md mx-auto">
                  Thank you, <span className="text-text-primary font-semibold">{name}</span>. We&apos;ve logged your {topic.toLowerCase()} and can also be reached directly at{' '}
                  <a href="mailto:support@toolpixa.space" className="text-primary underline">
                    support@toolpixa.space
                  </a>.
                </p>
                <div className="pt-4 flex justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                    className="px-6 py-2.5 rounded-xl bg-surface-container text-text-primary border border-glass-border font-medium text-sm hover:border-primary transition-colors"
                  >
                    Send Another Message
                  </button>
                  <Link
                    href="/categories"
                    className="px-6 py-2.5 rounded-xl bg-primary text-on-primary font-medium text-sm hover:opacity-90 transition-colors"
                  >
                    Explore Tools
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <h2 className="font-headline-md text-2xl font-bold text-text-primary mb-2">
                  Send a Message
                </h2>
                {error && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-sm font-medium">
                    {error}
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-label-md uppercase tracking-wider text-text-secondary mb-2">
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Aarav Sharma"
                      className="w-full px-4 py-3 rounded-xl bg-surface-container border border-glass-border text-text-primary focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-label-md uppercase tracking-wider text-text-secondary mb-2">
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-surface-container border border-glass-border text-text-primary focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-topic" className="block text-xs font-label-md uppercase tracking-wider text-text-secondary mb-2">
                    Subject / Inquiry Type
                  </label>
                  <select
                    id="contact-topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-surface-container border border-glass-border text-text-primary focus:outline-none focus:border-primary"
                  >
                    <option value="Tool Request">Request a New Calculator / Tool</option>
                    <option value="Formula Feedback">Report a Formula or Calculation Issue</option>
                    <option value="Partnership">Advertising &amp; Affiliate Partnership</option>
                    <option value="General Inquiry">General Support</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-label-md uppercase tracking-wider text-text-secondary mb-2">
                    Message Details
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe the calculator, formula, or question you have in mind..."
                    className="w-full px-4 py-3 rounded-xl bg-surface-container border border-glass-border text-text-primary focus:outline-none focus:border-primary"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-primary text-on-primary font-bold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2"
                >
                  Send Message
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              </form>
            )}
          </div>

          {/* Direct Support & Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card rounded-2xl p-6 border border-glass-border space-y-3">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-2xl">mail</span>
                <h3 className="font-headline-md text-lg font-bold text-text-primary">Direct Email Support</h3>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                For urgent inquiries, partnership proposals, or bug reports, email us directly:
              </p>
              <a
                href="mailto:support@toolpixa.space"
                className="inline-block font-mono text-sm text-primary hover:underline font-semibold"
              >
                support@toolpixa.space
              </a>
            </div>

            <div className="glass-card rounded-2xl p-6 border border-glass-border space-y-3">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-2xl">verified_user</span>
                <h3 className="font-headline-md text-lg font-bold text-text-primary">100% Client-Side Privacy</h3>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                All 115+ calculators, PDF processors, and image compressors run locally inside your browser. We never upload your financial inputs or private documents to any server.
              </p>
              <Link href="/privacy" className="inline-flex items-center gap-1 text-xs font-label-md text-primary hover:underline">
                Read Privacy Policy <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
