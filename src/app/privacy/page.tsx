import React from 'react';

export const metadata = {
    title: "Privacy Policy | ToolPixa",
    description: "Read the Privacy Policy of ToolPixa.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-left">
          <h1 className="font-headline-lg text-4xl text-text-primary mb-4 tracking-tight">Privacy Policy</h1>
          <p className="text-text-secondary font-body-lg text-lg max-w-2xl">
            Last updated: October 2026. How we handle your data with care.
          </p>
        </header>

        <article className="bg-surface-container rounded-xl p-6 md:p-12 shadow-2xl relative overflow-hidden border border-glass-border">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 blur-[100px] rounded-full"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/10 blur-[100px] rounded-full"></div>
          
          <div className="relative z-10 space-y-12">
            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-text-primary flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">security</span>
                1. Data Collection
              </h2>
              <div className="prose prose-invert max-w-none text-text-secondary leading-relaxed space-y-4">
                <p>
                  At ToolPixa, we believe in privacy by design. Our tools are built to function completely on your local device.
                </p>
                <p>
                  We do not collect, store, or transmit any of your personal financial data, loan amounts, or calculations to our servers. Any data you choose to "Save" within our calculators is stored entirely within your browser's Local Storage, meaning it never leaves your computer or phone.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-text-primary flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">cookie</span>
                2. Use of Cookies and Local Storage
              </h2>
              <div className="prose prose-invert max-w-none text-text-secondary leading-relaxed space-y-4">
                <p>
                  ToolPixa uses standard browser technologies to enhance your experience:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Local Storage:</strong> Used to save your Calculation History and Recent Searches locally on your device.</li>
                  <li><strong>Theme Preferences:</strong> We may store your Dark Mode/Light Mode preference to ensure a consistent experience across sessions.</li>
                </ul>
                <p>
                  If you wish to delete your saved data, you can do so at any time by visiting the History page and clicking "Clear All", or by clearing your browser cache.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-text-primary flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">analytics</span>
                3. Third-Party Services
              </h2>
              <div className="prose prose-invert max-w-none text-text-secondary leading-relaxed space-y-4">
                <p>
                  We may use standard analytics tools (like Google Analytics or Vercel Web Analytics) to monitor website traffic and usage patterns. This helps us understand which tools are most popular and where we can improve the user experience. This data is strictly aggregated and anonymized.
                </p>
              </div>
            </section>
          </div>
        </article>
      </div>
    </main>
  );
}
