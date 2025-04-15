import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const trailRef = useRef(null);

  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  const [variant, setVariant] = useState("default");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isTouch = window.innerWidth <= 768 || 'ontouchstart' in window;
      setIsMobile(isTouch);
    };

    checkMobile(); // Initial check
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    if (isMobile) return;

    document.body.style.cursor = "none";

    const style = document.createElement("style");
    style.innerHTML = `*, a, button { cursor: none !important; }`;
    document.head.appendChild(style);

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });
    };

    const handleClick = () => {
      gsap.fromTo(
        cursorRef.current,
        { scale: 1 },
        { scale: 1.4, duration: 0.15, yoyo: true, repeat: 1, ease: "power2.out" }
      );
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("click", handleClick);

    gsap.ticker.add(() => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.07;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.07;

      gsap.set(trailRef.current, {
        x: pos.current.x,
        y: pos.current.y,
      });
    });

    const setCursorVariant = (selector, variantName) => {
      document.querySelectorAll(selector).forEach((el) => {
        el.addEventListener("mouseenter", () => setVariant(variantName));
        el.addEventListener("mouseleave", () => setVariant("default"));
      });
    };

    setCursorVariant("a, button", "hover");
    setCursorVariant("img", "hover");

    return () => {
      document.body.style.cursor = "auto";
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("click", handleClick);
      gsap.ticker.remove();
      document.head.removeChild(style);
    };
  }, [isMobile]);

  if (isMobile) return null;

  const cursorStyle = {
    default: "h-3 w-3",
    hover: "h-3 w-3",
  };

  const trailStyle = {
    default: "h-3 w-3 bg-[#FFFFFF]/30 ring-[#FFFFFF]",
    hover: "h-10 w-10 bg-[#ff3cfe]/10 ring-[#ED42F1]",
  };

  return (
    <>
      <img
        ref={cursorRef}
        src="./cursor.webp"
        alt="cursor"
        className={`pointer-events-none fixed z-[9999] -translate-x-1/2 -translate-y-1/2 transition-all duration-150 ease-out ${cursorStyle[variant]}`}
      />
      <div
        ref={trailRef}
        className={`pointer-events-none fixed z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 transition-all duration-300 ease-out ${trailStyle[variant]}`}
      />
    </>
  );
};

export default CustomCursor;
