import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  });

  return (
    <div id="about" className="min-h-screen w-screen text-black">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <p className="font-general text-sm uppercase md:text-[10px] tracking-widest text-gray-400">
          Welcome to the World of GTA VI
        </p>

        <AnimatedTitle
          title="One<b> c</b>ity. Endless Choice. <br /> ZERO MERCY."
          containerClass="mt-5 !text-black text-center"
        />

        <div className="about-subtext text-center">
          <p className="text-lg">GTA 6 is set to blow your mind with an immersive open-world</p>
          <p className="text-gray-500">
            experience, featuring two protagonists - one being the first female lead in the series.
          </p>
        </div>
      </div>
      

      <div className="h-dvh w-screen flex items-center justify-center relative" id="clip">
        {/* Image Section */}
        <div className="mask-clip-path about-image">
          <img
            src="img/about bg.png"
            alt="Background"
            className="absolute left-0 top-0 size-full object-cover opacity-100"
          />
        </div>
      </div>
      
    </div>
  );
};

export default About;
