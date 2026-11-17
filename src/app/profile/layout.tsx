import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Saved Calculation History',
  description: 'View and manage your locally saved ToolPixa calculations.',
  alternates: {
    canonical: 'https://www.toolpixa.space/profile',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
