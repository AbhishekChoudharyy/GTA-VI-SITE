"use client"

import { gsap } from "gsap"
import { useRef, useState, useEffect } from "react"
import Button from "./Button"
import AnimatedTitle from "./AnimatedTitle"

const Characters = () => {
  const frameRef = useRef(null)
  const dissolveRef = useRef(null)
  const carouselRef = useRef(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  // Array of images for the carousel
  const images = [
    "img/character-1.png",
    "img/character-2.png",
    "img/character-3.png",
    "img/character-4.png",
  ]

  // Initialize GSAP animations and create dissolve overlay
  useEffect(() => {
    // Set initial state for images
    gsap.set(frameRef.current, {
      rotateX: 0,
      rotateY: 0,
      transformPerspective: 1000,
    })

    // Create dissolve overlay if it doesn't exist
    if (!dissolveRef.current && frameRef.current) {
      const container = frameRef.current.parentNode

      // Create a canvas for the dissolve effect
      const canvas = document.createElement("canvas")
      canvas.className = "absolute inset-0 w-full h-full pointer-events-none z-10 opacity-0"
      canvas.width = container.clientWidth
      canvas.height = container.clientHeight

      // Add the canvas to the container
      container.appendChild(canvas)
      dissolveRef.current = canvas

      // Handle window resize
      const handleResize = () => {
        canvas.width = container.clientWidth
        canvas.height = container.clientHeight
      }

      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }

    // Preload all images to prevent flashing
    images.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [])

  const handleMouseMove = (e) => {
    if (!frameRef.current) return

    const { clientX, clientY } = e
    const element = frameRef.current
    const rect = element.getBoundingClientRect()

    const xPos = clientX - rect.left
    const yPos = clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Calculate rotation based on mouse position
    const rotateX = ((yPos - centerY) / centerY) * -15
    const rotateY = ((xPos - centerX) / centerX) * 15

    // Animate with GSAP
    gsap.to(element, {
      rotateX,
      rotateY,
      duration: 0.5,
      ease: "power2.out",
    })
  }

  const handleMouseLeave = () => {
    if (!frameRef.current) return

    // Return to flat position with a spring-like effect
    gsap.to(frameRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.5)",
    })
  }

  const changeSlide = () => {
    if (isAnimating || !dissolveRef.current) return

    setIsAnimating(true)
    const nextIndex = currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1

    // Get the canvas and its context
    const canvas = dissolveRef.current
    const ctx = canvas.getContext("2d")

    // Create two image elements for the current and next images
    const currentImage = new Image()
    currentImage.crossOrigin = "anonymous"
    currentImage.src = images[currentImageIndex]

    const nextImage = new Image()
    nextImage.crossOrigin = "anonymous"
    nextImage.src = images[nextIndex]

    // Wait for both images to load
    Promise.all([
      new Promise((resolve) => {
        currentImage.onload = resolve
      }),
      new Promise((resolve) => {
        nextImage.onload = resolve
      }),
    ]).then(() => {
      // Draw the current image on the canvas
      ctx.drawImage(currentImage, 0, 0, canvas.width, canvas.height)

      // Show the canvas
      gsap.to(canvas, { opacity: 1, duration: 0.3 })

      // Create a noise pattern for the dissolve effect
      const noiseData = new Uint8ClampedArray(canvas.width * canvas.height * 4)
      for (let i = 0; i < noiseData.length; i += 4) {
        noiseData[i] = noiseData[i + 1] = noiseData[i + 2] = Math.random() * 255
        noiseData[i + 3] = 255
      }

      // Create a noise pattern image
      const noisePattern = new ImageData(noiseData, canvas.width, canvas.height)

      // Create a timeline for the dissolve effect
      const tl = gsap.timeline({
        onComplete: () => {
          // Update the main image source
          frameRef.current.src = images[nextIndex]

          // Hide the canvas
          gsap.to(canvas, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
              // Clear the canvas
              ctx.clearRect(0, 0, canvas.width, canvas.height)

              // Update state
              setCurrentImageIndex(nextIndex)
              setIsAnimating(false)
            },
          })
        },
      })

      // Animate the dissolve effect
      let progress = 0
      const duration = 1.2 // seconds
      const fps = 30
      const frames = duration * fps
      let frame = 0

      const dissolveEffect = () => {
        if (frame >= frames) return

        frame++
        progress = frame / frames

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Draw the current image
        ctx.drawImage(currentImage, 0, 0, canvas.width, canvas.height)

        // Apply the dissolve effect
        ctx.globalCompositeOperation = "source-atop"

        // Create a threshold based on progress
        const threshold = 255 * progress

        // Apply the noise pattern with threshold
        const tempCanvas = document.createElement("canvas")
        tempCanvas.width = canvas.width
        tempCanvas.height = canvas.height
        const tempCtx = tempCanvas.getContext("2d")

        // Put the noise pattern on the temp canvas
        tempCtx.putImageData(noisePattern, 0, 0)

        // Apply threshold to create holes
        tempCtx.globalCompositeOperation = "destination-in"
        tempCtx.fillStyle = `rgba(0, 0, 0, ${progress})`
        tempCtx.fillRect(0, 0, canvas.width, canvas.height)

        // Draw the temp canvas on the main canvas
        ctx.drawImage(tempCanvas, 0, 0)

        // Draw the next image where there are holes
        ctx.globalCompositeOperation = "destination-over"
        ctx.drawImage(nextImage, 0, 0, canvas.width, canvas.height)

        // Reset composite operation
        ctx.globalCompositeOperation = "source-over"

        // Request next frame
        if (frame < frames) {
          requestAnimationFrame(dissolveEffect)
        }
      }

      // Start the dissolve effect
      dissolveEffect()
    })
  }

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        changeSlide()
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [currentImageIndex, isAnimating])

  return (
    <div id="story" className="min-h-dvh w-screen bg-black text-blue-50">
      <div className="flex size-full flex-col items-center py-10 pb-24">
        {/* <p className="font-general text-sm uppercase md:text-[10px]">GTA VI CHARACTERS</p> */}

        <div className="relative size-full">
          <AnimatedTitle
            title="the fa<b>c</b>es behind <br /> the fir<b>e</b>"
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
          />

          <div className="story-img-container" ref={carouselRef}>
            <div className="story-img-mask relative overflow-hidden">
              <div className="story-img-content relative">
                <img
                  ref={frameRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  src={images[currentImageIndex] || "/placeholder.svg"}
                  alt={`GTA VI character ${currentImageIndex + 1}`}
                  className="object-contain w-full h-full transition-opacity duration-300"
                />
              </div>
            </div>

            {/* for the rounded corner */}
            <svg className="invisible absolute size-0" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="flt_tag">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                    result="flt_tag"
                  />
                  <feComposite in="SourceGraphic" in2="flt_tag" operator="atop" />
                </filter>
              </defs>
            </svg>
          </div>
        </div>

        <div className="-mt-80 flex w-full justify-center md:-mt-64 md:me-44 md:justify-end">
          <div className="flex h-full w-fit flex-col items-center md:items-start">
            <p className="mt-3 max-w-sm text-center font-circular-web text-violet-50 md:text-start">
              Lucia, the series' first female lead, and her partner in crime, rumored to be named Jason, forming a
              modern-day Bonnie & Clyde duo.
            </p>

            <Button id="realm-btn" title="More About Characters" containerClass="mt-5" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Characters
