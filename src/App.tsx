
import Header from './Header';
import Hero from './Hero';
import About from './About';
import Services from './Services';
import Procedure from './Procedure';
import Advantages from './Advantages';
import Contact from './Contact';
import Testimonials from './Testimonials';
import Footer from './Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Procedure />
        <Advantages />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
