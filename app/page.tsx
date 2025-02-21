import Hero from '../components/Hero';
import Classes from '../components/Classes';
import Footer from '../components/Footer';
import AuthButtons from '../components/AuthButtons';

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <AuthButtons />
      <Hero />
      <Classes />
      <Footer />
    </div>
  );
}
