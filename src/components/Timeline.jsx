import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from './Button';
import { TiLocationArrow } from 'react-icons/ti';

gsap.registerPlugin(ScrollTrigger);

const Timeline = () => {
  const timelineRefs = useRef([]);

  useEffect(() => {
    // Debugging: Log timelineRefs to check if they are correctly populated
    console.log(timelineRefs.current);

    timelineRefs.current.forEach((ref, i) => {
      if (!ref) return;
      
      gsap.fromTo(
        ref,
        { opacity: 0, y: 100 }, // Initial state (hidden and 100px below)
        {
          opacity: 1, // End state (fully visible)
          y: 0, // Move to normal position
          duration: 1, // Animation duration
          ease: 'power4.out', // Easing for smooth animation
          scrollTrigger: {
            trigger: ref, // Element that triggers the animation
            start: 'top 80%', // Start animation when the top of the element hits 80% of the viewport height
            end: 'bottom top', // End when the bottom of the element reaches the top of the viewport
            toggleActions: 'play none none reverse', // Play on enter, reverse on leave
             // Show markers for debugging
            scrub: true, // Smooth animation with scroll
          },
        }
      );
    });

    // Clean up ScrollTriggers on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const timelineData = [
    {
      title: '2013: The Legacy Begins',
      content:
        'GTA V reshapes open-world gaming. As the world awaits what’s next, whispers of GTA VI start surfacing. Fans begin speculating, dreaming of what’s to come.',
    },
    {
      title: '2018: Rumors & Leaks',
      content:
        'Speculations explode. Unverified leaks and insider rumors begin circulating. Rockstar stays silent, fueling even more hype across the globe.',
    },
    {
      title: '2020: The Anticipation Grows',
      content:
        'Next-gen consoles arrive. Players everywhere are hungry for a new Rockstar masterpiece. GTA VI becomes the most talked-about title — without a single official word.',
    },
    {
      title: '2023: The Unofficial Leak',
      content:
        'A massive leak hits the internet. Early dev footage from Rockstar surfaces, confirming Vice City and a dynamic duo of protagonists. The world goes into frenzy.',
    },
    {
      title: 'December 2023: The First Trailer',
      content:
        'Rockstar drops the first official GTA VI trailer. A neon-soaked Vice City returns. Lucia and Jason make their explosive debut. Over 100 million views in 24 hours.',
    },
    {
      title: '2024: Teasers & Trailers',
      content:
        'More cinematic glimpses reveal new mechanics, immersive physics, and a living world unlike any seen before. Rockstar promises the “most ambitious open-world experience ever.”',
    },
    {
      title: '2025: The Launch',
      content:
        'GTA VI hits PlayStation 5 and Xbox Series X|S. Decades of anticipation lead to the most groundbreaking release in gaming history. Welcome to chaos redefined.',
    },
  ];

  return (
    <section className="relative min-h-screen bg-[#d0e0e3] overflow-hidden text-white font-circular-web">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-30 left-0 w-full h-full object-cover z-0 opacity-10 pointer-events-none"
        src="/videos/symbol_1.webm"
      />

      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-[#d0e0e3]/40  py-12 px-6 md:px-20 border-b border-white/10">
        <h1 className="text-4xl md:text-8xl font-zentry text-black leading-tight md:leading-[7rem] text-center">
          CONTROVERSIAL TIMELINE
        </h1>
        <div className="mt-10 flex justify-center">
          <Button
            id="enter-vault"
            title="Pre Order Now"
            leftIcon={<TiLocationArrow />}
            containerClass="!bg-black !py-4 px-8 font-bold text-white flex gap-2 text-lg"
          />
        </div>
      </div>

      {/* Timeline Content */}
      <div className="relative z-10 mt-28 space-y-36 px-6 md:px-20 max-w-5xl mx-auto pb-32">
        {timelineData.map((item, index) => (
          <div
            key={index}
            ref={(el) => (timelineRefs.current[index] = el)} // Correctly assign refs
            className="text-center md:text-left"
          >
            <h2 className="text-3xl md:text-5xl text-black font-zentry mb-4">{item.title}</h2>
            <p className="text-base md:text-lg text-white leading-relaxed">
              {item.content}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Timeline;
