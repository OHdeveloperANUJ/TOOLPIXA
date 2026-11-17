import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us & Request a Tool',
  description: 'Contact ToolPixa engineering or request a new calculator, unit converter, or PDF utility.',
  alternates: {
    canonical: 'https://www.toolpixa.space/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
