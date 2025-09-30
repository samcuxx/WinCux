"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Features() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      id: "wallpapers",
      title: "Wallpaper Management",
      description:
        "Browse and download thousands of high-quality wallpapers from Wallhaven with advanced filtering and one-click apply.",
      screenshot: "Wallpapers_light",
      screenshotDark: "Wallpaper_dark",
      stats: "10,000+ Wallpapers",
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
      stats: "50+ Skins Available",
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
      stats: "Fluent Design System",
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
      stats: "Intelligent Automation",
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

  // Auto-rotate features for showcase with hover pause
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [features.length, isPaused]);

  const getImageSrc = (feature: (typeof features)[0]) => {
    return `/Screenshot/${
      theme === "dark" ? feature.screenshotDark : feature.screenshot
    }.png`;
  };

  return (
    <section className="modern-features-section">
      {/* Background elements */}
      <div className="features-background">
        <div className="features-grid-pattern"></div>
      </div>

      <div className="modern-features-container">
        {/* Section Header */}
        <div className="modern-features-header">
          <div className="features-badge">
            <span>🚀 Powerful Tools</span>
          </div>
          <h2 className="modern-features-title">
            Everything You Need for the
            <br />
            <span className="title-gradient">Perfect Desktop</span>
          </h2>
          <p className="modern-features-description">
            Professional-grade tools designed to transform your Windows
            experience with cutting-edge features and seamless integration.
          </p>
        </div>

        {/* Features Showcase */}
        <div
          className="features-showcase"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Feature Navigation */}
          <div className="features-nav">
            {features.map((feature, index) => (
              <button
                key={feature.id}
                className={`feature-nav-item ${
                  activeFeature === index ? "active" : ""
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <div className="feature-nav-icon">{feature.icon}</div>
                <div className="feature-nav-content">
                  <h3 className="feature-nav-title">{feature.title}</h3>
                  <p className="feature-nav-description">
                    {feature.description}
                  </p>
                  <div className="feature-nav-stats">{feature.stats}</div>
                </div>
                <div className="feature-nav-indicator">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </button>
            ))}
          </div>

          {/* Feature Display */}
          <div className="features-display">
            <div className="feature-image-container">
              {features.map((feature, index) => (
                <div
                  key={feature.id}
                  className={`feature-image-wrapper ${
                    activeFeature === index ? "active" : ""
                  }`}
                >
                  <Image
                    src={getImageSrc(feature)}
                    alt={feature.title}
                    width={800}
                    height={450}
                    className="modern-feature-screenshot"
                    priority={index === 0}
                  />
                  <div className="feature-image-overlay">
                    <div className="feature-info">
                      <h4>{feature.title}</h4>
                      <p>{feature.stats}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Progress Indicators */}
            <div className="feature-progress">
              {features.map((_, index) => (
                <button
                  key={index}
                  className={`progress-dot ${
                    activeFeature === index ? "active" : ""
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <span className="sr-only">Feature {index + 1}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Features Grid */}
        <div className="additional-features">
          <div className="features-grid-modern">
            <div className="feature-mini-card">
              <div className="mini-card-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h4>Privacy First</h4>
              <p>No data collection, completely offline operation</p>
            </div>

            <div className="feature-mini-card">
              <div className="mini-card-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
              <h4>Auto Updates</h4>
              <p>Always stay current with the latest features</p>
            </div>

            <div className="feature-mini-card">
              <div className="mini-card-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h4>Lightning Fast</h4>
              <p>Optimized for performance and minimal resource usage</p>
            </div>

            <div className="feature-mini-card">
              <div className="mini-card-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                  />
                </svg>
              </div>
              <h4>Easy Sharing</h4>
              <p>Share your desktop configurations with friends</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
