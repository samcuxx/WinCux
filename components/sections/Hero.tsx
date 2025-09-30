"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    // Add video load delay for better UX
    const timer = setTimeout(() => {
      setIsVideoLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="modern-hero-section">
      {/* Background Elements */}
      <div className="hero-background">
        <div className="hero-gradient"></div>
        <div className="hero-grid"></div>
      </div>

      <div className="modern-hero-container">
        {/* Hero Content */}
        <div className="modern-hero-content">
          {/* <div className="hero-badge">
            <div className="status-dot"></div>
            <span>Professional Desktop Enhancement</span>
          </div> */}

          <h1 className="modern-hero-title">
            Revolutionize Your
            <br />
            <span className="hero-title-gradient">Windows Experience</span>
          </h1>

          <p className="modern-hero-description">
            Transform your Windows desktop with cutting-edge tools. Perfect
            blend of aesthetics and functionality.
          </p>

          <div className="modern-hero-buttons">
            <Link href="/download" className="btn-modern-primary">
              <span>Download WinCux</span>
              <svg
                className="btn-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </Link>

            <Link
              href="https://ko-fi.com/samcux"
              className="btn-modern-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="btn-icon-heart"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span>Support Project</span>
            </Link>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Downloads</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">4.9★</div>
              <div className="stat-label">User Rating</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Themes</div>
            </div>
          </div>
        </div>

        {/* Video Section */}
        <div className="modern-hero-media">
          <div className="video-container">
            <div className="video-wrapper">
              {isVideoLoaded && (
                <iframe
                  src="https://www.youtube.com/embed/_9Q1SHnI94E?autoplay=1&mute=1&loop=1&playlist=_9Q1SHnI94E&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1"
                  title="WinCux Software Demo"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="hero-video"
                ></iframe>
              )}
              {!isVideoLoaded && (
                <div className="video-loading">
                  <div className="loading-spinner"></div>
                  <span>Loading Demo...</span>
                </div>
              )}
            </div>

            <div className="video-overlay">
              <div className="play-indicator">
                <svg
                  className="play-icon"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span>Watch Demo</span>
              </div>
            </div>
          </div>

          {/* Feature highlights around video */}
          <div className="feature-highlights">
            <div className="highlight-item highlight-left">
              <div className="highlight-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
                  />
                </svg>
              </div>
              <span>Wallpaper Manager</span>
            </div>

            <div className="highlight-item highlight-right">
              <div className="highlight-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <span>Rainmeter Skins</span>
            </div>

            <div className="highlight-item highlight-bottom">
              <div className="highlight-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                  />
                </svg>
              </div>
              <span>System Optimization</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
