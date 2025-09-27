"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const [isReady, setIsReady] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Detect current theme
    const detectTheme = () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      setTheme(currentTheme === "dark" ? "dark" : "light");
    };

    detectTheme();

    // Listen for theme changes
    const observer = new MutationObserver(detectTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Enhanced animation system for hero text
    const animateElements = () => {
      // Get all elements to animate
      const titleWords = document.querySelectorAll(".hero-title-word");
      const subtitleElement = document.querySelector(".hero-subtitle");
      const buttonsContainer = document.querySelector(".hero-buttons");
      const socialLinks = document.querySelector(".hero-social");
      const heroImage = document.querySelector(".hero-image-animate");

      // Animate title words with staggered timing
      titleWords.forEach((word, index) => {
        setTimeout(() => {
          const htmlElement = word as HTMLElement;
          htmlElement.style.transition =
            "all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)";
          htmlElement.style.opacity = "1";
          htmlElement.style.transform = "translateY(0)";
          htmlElement.style.filter = "blur(0)";
        }, index * 150 + 300);
      });

      // Animate subtitle
      setTimeout(() => {
        if (subtitleElement) {
          const htmlElement = subtitleElement as HTMLElement;
          htmlElement.style.transition =
            "all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)";
          htmlElement.style.opacity = "1";
          htmlElement.style.transform = "translateY(0)";
          htmlElement.style.filter = "blur(0)";
        }
      }, 1000);

      // Animate buttons
      setTimeout(() => {
        if (buttonsContainer) {
          const htmlElement = buttonsContainer as HTMLElement;
          htmlElement.style.transition =
            "all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)";
          htmlElement.style.opacity = "1";
          htmlElement.style.transform = "translateY(0)";
          htmlElement.style.filter = "blur(0)";
        }
      }, 1200);

      // Animate social links
      setTimeout(() => {
        if (socialLinks) {
          const htmlElement = socialLinks as HTMLElement;
          htmlElement.style.transition =
            "all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)";
          htmlElement.style.opacity = "1";
          htmlElement.style.transform = "translateY(0)";
          htmlElement.style.filter = "blur(0)";
        }
      }, 1400);

      // Animate hero image
      setTimeout(() => {
        if (heroImage) {
          const htmlElement = heroImage as HTMLElement;
          htmlElement.style.transition =
            "all 1s cubic-bezier(0.25, 0.1, 0.25, 1)";
          htmlElement.style.opacity = "1";
          htmlElement.style.transform = "translateY(0) scale(1)";
          htmlElement.style.filter = "blur(0)";
        }
      }, 1600);

      // Mark animation as complete
      setTimeout(() => {
        setIsReady(true);
      }, 2800);
    };

    // Start animation after component mounts
    const timer = setTimeout(animateElements, 200);
    return () => clearTimeout(timer);
  }, []);

  // Professional scroll effect for hero image
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrollY(scrollPosition);

      const heroImage = document.querySelector(".hero-image-animate");
      if (heroImage && isReady) {
        const htmlElement = heroImage as HTMLElement;

        // Calculate scroll progress (0 to 1)
        const maxScroll = window.innerHeight * 0.8; // Scale effect active for first 80% of viewport height
        const scrollProgress = Math.min(scrollPosition / maxScroll, 1);

        // Professional scaling: starts at 1, goes up to 1.15 (15% larger)
        const scaleValue = 1 + scrollProgress * 0.15;

        // Smooth transform without affecting the initial animation
        htmlElement.style.transform = `translateY(0) scale(${scaleValue})`;

        // Optional: Add slight opacity fade for depth effect
        const opacityValue = Math.max(1 - scrollProgress * 0.2, 0.8);
        htmlElement.style.opacity = opacityValue.toString();
      }
    };

    // Add scroll listener with throttling for performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Only add scroll listener after initial animation completes
    if (isReady) {
      window.addEventListener("scroll", throttledScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", throttledScroll);
      };
    }
  }, [isReady]);

  return (
    <div className="container">
      <header
        className="flex w-full flex-col items-center gap-8 pb-16 text-center lg:gap-16 lg:pb-32"
        style={{
          paddingTop: "4rem",
        }}
      >
        <div className="flex h-full flex-col items-center justify-center gap-8 md:gap-12">
          <div className="flex flex-col items-center justify-center gap-6 md:gap-10">
            <div>
              <h1 className="relative px-12 text-center text-4xl font-junicode font-semibold leading-[0.9] text-dark mb-[0.4rem] md:text-5xl lg:px-0 lg:text-8xl">
                <span
                  className="hero-title-word font-normal inline-block"
                  style={{
                    opacity: 0,
                    transform: "translateY(30px)",
                    filter: "blur(8px)",
                  }}
                >
                  welcome{" "}
                </span>{" "}
                <span
                  className="hero-title-word font-normal inline-block"
                  style={{
                    opacity: 0,
                    transform: "translateY(30px)",
                    filter: "blur(8px)",
                  }}
                >
                  to
                </span>
                <br className="hidden md:block" />
                <span
                  className="hero-title-word font-normal inline-block"
                  style={{
                    opacity: 0,
                    transform: "translateY(30px)",
                    filter: "blur(8px)",
                  }}
                >
                  a more
                </span>{" "}
                <span
                  className="hero-title-word font-normal italic text-coral inline-block"
                  style={{
                    opacity: 0,
                    transform: "translateY(30px)",
                    filter: "blur(8px)",
                  }}
                >
                  beautiful
                </span>
                <br className="hidden md:block" />
                <span
                  className="hero-title-word font-normal inline-block"
                  style={{
                    opacity: 0,
                    transform: "translateY(30px)",
                    filter: "blur(8px)",
                  }}
                >
                  desktop
                </span>
              </h1>
              <p
                className="hero-subtitle px-12 text-center text-md md:text-xl lg:px-0 lg:text-sm xt-muted-foreground"
                style={{
                  opacity: 0,
                  transform: "translateY(20px)",
                  filter: "blur(4px)",
                }}
              >
                Beautifully designed, privacy-focused, and packed with features.
                <br className="hidden sm:inline" />
                We care about your desktop experience, not your data.
              </p>
            </div>
            <div
              className="hero-buttons flex w-2/3 flex-col items-center justify-center gap-4 sm:gap-6 md:w-fit md:flex-row"
              style={{
                opacity: 0,
                transform: "translateY(20px)",
                filter: "blur(4px)",
              }}
            >
              <Link
                href="/download"
                className="btn btn-primary inline-flex items-center gap-2 w-fit text-lg px-8 py-4"
              >
                Download Now
                <svg
                  className="size-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
              <Link
                href="https://ko-fi.com/samcux"
                className="btn btn-secondary w-fit text-lg px-8 py-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                Support Me ❤️
              </Link>
            </div>
          </div>
          <ul
            className="hero-social flex items-center gap-6 opacity-80"
            style={{
              opacity: 0,
              transform: "translateY(20px)",
              filter: "blur(4px)",
            }}
          ></ul>
        </div>
        <div
          className="hero-image-animate rounded-2xl w-full max-w-6xl mx-auto"
          style={{
            opacity: 0,
            transform: "translateY(40px) scale(0.95)",
            filter: "blur(8px)",
            transformOrigin: "center center",
            willChange: "transform, opacity",
          }}
        >
          <div className="relative">
            <Image
              src={`/Screenshot/WinCux_${theme}.png`}
              alt="WinCux Desktop Enhancement Application"
              width={1920}
              height={1080}
              className="rounded-2xl w-full h-auto"
              style={{
                boxShadow:
                  theme === "dark"
                    ? "0 40px 80px -12px rgba(108, 93, 211, 0.4), 0 20px 40px -8px rgba(108, 93, 211, 0.2)"
                    : "0 40px 80px -12px rgba(108, 93, 211, 0.3), 0 20px 40px -8px rgba(108, 93, 211, 0.15)",
              }}
              priority
            />
            {/* Professional gradient overlay for depth */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background:
                  theme === "dark"
                    ? "linear-gradient(135deg, rgba(108, 93, 211, 0.1) 0%, transparent 50%, rgba(108, 93, 211, 0.05) 100%)"
                    : "linear-gradient(135deg, rgba(108, 93, 211, 0.05) 0%, transparent 50%, rgba(108, 93, 211, 0.02) 100%)",
                pointerEvents: "none",
              }}
            />
          </div>
        </div>
      </header>
    </div>
  );
}
