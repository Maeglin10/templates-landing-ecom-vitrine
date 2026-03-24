import { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Professional Website',
  description: 'Discover our services and learn how we can help your business.',
  openGraph: {
    title: 'Professional Website',
    description: 'Discover our services and learn how we can help your business.',
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
      <body className="bg-white text-neutral-900">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
