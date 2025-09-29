"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
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

  return (
    <div className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Beautiful Desktop
              <br />
              <span className="hero-title-accent">Enhancement</span>
            </h1>
            <p className="hero-description">
              Transform your Windows desktop with elegant wallpapers, Rainmeter
              skins, and modern design tools.
            </p>
          </div>

          <div className="hero-buttons">
            <Link href="/download" className="btn-hero-primary">
              Download WinCux
              <svg
                className="btn-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
            </Link>
            <Link
              href="https://ko-fi.com/samcux"
              className="btn-hero-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Support Project
            </Link>
          </div>
        </div>

        <div className="hero-image">
          <Image
            src={`/Screenshot/WinCux_${theme}.png`}
            alt="WinCux Desktop Enhancement Application"
            width={1920}
            height={1080}
            className="hero-screenshot"
            priority
          />
        </div>
      </div>
    </div>
  );
}
