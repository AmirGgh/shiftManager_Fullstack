import About from "./components/About";
import Contact from "./components/Contact";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Skills from "./components/Skills";
import Work from "./components/Work";

function App() {
  return (
    <div className='h-full bg-gradient-to-r from-cyan-700 to-blue-900'>
      <Navbar />
      <Home />
      <About />
      <Work />
      <Skills />
      <Contact />
    </div>
  );
}

export default App;
