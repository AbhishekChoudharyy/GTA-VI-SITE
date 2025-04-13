import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";
import ScrollRevealWrapper from "./ScrollRevealWrapper";

export const BentoTilt = ({ children, className = "" }) => {
    const [transformStyle, setTransformStyle] = useState("");
    const itemRef = useRef(null);

    const handleMouseMove = (event) => {
        if (!itemRef.current) return;

        const { left, top, width, height } =
            itemRef.current.getBoundingClientRect();

        const relativeX = (event.clientX - left) / width;
        const relativeY = (event.clientY - top) / height;

        const tiltX = (relativeY - 0.5) * 5;
        const tiltY = (relativeX - 0.5) * -5;

        const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
        setTransformStyle(newTransform);
    };

    const handleMouseLeave = () => {
        setTransformStyle("");
    };

    return (
        <div
            ref={itemRef}
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transform: transformStyle }}
        >
            {children}
        </div>
    );
};

export const BentoCard = ({ src, title, description, isComingSoon }) => {
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [hoverOpacity, setHoverOpacity] = useState(0);
    const hoverButtonRef = useRef(null);

    const handleMouseMove = (event) => {
        if (!hoverButtonRef.current) return;
        const rect = hoverButtonRef.current.getBoundingClientRect();

        setCursorPosition({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        });
    };

    const handleMouseEnter = () => setHoverOpacity(1);
    const handleMouseLeave = () => setHoverOpacity(0);


    //Video

    const videoRef = useRef(null);

    const autoPlay = () => {
        if (videoRef.current) {
            videoRef.current.play();
        }
    };

    const pause = () => {
        if (videoRef.current) {
            videoRef.current.pause();
        }
    };

    return (
        <div className="relative size-full"  // autoPlay
            onMouseEnter={autoPlay}
            onMouseLeave={pause}>
            <video
                ref={videoRef}
                src={src}
                loop
                muted
                className="absolute left-0 top-0 size-full object-cover object-center"
            />
            <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
                <div>
                    <h1 className="bento-title special-font">{title}</h1>
                    {description && (
                        <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
                    )}
                </div>

                {isComingSoon && (
                    <div
                        ref={hoverButtonRef}
                        onMouseMove={handleMouseMove}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/20"
                    >
                        {/* Radial gradient hover effect */}
                        <div
                            className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                            style={{
                                opacity: hoverOpacity,
                                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
                            }}
                        />
                        <TiLocationArrow className="relative z-20" />
                        <p className="relative z-20">coming soon</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const Features = () => (
    <section className="bg-black pb-52">
        <div className="container mx-auto px-3 md:px-10">
            <div className="px-5 py-32">
                <p className="font-zentry text-8xl text-blue-50">
                    Explore GTA VI Features
                </p>
                <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
                Experience the next evolution of the Grand Theft Auto series with groundbreaking features, immersive soundtrack, and next-gen graphics.
                </p>
            </div>
            
            <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]" style={{background:'#4721ba'}}>
                <BentoCard
                    src="videos/feature-1.mp4"
                    title={
                        <>
                            Dual Protagonists
                        </>
                    }
                    description="Including Lucia, the first-ever female lead in the GTA series, with dynamic story switching."
                    
                />
            </BentoTilt>

            <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
                
                <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
                    <BentoCard
                        src="videos/feature-2.mp4"
                        title={
                            <>
                                Open<b> WO</b>rld
                            </>
                        }
                        description="Explore the largest and most detailed Vice City ever created, with multiple districts, hidden locations, and dynamic environments."
                        
                    />
                </BentoTilt>

                <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
                    <BentoCard
                        src="videos/feature-3.mp4"
                        title={
                            <>
                                Immersive<b> Sound</b>track
                            </>
                        }
                        description="Enjoy the largest and most diverse collection of licensed music across multiple radio stations, eras, and genres."
                       
                    />
                </BentoTilt>

                <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
                    <BentoCard
                        src="videos\feature-4.mp4"
                        title={
                            <>
                                Massive<b> M</b>ap
                            </>
                        }
                        description="A next-gen version of Vice City with surrounding rural areas, swamps, highways, and small towns."
                        
                    />
                </BentoTilt>

                <BentoTilt className="bento-tilt_2">
                    <div className="flex size-full flex-col justify-between p-5" style={{background:'#4721ba'}}>
                        <h1 className="bento-title special-font max-w-64 text-black">
                            Explore More 
                        </h1>

                        <TiLocationArrow className="m-5 scale-[5] self-end" />
                    </div>
                </BentoTilt>

                <BentoTilt className="bento-tilt_2">
                    <video
                        src="videos/hero-3.mp4"
                        loop
                        muted
                        autoPlay
                        className="size-full object-cover object-center"
                    />
                </BentoTilt>
            </div>
        </div>
    </section>
);

export default Features;