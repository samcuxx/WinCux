"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isAnimated, setIsAnimated] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const features = [
    {
      id: "wallpapers",
      title: "Wallpaper Management",
      description:
        "Browse and download thousands of high-quality wallpapers from Wallhaven. Advanced filtering by categories, colors, resolutions, and tags with instant preview and one-click apply.",
      screenshot: "Wallpapers_light",
      screenshotDark: "Wallpaper_dark",
    },
    {
      id: "rainmeter",
      title: "Rainmeter Integration",
      description:
        "Seamlessly manage Rainmeter skins with automatic detection, easy installation, and configuration. Toggle controls let you enable/disable skins directly from the app.",
      screenshot: "Rainmeter_light",
      screenshotDark: "Rainmeter_dark",
    },
    {
      id: "design",
      title: "Modern Design",
      description:
        "Windows 11 Fluent Design System with acrylic effects, modern shadows, and smooth animations. Supports both dark and light themes with system preference detection.",
      screenshot: "Modern_design_light",
      screenshotDark: "Modern_design_dark",
    },
    {
      id: "features",
      title: "Smart Features",
      description:
        "Auto-updates, NSFW filtering, performance optimization, download management, and persistent settings. Everything you need for a seamless desktop enhancement experience.",
      screenshot: "Features_light",
      screenshotDark: "Features_dark",
    },
  ];

  const titles = ["Productivity ", "at ", "its ", "best"];

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
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isAnimated) {
          setIsAnimated(true);
          animateElements();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      // Clean up any pending hover timeout
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  }, [isAnimated, hoverTimeout]);

  const animateElements = () => {
    // Animate title words with stagger
    const titleElements = document.querySelectorAll(".wincux-title-word");
    titleElements.forEach((element, index) => {
      const htmlElement = element as HTMLElement;
      htmlElement.style.opacity = "0";
      htmlElement.style.transform = "translateY(20px)";
      htmlElement.style.filter = "blur(4px)";

      setTimeout(() => {
        htmlElement.style.transition =
          "all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)";
        htmlElement.style.opacity = "1";
        htmlElement.style.transform = "translateY(0)";
        htmlElement.style.filter = "blur(0)";
      }, index * 200 + 200);
    });

    // Animate description
    const descElement = document.querySelector(".wincux-feature-description");
    if (descElement) {
      const htmlElement = descElement as HTMLElement;
      htmlElement.style.opacity = "0";
      htmlElement.style.transform = "translateY(20px)";
      htmlElement.style.filter = "blur(4px)";

      setTimeout(() => {
        htmlElement.style.transition =
          "all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)";
        htmlElement.style.opacity = "1";
        htmlElement.style.transform = "translateY(0)";
        htmlElement.style.filter = "blur(0)";
      }, 600);
    }

    // Animate feature items and tabs
    const featureElements = document.querySelectorAll(
      ".wincux-feature-item, .wincux-feature-tab"
    );
    featureElements.forEach((element, index) => {
      const htmlElement = element as HTMLElement;
      htmlElement.style.opacity = "0";
      htmlElement.style.transform = "translateY(20px)";
      htmlElement.style.filter = "blur(4px)";

      setTimeout(() => {
        htmlElement.style.transition =
          "all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)";
        htmlElement.style.opacity = "1";
        htmlElement.style.transform = "translateY(0)";
        htmlElement.style.filter = "blur(0)";
      }, index * 200 + 800);
    });
  };

  const handleFeatureChange = (index: number) => {
    if (index === activeFeature && !isImageLoading) return;

    setActiveFeature(index);
    setIsImageLoading(true);

    // Update active states
    const allFeatures = document.querySelectorAll(
      ".wincux-feature-item, .wincux-feature-tab"
    );
    allFeatures.forEach((el, i) => {
      const actualIndex = i >= features.length ? i - features.length : i;
      if (actualIndex === index) {
        el.setAttribute("data-active", "true");
      } else {
        el.removeAttribute("data-active");
      }
    });

    // Professional image transition with smooth animations
    const images = document.querySelectorAll(".wincux-feature-image");
    images.forEach((img, i) => {
      const htmlImg = img as HTMLElement;
      const yOffset = (i - index) * 30;
      const zOffset = i === index ? 0 : -100 - Math.abs(i - index) * 60;
      const scale = i === index ? 1 : 0.92;
      const rotation = (i - index) * 2;
      const opacity = i === index ? 1 : 0.4;

      if (i === index) {
        htmlImg.setAttribute("data-active", "true");
        setTimeout(() => {
          htmlImg.style.opacity = "1";
          htmlImg.style.transform = `translate3d(-50%, 0, 0) scale(${scale})`;
          htmlImg.style.zIndex = "20";
        }, 50);
      } else {
        htmlImg.removeAttribute("data-active");
        htmlImg.style.opacity = opacity.toString();
        htmlImg.style.transform = `translate3d(-50%, ${yOffset}px, ${zOffset}px) rotate3d(1, 0, 0, ${rotation}deg) scale(${scale})`;
        htmlImg.style.zIndex = String(20 - Math.abs(i - index));
      }
    });

    // Update mobile description
    const mobileDesc = document.querySelector(".wincux-mobile-description");
    if (mobileDesc) {
      mobileDesc.textContent = features[index].description;
    }

    // Reset loading state after animation completes
    setTimeout(() => {
      setIsImageLoading(false);
    }, 300);
  };

  const handleFeatureHover = (index: number) => {
    // Clear existing timeout
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }

    // Set new timeout for smoother hover experience
    const timeout = setTimeout(() => {
      handleFeatureChange(index);
    }, 100);

    setHoverTimeout(timeout);
  };

  const initializeFeatures = () => {
    // Properly initialize the first feature after animation completes
    setTimeout(() => {
      handleFeatureChange(0);

      // Ensure first feature is properly displayed
      const firstImage = document.querySelector(
        '.wincux-feature-image[data-index="0"]'
      );
      const firstFeature = document.querySelector(
        '.wincux-feature-item[data-index="0"]'
      );
      const firstTab = document.querySelector(
        '.wincux-feature-tab[data-index="0"]'
      );

      if (firstImage) {
        const htmlImg = firstImage as HTMLElement;
        htmlImg.setAttribute("data-active", "true");
        htmlImg.style.opacity = "1";
        htmlImg.style.transform = "translate3d(-50%, 0, 0) scale(1)";
        htmlImg.style.zIndex = "20";
      }

      if (firstFeature) {
        firstFeature.setAttribute("data-active", "true");
      }

      if (firstTab) {
        firstTab.setAttribute("data-active", "true");
      }
    }, 1200);
  };

  useEffect(() => {
    // Initialize the first feature after animation completes
    if (isAnimated) {
      initializeFeatures();
    }
  }, [isAnimated]);

  // Update images when theme changes
  useEffect(() => {
    if (isAnimated && !isImageLoading) {
      setIsImageLoading(true);

      // Force re-render of all images when theme changes
      const images = document.querySelectorAll(".wincux-feature-image");
      images.forEach((img, index) => {
        const htmlImg = img as HTMLElement;
        // Reset image styles temporarily to force update
        htmlImg.style.opacity = "0";
        htmlImg.style.transform = "translate3d(-50%, 30px, -100px) scale(0.92)";
      });

      // Re-trigger the current feature with a slight delay to allow image loading
      setTimeout(() => {
        handleFeatureChange(activeFeature);
      }, 200);
    }
  }, [theme, isAnimated]);

  // Force image refresh when theme changes
  const getImageSrc = (feature: (typeof features)[0]) => {
    return `/Screenshot/${
      theme === "dark" ? feature.screenshotDark : feature.screenshot
    }.png?v=${theme}`;
  };

  return (
    <section ref={sectionRef} id="features" className="wincux-features-section">
      <div className="container">
        {/* Section Title */}
        <div className="wincux-features-header">
          <h2 className="wincux-features-title">
            {titles.map((title, index) => (
              <span
                key={index}
                className={`wincux-title-word ${
                  title.trim() === "best" ? "wincux-title-highlight" : ""
                }`}
              >
                {title}
                {index === 1 && <br className="hidden md:block" />}
              </span>
            ))}
          </h2>

          <p className="wincux-feature-description">
            WinCux is packed with features that help you create the perfect
            desktop environment. Desktop enhancement tools should be powerful
            yet simple to use.
          </p>
        </div>

        {/* Features Content */}
        <div className="wincux-features-content">
          {/* Feature List - Desktop */}
          <div className="wincux-features-list">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className="wincux-feature-item"
                data-index={index}
                onClick={() => handleFeatureChange(index)}
                onMouseEnter={() => handleFeatureHover(index)}
              >
                <h3 className="wincux-feature-title">{feature.title}</h3>
                <p className="wincux-feature-desc">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Feature Tabs - Mobile */}
          <div className="wincux-features-tabs">
            {features.map((feature, index) => (
              <button
                key={feature.id}
                className="wincux-feature-tab"
                data-index={index}
                onClick={() => handleFeatureChange(index)}
              >
                {feature.title}
              </button>
            ))}
          </div>

          {/* Mobile Description */}
          <div className="wincux-mobile-description">
            {features[0].description}
          </div>

          {/* Image Stack */}
          <div className="wincux-image-container">
            <div className="wincux-image-stack">
              {features.map((feature, index) => (
                <Image
                  key={`${feature.id}-${theme}-${index}`}
                  src={getImageSrc(feature)}
                  alt={feature.title}
                  width={1920}
                  height={1080}
                  className="wincux-feature-image"
                  data-index={index}
                  priority={index === 0}
                  style={{
                    opacity: 0,
                    transform: "translate3d(-50%, 30px, -100px) scale(0.92)",
                    transition: "all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)",
                  }}
                  unoptimized={false}
                  onLoad={() => {
                    // Ensure image is ready for display
                    if (index === activeFeature && isAnimated) {
                      const img = document.querySelector(
                        `.wincux-feature-image[data-index="${index}"]`
                      ) as HTMLElement;
                      if (img) {
                        setTimeout(() => {
                          img.style.opacity = "1";
                          img.style.transform =
                            "translate3d(-50%, 0, 0) scale(1)";
                        }, 50);
                      }
                    }
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
