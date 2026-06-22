import React from 'react';


export const metadata = {
    title: "Disclaimer | ToolPixa",
    description: "Read the Disclaimer of ToolPixa.",
};

export default function DisclaimerPage() {
  return (
    <>
      <main className="min-h-screen pt-xl pb-xxl px-margin">
<div className="max-w-4xl mx-auto">



<header className="mb-xxl text-left">
<h1 className="font-display-lg text-display-lg text-gradient mb-sm tracking-tight">Disclaimer</h1>
<p className="text-text-secondary font-body-lg text-body-lg max-w-2xl">
                    Last updated: October 2026. How we handle your data with precision and care.
                </p>
</header>

<article className="glass-panel rounded-xl p-md md:p-xl shadow-2xl relative overflow-hidden">

<div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 blur-[100px] rounded-full"></div>
<div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary-container/10 blur-[100px] rounded-full"></div>
<div className="relative z-10 space-y-xl">
<section className="space-y-md">
<h2 className="font-headline-lg text-headline-lg text-primary flex items-center gap-sm">
<span className="material-symbols-outlined text-primary">security</span>
                            1. Data Collection
                        </h2>
<div className="space-y-sm text-on-surface-variant font-body-md text-body-md leading-relaxed">
<p>
                                At ToolPixa, we believe in radical transparency. Our primary mission is to provide professional-grade calculation tools while maintaining the highest standard of data sovereignty for our users. We strictly collect only the necessary parameters required to execute your specific requests.
                            </p>
<p>
                                This data typically includes mathematical inputs, units of measurement, and technical preferences. We do not link these inputs to your personal identity unless you have explicitly created a ToolPixa Precision account for the purpose of synchronizing your tool presets.
                            </p>
</div>
</section>
<section className="space-y-md">
<h2 className="font-headline-lg text-headline-lg text-primary flex items-center gap-sm">
<span className="material-symbols-outlined text-primary">cookie</span>
                            2. Use of Cookies
                        </h2>
<div className="space-y-sm text-on-surface-variant font-body-md text-body-md leading-relaxed">
<p>
                                ToolPixa utilizes a minimal set of essential cookies to manage session states and preserve your tool configurations (such as dark mode preferences or preferred unit systems). These are critical for the technical performance of our glassmorphic interface.
                            </p>
<ul className="list-disc pl-md space-y-xs marker:text-primary">
<li><strong>Session Persistence:</strong> Keeps you logged in while navigating between different precision suites.</li>
<li><strong>UI State:</strong> Remembers your layout preferences and theme settings.</li>
<li><strong>Security:</strong> Protects against Cross-Site Request Forgery (CSRF) and other common web vulnerabilities.</li>
</ul>
</div>
</section>
<section className="space-y-md">
<h2 className="font-headline-lg text-headline-lg text-primary flex items-center gap-sm">
<span className="material-symbols-outlined text-primary">analytics</span>
                            3. Analytics
                        </h2>
<div className="space-y-sm text-on-surface-variant font-body-md text-body-md leading-relaxed">
<p>
                                To ensure the mathematical precision of our tools remains world-class, we analyze anonymized usage data. This process helps us identify which tools require further optimization and where the user experience can be streamlined.
                            </p>
<div className="p-md bg-surface-container rounded-lg border border-glass-border">
<p className="text-secondary font-label-md text-label-md italic">
                                    Note: All analytics are stripped of IP addresses and PII (Personally Identifiable Information) before reaching our optimization servers. We value your intellectual property as much as your privacy.
                                </p>
</div>
</div>
</section>
<section className="space-y-md">
<h2 className="font-headline-lg text-headline-lg text-primary flex items-center gap-sm">
<span className="material-symbols-outlined text-primary">encrypted</span>
                            4. Information Security
                        </h2>
<p className="text-on-surface-variant font-body-md text-body-md leading-relaxed">
                            Every byte of data transmitted between your device and the ToolPixa Precision Suite is encrypted using 256-bit SSL protocols. Our cloud architecture is designed with advanced isolation layers to prevent any unauthorized access to our glassmorphic core.
                        </p>
</section>
</div>
</article>

<div className="mt-xl text-center">
<p className="text-on-surface-variant font-body-md text-body-md mb-md">Have specific questions about your data?</p>
<button className="inline-flex items-center gap-sm px-xl py-sm rounded-full glass-panel border border-primary/20 text-primary font-bold hover:bg-primary/10 transition-all hover:scale-105 active:scale-95 group">
                    Contact Privacy Team
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
</button>
</div>
</div>
</main>
    </>
  );
}
