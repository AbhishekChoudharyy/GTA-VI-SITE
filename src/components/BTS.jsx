import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const BTS = () => {
    const [isHovering, setIsHovering] = useState(false);
    const cardRefs = useRef([]);


    const addToRefs = (el) => {
        if (el && !cardRefs.current.includes(el)) {
            cardRefs.current.push(el);
        }
    };


    const handleMouseMove = ({ clientX, clientY, currentTarget }) => {
        const rect = currentTarget.getBoundingClientRect();

        const xOffset = clientX - (rect.left + rect.width / 2);
        const yOffset = clientY - (rect.top + rect.height / 2);

        if (isHovering) {

            gsap.to(currentTarget, {
                x: xOffset * 0.1,
                y: yOffset * 0.1,
                rotationY: xOffset / 15,
                rotationX: -yOffset / 15,
                transformPerspective: 600,
                duration: 0.6,
                ease: "power1.out",
            });


            // const content = currentTarget.querySelector('video, img'); 
            // if (content) {
            //     gsap.to(content, {
            //         x: -xOffset * 0.1, 
            //         y: -yOffset * 0.1, 
            //         duration: 0.6, 
            //         ease: "power1.out",
            //     });
            // }
        }
    };


    useEffect(() => {
        if (!isHovering) {
            cardRefs.current.forEach(card => {
                gsap.to(card, {
                    x: 0,
                    y: 0,
                    rotationY: 0,
                    rotationX: 0,
                    duration: 0.6,
                    ease: "power1.out",
                });

                const content = card.querySelector('video, img');
                if (content) {
                    gsap.to(content, {
                        x: 0,
                        y: 0,
                        duration: 0.6,
                        ease: "power1.out",
                    });
                }
            });
        }
    }, [isHovering]);

    return (
        <section className='min-h-screen bg-black text-violet-100 p-5 md:p-10 space-y-10'>
            <h3 className='uppercase font-general text-xs pt-10'>BTS of GTA VI</h3>
            
            <h1 className='plain-heading special-font md:text-[10rem] text-5xl max-w-5xl md:leading-[8rem]'>How Chaos Is Crafted</h1>

            <div className='flex flex-col md:flex-row gap-10'>
                {/* Left */}
                <div className='flex flex-col w-full gap-10 items-end mt-28'>
                    <div
                        ref={addToRefs}
                        className='flex border border-neutral-700 w-auto rounded-lg max-w-xl'
                        onMouseMove={handleMouseMove}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                    >
                        <div className='p-5'>
                            <h3>Developers Involved</h3>
                            <h1 className='plain-heading special-font text-3xl md:text-9xl'>2k<b>+</b></h1>
                        </div>
                        <div>
                            <video src='videos/card-1.webm' loop muted autoPlay className='h-auto' />
                        </div>
                    </div>

                    <div
                        ref={addToRefs}
                        className='flex border flex-col justify-between md:h-[25rem] border-neutral-700 p-5 rounded-lg max-w-xl'  style={{background:"#edff66"}}
                        onMouseMove={handleMouseMove}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                    >
                        <h1 className='plain-heading special-font text-black text-[9rem] md:text-[16rem] leading-none'>$1b+</h1>
                        <div className='p-5'>
                            <h3 className='text-black text-end font-semibold opacity-70'>Massive Budget</h3>
                        </div>
                    </div>

                    <div
                        ref={addToRefs}
                        className='p-5 border flex flex-col rounded-lg border-neutral-700' style={{background:'#5542FF'}}
                        onMouseMove={handleMouseMove}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                    >
                        <h1 className='plain-heading special-font text-white text-[5rem] md:text-[4.5rem] max-w-sm leading-none text-start '> Immersive Audio</h1>
                        <p className='text-end font-general uppercase text-xs pt-20'>
                        Even the sound team recorded real urban noise, thunderstorms, and voice actors on-location to make Vice City feel alive 24/7.
                        </p>
                    </div>

                   
                </div>

                {/* Right */}
                <div className='flex flex-col w-full gap-10 items-start'>
                    <div
                        ref={addToRefs}
                        className='flex flex-col border border-neutral-700 rounded-lg'  style={{background: '#ED0DE6'}}
                        onMouseMove={handleMouseMove}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                    >
                        <div className='p-2'>
                            <div className='p-2'>
                                <h3 className='ml-3 text-black text-start font-semibold opacity-70'>Character Development</h3>
                            </div>
                            <h1 id='text-3d' className='ml-3 plain-heading special-font text-black text-[9rem] md:text-[16rem] leading-none text-left '>Lucia</h1>
                        </div>
                        <img src='img/hero-girl.webp' alt='card-2' className='object-cover object-center h-auto -mt-40 md:-mt-72' />
                    </div>

                    <div
                        ref={addToRefs}
                        className='p-5 border flex flex-col rounded-lg border-neutral-700'
                        onMouseMove={handleMouseMove}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                    >
                        <h1 className='plain-heading special-font text-white text-[5rem] md:text-[4.5rem] max-w-sm leading-none text-start '>Real-Life City Research</h1>
                        <p className='text-end font-general uppercase text-xs pt-20'>
                        Designers visited Miami and <br/> nearby regions to <br/> capture real architecture, <br/> street vibes, and <br/> even graffiti styles.
                        </p>
                    </div>

                    <div
                        ref={addToRefs}
                        className='bg-violet-50 rounded-lg'
                        onMouseMove={handleMouseMove}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                    >
                        <div className='p-2'>
                            <div className='p-2'>
                                <h3 className='text-black text-start font-semibold opacity-70'>Estimated Revenue Generation<br />For GTA VI in Day One</h3>
                            </div>
                            <h1 className='plain-heading special-font text-black text-[9rem] p-10 md:text-[24rem] leading-none md:leading-[20rem] text-start '>$1.5<b>B</b></h1>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BTS;
