import Hero from '../components/Hero';
import Classes from '../components/Classes';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Classes />
      <Footer />
    </div>
  );
}
