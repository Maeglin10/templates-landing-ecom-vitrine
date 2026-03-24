import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { Newsletter } from '@/components/Newsletter';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <Newsletter />
      <Footer />
    </main>
  );
}
