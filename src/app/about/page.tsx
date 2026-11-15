import React from 'react';

export const metadata = {
    title: "About Us | ToolPixa",
    description: "Read the About Us of ToolPixa.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-left">
          <h1 className="font-headline-lg text-4xl text-text-primary mb-4 tracking-tight">About Us</h1>
          <p className="text-text-secondary font-body-lg text-lg max-w-2xl">
            Welcome to ToolPixa. Learn more about our mission and why we built this suite of tools.
          </p>
        </header>

        <article className="bg-surface-container rounded-xl p-6 md:p-12 shadow-2xl relative overflow-hidden border border-glass-border">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 blur-[100px] rounded-full"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/10 blur-[100px] rounded-full"></div>
          
          <div className="relative z-10 space-y-12">
            <section className="space-y-6">
              <div className="prose prose-invert max-w-none text-text-secondary leading-relaxed space-y-6">
                <p className="text-lg">
                  Welcome to ToolPixa, your go-to destination for fast, reliable, and beautifully designed digital tools. Our mission is to simplify complex calculations and everyday tasks so you can focus on what truly matters.
                </p>
                
                <h2 className="text-2xl font-semibold text-text-primary mt-8">Our Story</h2>
                <p>
                  ToolPixa was born out of frustration. We noticed that most online calculators and utility tools were either cluttered with ads, overly complicated, or poorly designed. We wanted to create a single hub where users could find all the essential tools they need—from EMI calculators to financial planning utilities—without sacrificing speed or aesthetics.
                </p>
                
                <h2 className="text-2xl font-semibold text-text-primary mt-8">Why Choose Us?</h2>
                <ul className="list-disc pl-6 space-y-2 mt-4 text-text-secondary">
                  <li><strong className="text-text-primary">Lightning Fast:</strong> Our tools are built on modern web technologies ensuring instant results.</li>
                  <li><strong className="text-text-primary">Privacy First:</strong> We don't track your calculations on a backend server. Your data is saved locally on your device.</li>
                  <li><strong className="text-text-primary">Beautiful UI:</strong> We believe utility software shouldn't look like it was built in 1999.</li>
                  <li><strong className="text-text-primary">100% Free:</strong> Our core tools are completely free to use, forever.</li>
                </ul>

                <h2 className="text-2xl font-semibold text-text-primary mt-8">Get In Touch</h2>
                <p>
                  Have a suggestion for a new tool? Found a bug? We'd love to hear from you. We are constantly expanding our suite of tools based on community feedback.
                </p>
              </div>
            </section>
          </div>
        </article>
      </div>
    </main>
  );
}
