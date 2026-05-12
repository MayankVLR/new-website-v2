import { HeroSection } from '../components/hero-section';
import Projects from '../components/Projects';
import RoundelExperience from '../components/RoundelExperience';
import About from '../components/About';
import Experience from '../components/Experience';
import ArchiveContact from '../components/ArchiveContact';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <Projects />
        <RoundelExperience />
        <About />
        <Experience />
        <ArchiveContact />
        <Footer />
      </main>
    </>
  );
}
