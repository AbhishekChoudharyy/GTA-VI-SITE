import { useEffect, useState } from 'react';
import './App.css';
import About from './components/About';
import Contact from './components/Contact';
import Features from './components/Features';
import Footer from './components/Footer';
import Hero from './components/Hero';
import NavBar from './components/Navbar';
import Characters from './components/Characters';
import Timeline from './components/Timeline';
import BTS from './components/BTS';
import PreOrder from './components/Preorder';
import Countdown2 from './components/Countdowntimer';
import CustomCursor from './components/customcursor';
import Platform from './components/Platform';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  const [counter, setCounter] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      setCounter(count);
      count++;
      if (count > 100) {
        clearInterval(interval);
        setTimeout(() => setIsLoading(false), 500); // Add a smooth delay before hiding loader
      }
    }, 75); // Slow down the interval time (increase from 50 to 75)
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed top-0 left-0 w-screen h-screen bg-[#0b0b0b] z-50 overflow-hidden">
        {/* Expanding image bar */}
        <div className="absolute top-0 left-0 h-full overflow-hidden">
          <div
            className="h-full overflow-hidden transition-all duration-700 ease-out"
            style={{ width: `${counter}%` }} // Smooth transition on width change
          >
            <img
              src="img/okie2.png" // Change path if needed
              alt="Loading"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Centered counter */}
        <h1 className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-[260px] font-extrabold mt-[-10px] leading-none pointer-events-none z-50">
          {counter}
        </h1>
      </div>
    );
  }

  return (
    <Router>
      <div className="relative min-h-screen w-screen overflow-x-hidden">
        <CustomCursor />
        <NavBar />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <About />
                <Platform />
                <BTS/>
                <Characters />
                <Timeline/>
                <Features />
                <Countdown2 />
                <Contact />
                <PreOrder />
                <Footer />
              </>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/BTS" element={<BTS />} />
          <Route path="/LAUNCHING" element={<Countdown2 />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pre-order" element={<PreOrder />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
