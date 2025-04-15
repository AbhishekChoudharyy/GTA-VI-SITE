import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const navItems = ["HOME", "ABOUT", "BTS", "FEATURES", "LAUNCHING",  "PRE-ORDER"];

const NavBar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isMenuOpen) {
        mobileMenuRef.current.style.display = "flex";
        
        gsap.fromTo(
          mobileMenuRef.current,
          { x: "100%" },
          { x: "0%", duration: 0.5, ease: "power3.out" }
        );
      } else {
        gsap.to(mobileMenuRef.current, {
          x: "100%",
          duration: 0.5,
          ease: "power3.in",
          onComplete: () => {
            mobileMenuRef.current.style.display = "none";
          },
        });
      }
    }
  }, [isMenuOpen]);

  useEffect(() => {
    let scrollY = 0;
  
    if (isMenuOpen) {
      scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
    } else {
      const scrollYVal = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollYVal || '0') * -1);
    }
  }, [isMenuOpen]);
  
  
  

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-1 right-1 left-1 z-[1000] h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-7">
            <img src="img/logo.webp" alt="logo" className="w-10" />
          </div>

          <div className="hidden md:flex gap-6">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={
                  item === "HOME"
                    ? "/"
                    : `/${item.toLowerCase().replace(" ", "-")}`
                }
                className="nav-hover-btn"
              >
                {item}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleAudioIndicator}
              className="flex items-center space-x-0.5 scale-125"
            >
              <audio
                ref={audioElementRef}
                className="hidden"
                src="/audio/loop1.mp3"
                loop
              />
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={clsx("indicator-line", {
                    active: isIndicatorActive,
                  })}
                  style={{
                    animationDelay: `${bar * 0.1}s`,
                  }}
                />
              ))}
            </button>

            <button className="md:hidden z-[1100]" onClick={() => setIsMenuOpen(true)}>
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Sidebar Menu */}
        <div
          ref={mobileMenuRef}
          className="fixed top-0 right-0 z-[99999999] h-screen w-screen hidden flex-col px-6 py-10 backdrop-blur-xl bg-white/10 border-l border-white/20 shadow-2xl"
          style={{ transform: "translateX(100%)" }}
        >
          <div className="flex justify-end">
            <button onClick={() => setIsMenuOpen(false)}>
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col gap-6 mt-10">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={
                  item === "HOME"
                    ? "/"
                    : `/${item.toLowerCase().replace(" ", "-")}`
                }
                className="text-black font-zentry text-6xl "
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </header>
    </div>
  );
};

export default NavBar;
