import React from 'react';

export const metadata = {
    title: "Terms & Conditions | ToolPixa",
    description: "Read the Terms & Conditions of ToolPixa.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-left">
          <h1 className="font-headline-lg text-4xl text-text-primary mb-4 tracking-tight">Terms & Conditions</h1>
          <p className="text-text-secondary font-body-lg text-lg max-w-2xl">
            Last updated: October 2026. Rules and guidelines for using ToolPixa.
          </p>
        </header>

        <article className="bg-surface-container rounded-xl p-6 md:p-12 shadow-2xl relative overflow-hidden border border-glass-border">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 blur-[100px] rounded-full"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/10 blur-[100px] rounded-full"></div>
          
          <div className="relative z-10 space-y-12">
            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-text-primary flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">gavel</span>
                1. Acceptance of Terms
              </h2>
              <div className="prose prose-invert max-w-none text-text-secondary leading-relaxed space-y-4">
                <p>
                  By accessing and using ToolPixa (the "Website"), you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you are prohibited from using or accessing this site.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-text-primary flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">verified_user</span>
                2. Use License
              </h2>
              <div className="prose prose-invert max-w-none text-text-secondary leading-relaxed space-y-4">
                <p>
                  Permission is granted to temporarily use the materials (information or software) on ToolPixa's website for personal, non-commercial transitory viewing only.
                </p>
                <p>
                  You may not:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Modify or copy the materials;</li>
                  <li>Use the materials for any commercial purpose, or for any public display;</li>
                  <li>Attempt to decompile or reverse engineer any software contained on ToolPixa;</li>
                  <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
                </ul>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-text-primary flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">warning</span>
                3. Disclaimer of Liability
              </h2>
              <div className="prose prose-invert max-w-none text-text-secondary leading-relaxed space-y-4">
                <p>
                  The materials and calculators on ToolPixa are provided on an 'as is' basis. ToolPixa makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
                <p>
                  ToolPixa does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the financial calculators or materials on its website. Always consult a certified financial advisor before making any financial decisions.
                </p>
              </div>
            </section>
          </div>
        </article>
      </div>
    </main>
  );
}
