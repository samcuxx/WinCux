"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function DownloadPage() {
  const [userOS, setUserOS] = useState<string>("Windows");

  useEffect(() => {
    // Detect user's operating system
    const detectOS = () => {
      const userAgent = navigator.userAgent;
      if (userAgent.includes("Mac")) return "macOS";
      if (userAgent.includes("Linux")) return "Linux";
      return "Windows";
    };

    setUserOS(detectOS());
  }, []);

  const platforms = {
    Windows: {
      name: "Windows",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-13.051-1.35" />
        </svg>
      ),
      download:
        "https://github.com/samcuxx/WinCux/releases/latest/download/WinCux-Setup-x64.exe",
      available: true,
    },
    macOS: {
      name: "macOS",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
      ),
      download: "#",
      available: false,
    },
    Linux: {
      name: "Linux",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.5 14.5c-.3-.3-.9-.3-1.2 0s-.3.9 0 1.2l2.1 2.1c.3.3.9.3 1.2 0s.3-.9 0-1.2l-2.1-2.1zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
        </svg>
      ),
      download: "#",
      available: false,
    },
  };

  const currentPlatform = platforms[userOS as keyof typeof platforms];

  return (
    <div className="download-page">
      <div className="download-container">
        {/* App Icon */}
        <div className="download-icon">
          <Image
            src="/logo.png"
            alt="WinCux Logo"
            width={120}
            height={120}
            className="download-app-icon"
            priority
          />
        </div>

        {/* Main Content */}
        <div className="download-content">
          <h1 className="download-title">Start your journey</h1>

          <p className="download-description">
            Download WinCux for your platform and experience a more beautiful
            desktop enhancement.
            <br />
            WinCux is available for Windows, with macOS and Linux coming soon.
          </p>

          {/* Primary Download Button */}
          <div className="download-primary">
            {currentPlatform.available ? (
              <Link
                href={currentPlatform.download}
                className="download-btn"
                download
              >
                {currentPlatform.icon}
                Download for {currentPlatform.name}
              </Link>
            ) : (
              <div className="download-btn download-btn-disabled">
                {currentPlatform.icon}
                Coming Soon for {currentPlatform.name}
              </div>
            )}
          </div>

          {/* Status and Links */}
          <div className="download-status">
            <div className="download-beta">
              <span className="download-status-text">
                WinCux is currently in
              </span>
              <span className="download-beta-badge">BETA</span>
            </div>

            <div className="download-links">
              <span className="download-device-text">
                If your device has been wrongly detected,{" "}
                <Link href="#all-downloads" className="download-link">
                  see other downloads
                </Link>
                .
              </span>
              <span className="download-support-text">
                Please report any issues you encounter on{" "}
                <Link
                  href="https://github.com/samcuxx/WinCux/issues"
                  className="download-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </Link>
                .
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* All Downloads Section */}
      <section id="all-downloads" className="download-all-section">
        <div className="container">
          <div className="download-all-header">
            <h2 className="download-all-title">All Downloads</h2>
            <p className="download-all-description">
              Choose your platform and architecture
            </p>
          </div>

          <div className="download-platforms">
            {Object.entries(platforms).map(([key, platform]) => (
              <div
                key={key}
                className={`download-platform-card ${
                  !platform.available ? "download-platform-disabled" : ""
                }`}
              >
                <div className="download-platform-header">
                  <div className="download-platform-icon">{platform.icon}</div>
                  <div>
                    <h3 className="download-platform-name">{platform.name}</h3>
                    <p className="download-platform-status">
                      {platform.available ? "Available now" : "Coming soon"}
                    </p>
                  </div>
                </div>

                {platform.available ? (
                  <div className="download-platform-actions">
                    <Link
                      href={platform.download}
                      className="download-platform-btn"
                      download
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      Download
                    </Link>
                  </div>
                ) : (
                  <div className="download-platform-actions">
                    <div className="download-platform-btn download-platform-btn-disabled">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                      Coming Soon
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
