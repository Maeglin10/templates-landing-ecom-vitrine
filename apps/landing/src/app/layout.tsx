import { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Landing Page - High Converting',
  description: 'Professional landing pages for capturing leads and driving conversions.',
  openGraph: {
    title: 'Landing Page - High Converting',
    description: 'Professional landing pages for capturing leads and driving conversions.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-neutral-900">{children}</body>
    </html>
  );
}
