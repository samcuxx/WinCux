"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Features() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const features = [
    {
      id: "wallpapers",
      title: "Wallpaper Management",
      description:
        "Browse and download thousands of high-quality wallpapers from Wallhaven with advanced filtering and one-click apply.",
      screenshot: "Wallpapers_light",
      screenshotDark: "Wallpaper_dark",
      icon: (
        <svg
          className="feature-icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      id: "rainmeter",
      title: "Rainmeter Integration",
      description:
        "Seamlessly manage Rainmeter skins with automatic detection, easy installation, and configuration controls.",
      screenshot: "Rainmeter_light",
      screenshotDark: "Rainmeter_dark",
      icon: (
        <svg
          className="feature-icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
    {
      id: "design",
      title: "Modern Design",
      description:
        "Windows 11 Fluent Design with acrylic effects, smooth animations, and support for both dark and light themes.",
      screenshot: "Modern_design_light",
      screenshotDark: "Modern_design_dark",
      icon: (
        <svg
          className="feature-icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
          />
        </svg>
      ),
    },
    {
      id: "features",
      title: "Smart Features",
      description:
        "Auto-updates, NSFW filtering, performance optimization, and persistent settings for seamless desktop enhancement.",
      screenshot: "Features_light",
      screenshotDark: "Features_dark",
      icon: (
        <svg
          className="feature-icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
  ];

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

  const getImageSrc = (feature: (typeof features)[0]) => {
    return `/Screenshot/${
      theme === "dark" ? feature.screenshotDark : feature.screenshot
    }.png`;
  };

  return (
    <section className="features-section">
      <div className="features-container">
        <div className="features-header">
          <h2 className="features-title">Powerful Features</h2>
          <p className="features-description">
            Everything you need to create the perfect desktop environment
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={feature.id} className="feature-card">
              <div className="feature-card-header">
                <div className="feature-icon-wrapper">{feature.icon}</div>
                <h3 className="feature-card-title">{feature.title}</h3>
              </div>

              <p className="feature-card-description">{feature.description}</p>

              <div className="feature-card-image">
                <Image
                  src={getImageSrc(feature)}
                  alt={feature.title}
                  width={400}
                  height={225}
                  className="feature-screenshot"
                  priority={index === 0}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
