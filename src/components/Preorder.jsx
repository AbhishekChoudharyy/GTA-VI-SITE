import { useEffect, useRef } from "react";
import gsap from "gsap";
import Button from './Button';

const GtaPreOrder = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* 🔹 Background video or image */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="public/videos/hero-1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 🔹 Overlay to darken background slightly */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* 🔹 Glass Container */}
      <div
        ref={containerRef}
        className="relative z-20 flex items-center justify-center min-h-screen p-4"
      >
        <div className="w-full max-w-5xl px-10 py-12 rounded-xl shadow-xl text-white bg-white/10 backdrop-blur-lg border border-white/20">
          <h1 className="text-4xl font-zentry text-center tracking-wider text-pink-400 mb-8">
            PRE-ORDER NOW
          </h1>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-sm text-white/90">Full Name</label>
              <input
                type="text"
                placeholder="Your Name"
                className="p-3 rounded-md bg-white/10 backdrop-blur-sm border border-pink-400 text-black placeholder:text-black focus:outline-none"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-sm text-white/90">Your Email</label>
              <input
                type="email"
                placeholder="you@gta.com"
                className="p-3 rounded-md bg-white/10 backdrop-blur-sm border border-pink-400 text-black placeholder:text-black focus:outline-none"
              />
            </div>

            {/* Platform */}
            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-sm text-white/90">Choose Platform</label>
              <select className="p-3 rounded-md bg-white/10 backdrop-blur-sm border border-pink-400 text-black focus:outline-none ">
                <option>PlayStation 5</option>
                <option>Xbox Series X</option>
              </select>
            </div>

            {/* Region */}
            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-sm text-white/90">Select Region</label>
              <select className="p-3 rounded-md bg-white/10 backdrop-blur-sm border border-pink-400 text-black focus:outline-none">
                <option>USA</option>
                <option>UK</option>
                <option>Global</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="md:col-span-2 flex justify-center gap-6 pt-4">
              <Button
                title="Cancel"
                containerClass="mx-auto border border-2 bg-none border-pink-400 w-full text-pink-400"
              />
              <Button
                title="Submit"
                containerClass="mx-auto bg-pink-500 w-full text-pink-500"
              />
            </div>
          </form>

          <p className="text-center text-xs text-white/70 pt-6">
            Disclaimer: This is a fan-made GTA VI pre-order form. Not affiliated with Rockstar Games.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GtaPreOrder;
