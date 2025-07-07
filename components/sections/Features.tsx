"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isAnimated, setIsAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const features = [
    {
      id: "wallpapers",
      title: "Wallpaper Management",
      description:
        "Browse and download thousands of high-quality wallpapers from Wallhaven. Advanced filtering by categories, colors, resolutions, and tags with instant preview and one-click apply.",
      screenshot: "/Screenshot1.png",
    },
    {
      id: "rainmeter",
      title: "Rainmeter Integration",
      description:
        "Seamlessly manage Rainmeter skins with automatic detection, easy installation, and configuration. Toggle controls let you enable/disable skins directly from the app.",
      screenshot: "/Screenshot2.png",
    },
    {
      id: "design",
      title: "Modern Design",
      description:
        "Windows 11 Fluent Design System with acrylic effects, modern shadows, and smooth animations. Supports both dark and light themes with system preference detection.",
      screenshot: "/Screenshot3.png",
    },
    {
      id: "smart",
      title: "Smart Features",
      description:
        "Auto-updates, NSFW filtering, performance optimization, download management, and persistent settings. Everything you need for a seamless desktop enhancement experience.",
      screenshot: "/Screenshot4.png",
    },
  ];

  const titles = ["Productivity ", "at ", "its ", "best"];

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

    return () => observer.disconnect();
  }, [isAnimated]);

  const animateElements = () => {
    // Animate title words with stagger
    const titleElements = document.querySelectorAll(".zen-title-word");
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
    const descElement = document.querySelector(".zen-feature-description");
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
      ".zen-feature-item, .zen-feature-tab"
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
    if (index === activeFeature) return;

    setActiveFeature(index);

    // Update active states
    const allFeatures = document.querySelectorAll(
      ".zen-feature-item, .zen-feature-tab"
    );
    allFeatures.forEach((el, i) => {
      const actualIndex = i >= features.length ? i - features.length : i;
      if (actualIndex === index) {
        el.setAttribute("data-active", "true");
      } else {
        el.removeAttribute("data-active");
      }
    });

    // Animate images with sophisticated 3D stack effect
    const images = document.querySelectorAll(".zen-feature-image");
    images.forEach((img, i) => {
      const htmlImg = img as HTMLElement;
      const yOffset = (i - index) * 20;
      const zOffset = i === index ? 0 : -100 - Math.abs(i - index) * 50;
      const scale = i === index ? 1 : 0.95;
      const rotation = (i - index) * 3;

      if (i === index) {
        htmlImg.setAttribute("data-active", "true");
        htmlImg.style.opacity = "1";
        htmlImg.style.transform = `translate3d(-50%, 0, 0) scale(${scale})`;
        htmlImg.style.zIndex = "10";
      } else {
        htmlImg.removeAttribute("data-active");
        htmlImg.style.transform = `translate3d(-50%, ${yOffset}px, ${zOffset}px) rotate3d(1, 0, 0, ${rotation}deg) scale(${scale})`;
        htmlImg.style.zIndex = String(10 - Math.abs(i - index));
      }
    });

    // Update mobile description
    const mobileDesc = document.querySelector(".zen-mobile-description");
    if (mobileDesc) {
      mobileDesc.textContent = features[index].description;
    }
  };

  useEffect(() => {
    // Initialize the first feature
    if (isAnimated) {
      setTimeout(() => handleFeatureChange(0), 1000);
    }
  }, [isAnimated]);

  return (
    <section ref={sectionRef} id="features" className="zen-features-section">
      <div className="container">
        {/* Section Title */}
        <div className="zen-features-header">
          <h2 className="zen-features-title">
            {titles.map((title, index) => (
              <span
                key={index}
                className={`zen-title-word ${
                  title.trim() === "best" ? "zen-title-highlight" : ""
                }`}
              >
                {title}
                {index === 1 && <br className="hidden md:block" />}
              </span>
            ))}
          </h2>

          <p className="zen-feature-description">
            WinCux is packed with features that help you create the perfect
            desktop environment. Desktop enhancement tools should be powerful
            yet simple to use.
          </p>
        </div>

        {/* Features Content */}
        <div className="zen-features-content">
          {/* Feature List - Desktop */}
          <div className="zen-features-list">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className="zen-feature-item"
                data-index={index}
                data-active={index === 0 ? "true" : undefined}
                onClick={() => handleFeatureChange(index)}
              >
                <h3 className="zen-feature-title">{feature.title}</h3>
                <p className="zen-feature-desc">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Feature Tabs - Mobile */}
          <div className="zen-features-tabs">
            {features.map((feature, index) => (
              <button
                key={feature.id}
                className="zen-feature-tab"
                data-index={index}
                data-active={index === 0 ? "true" : undefined}
                onClick={() => handleFeatureChange(index)}
              >
                {feature.title}
              </button>
            ))}
          </div>

          {/* Mobile Description */}
          <div className="zen-mobile-description">
            {features[0].description}
          </div>

          {/* Image Stack */}
          <div className="zen-image-container">
            <div className="zen-image-stack">
              {features.map((feature, index) => (
                <Image
                  key={feature.id}
                  src={feature.screenshot}
                  alt={feature.title}
                  width={800}
                  height={600}
                  className="zen-feature-image"
                  data-index={index}
                  data-active={index === 0 ? "true" : undefined}
                  priority={index === 0}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
