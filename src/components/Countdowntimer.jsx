import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Button from './Button';
import SpotlightCard from './SpotlightCard';

const Countdown = () => {
  const containerRef = useRef(null);

  const calculateTimeLeft = () => {
    const targetDate = new Date("2025-10-01T00:00:00").getTime();
    const now = new Date().getTime();
    const diff = targetDate - now;

    return {
      days: Math.max(Math.floor(diff / (1000 * 60 * 60 * 24)), 0),
      hours: Math.max(Math.floor((diff / (1000 * 60 * 60)) % 24), 0),
      minutes: Math.max(Math.floor((diff / 1000 / 60) % 60), 0),
      seconds: Math.max(Math.floor((diff / 1000) % 60), 0),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power4.out" }
    );
  }, []);

  return (
    <section className="w-full min-h-screen  flex items-center justify-center px-4 py-20 relative">
      {/* Background Image with Blurred and Grayscale effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-[-1]" 
           style={{ 
             backgroundImage: "url('img/character-3.png')",
             filter: "blur(10px) grayscale(500%)" 
           }} />
      
      <div ref={containerRef} className="text-center w-full max-w-4xl">
        <h1 className="text-5xl sm:text-6xl font-zentry text-white neon-text mb-10 uppercase">
          The Countdown Begins
        </h1>

        <SpotlightCard spotlightColor="rgba(0, 229, 255, 0.15)" className="w-full p-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 items-center justify-center">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Minutes", value: timeLeft.minutes },
              { label: "Seconds", value: timeLeft.seconds },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center justify-center p-3">
                <span className="text-xl sm:text-2xl font-bold text-gradient-gta">
                  {item.value < 10 ? `0${item.value}` : item.value}
                </span>
                <span className="text-xl uppercase text-gray-400 tracking-widest">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </SpotlightCard>

        <div className="mt-10 flex justify-center">
          <Button title="Pre-Order Now" containerClass="mx-auto text-black" />
        </div>
      </div>
    </section>
  );
};

export default Countdown;
