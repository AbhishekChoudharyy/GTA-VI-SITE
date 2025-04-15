import { motion } from "framer-motion";

const Platform = () => {
  return (
    <section className="bg-[#0a0a0a] text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="font-zentry text-4xl md:text-6xl font-bold text-[#ff5e5e] text-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          BUILD FOR THE NEXT GENERATION OF CHAOS
        </motion.h2>

        <motion.p
          className="font-circular-web text-gray-300 text-lg md:text-xl leading-relaxed text-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          GTA VI is officially launching in 2025 on the next-generation consoles: PlayStation 5 and Xbox Series X|S. 
  Built exclusively to leverage the power of these systems, the game promises an unparalleled open-world experience. 
  A PC release has not been confirmed at this time.
        </motion.p>

        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <video
            src="/videos/hero-4.webm" // Replace with your actual path
            className="rounded-lg shadow-lg w-full max-w-4xl"
            autoPlay
            muted
            loop
            playsInline
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Platform;
