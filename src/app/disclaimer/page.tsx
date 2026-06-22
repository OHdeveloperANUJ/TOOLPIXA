import React from 'react';

export const metadata = {
    title: "Disclaimer | ToolPixa",
    description: "Read the Disclaimer of ToolPixa.",
};

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-left">
          <h1 className="font-headline-lg text-4xl text-text-primary mb-4 tracking-tight">Disclaimer</h1>
          <p className="text-text-secondary font-body-lg text-lg max-w-2xl">
            Important information regarding the use of our calculation tools.
          </p>
        </header>

        <article className="bg-surface-container rounded-xl p-6 md:p-12 shadow-2xl relative overflow-hidden border border-glass-border">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 blur-[100px] rounded-full"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-error/10 blur-[100px] rounded-full"></div>
          
          <div className="relative z-10 space-y-12">
            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-text-primary flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">info</span>
                1. General Information Only
              </h2>
              <div className="prose prose-invert max-w-none text-text-secondary leading-relaxed space-y-4">
                <p>
                  The calculators, tools, and information provided on ToolPixa are designed to be for informational and educational purposes only. They are not intended to provide specific financial, investment, tax, or legal advice.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-text-primary flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">calculate</span>
                2. Accuracy of Calculations
              </h2>
              <div className="prose prose-invert max-w-none text-text-secondary leading-relaxed space-y-4">
                <p>
                  While we strive to ensure that all our calculators (such as EMI, Loan, and Tax calculators) are mathematically accurate, the results are estimates based on the inputs you provide. Real-world financial products often include additional fees, varying compounding periods, changing interest rates, and specific terms that our generic calculators may not account for.
                </p>
                <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg text-primary mt-4">
                  <strong>Important:</strong> You should always verify any financial calculation with your bank, lender, or a certified financial advisor before committing to any loan or financial contract.
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-text-primary flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">trending_down</span>
                3. Limitation of Liability
              </h2>
              <div className="prose prose-invert max-w-none text-text-secondary leading-relaxed space-y-4">
                <p>
                  ToolPixa, its creators, and affiliates shall not be held liable for any decisions made based on the results provided by these tools. By using this website, you agree that you use the tools at your own risk and accept full responsibility for any financial decisions you make.
                </p>
              </div>
            </section>
          </div>
        </article>
      </div>
    </main>
  );
}
