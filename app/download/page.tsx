"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface GitHubAsset {
  name: string;
  download_count: number;
  size: number;
  browser_download_url: string;
  content_type: string;
}

interface GitHubRelease {
  tag_name: string;
  name: string;
  body: string;
  published_at: string;
  assets: GitHubAsset[];
  html_url: string;
}

interface Platform {
  name: string;
  icon: React.ReactNode;
  detectPattern: RegExp;
  assetPattern: RegExp;
  available: boolean;
}

export default function DownloadPage() {
  const [release, setRelease] = useState<GitHubRelease | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userOS, setUserOS] = useState<string>("Windows");

  const platforms: Record<string, Platform> = {
    Windows: {
      name: "Windows",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-13.051-1.35" />
        </svg>
      ),
      detectPattern: /Windows/i,
      assetPattern: /WinCux.*\.exe$/i,
      available: true,
    },
    macOS: {
      name: "macOS",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
      ),
      detectPattern: /Mac|iPhone|iPad|iPod/i,
      assetPattern: /WinCux.*\.(dmg|pkg)$/i,
      available: false,
    },
    Linux: {
      name: "Linux",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.5 14.5c-.3-.3-.9-.3-1.2 0s-.3.9 0 1.2l2.1 2.1c.3.3.9.3 1.2 0s.3-.9 0-1.2l-2.1-2.1zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
        </svg>
      ),
      detectPattern: /Linux|X11/i,
      assetPattern: /WinCux.*\.(AppImage|deb|rpm|tar\.gz)$/i,
      available: false,
    },
  };

  useEffect(() => {
    const detectOS = (): string => {
      const userAgent = navigator.userAgent;

      if (platforms.Windows.detectPattern.test(userAgent)) return "Windows";
      if (platforms.macOS.detectPattern.test(userAgent)) return "macOS";
      if (platforms.Linux.detectPattern.test(userAgent)) return "Linux";

      return "Windows"; // Default fallback
    };

    setUserOS(detectOS());
  }, []);

  useEffect(() => {
    const fetchLatestRelease = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/github/latest", {
          cache: "no-store",
        });

        if (!response.ok) {
          let message = `Failed to fetch release data: ${response.status}`;
          try {
            const json = await response.json();
            if (json?.error) message = json.error;
          } catch {}
          throw new Error(message);
        }

        const releaseData: GitHubRelease = await response.json();
        setRelease(releaseData);
      } catch (err) {
        console.error("Error fetching release:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch release data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLatestRelease();
  }, []);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getPlatformAsset = (platformKey: string): GitHubAsset | null => {
    if (!release) return null;
    const platform = platforms[platformKey];
    return (
      release.assets.find((asset) => platform.assetPattern.test(asset.name)) ||
      null
    );
  };

  const currentPlatform = platforms[userOS];
  const currentAsset = getPlatformAsset(userOS);

  if (loading) {
    return (
      <div className="download-page">
        <div className="download-container">
          <div className="download-loading">
            <div className="download-spinner"></div>
            <p className="download-loading-text">Loading latest release...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="download-page">
        <div className="download-container">
          <div className="download-error">
            <svg
              className="download-error-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <h2 className="download-error-title">
              Unable to Load Release Data
            </h2>
            <p className="download-error-message">{error}</p>
            <Link
              href="https://github.com/samcuxx/WinCux/releases/latest"
              className="download-fallback-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit GitHub Releases
            </Link>
          </div>
        </div>
      </div>
    );
  }

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

          {/* Release Info */}
          {release && (
            <div className="download-release-info">
              <div className="download-version">
                <span className="download-version-text">Latest Version:</span>
                <span className="download-version-number">
                  {release.tag_name}
                </span>
                <span className="download-release-date">
                  Released {formatDate(release.published_at)}
                </span>
              </div>
            </div>
          )}

          {/* Primary Download Button */}
          <div className="download-primary">
            {currentAsset ? (
              <Link
                href={currentAsset.browser_download_url}
                className="download-btn"
                download
              >
                {currentPlatform.icon}
                <span className="download-btn-content">
                  <span className="download-btn-text">
                    Download for {currentPlatform.name}
                  </span>
                  <span className="download-btn-size">
                    {formatFileSize(currentAsset.size)}
                  </span>
                </span>
              </Link>
            ) : currentPlatform.available ? (
              <div className="download-btn download-btn-disabled">
                {currentPlatform.icon}
                <span className="download-btn-content">
                  <span className="download-btn-text">
                    No Release Available
                  </span>
                  <span className="download-btn-size">Check back later</span>
                </span>
              </div>
            ) : (
              <div className="download-btn download-btn-disabled">
                {currentPlatform.icon}
                <span className="download-btn-content">
                  <span className="download-btn-text">
                    Coming Soon for {currentPlatform.name}
                  </span>
                  <span className="download-btn-size">In development</span>
                </span>
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
            {Object.entries(platforms).map(([key, platform]) => {
              const asset = getPlatformAsset(key);

              return (
                <div
                  key={key}
                  className={`download-platform-card ${
                    !platform.available ? "download-platform-disabled" : ""
                  }`}
                >
                  <div className="download-platform-header">
                    <div className="download-platform-icon">
                      {platform.icon}
                    </div>
                    <div>
                      <h3 className="download-platform-name">
                        {platform.name}
                      </h3>
                      <p className="download-platform-status">
                        {asset
                          ? `Available • ${formatFileSize(asset.size)}`
                          : platform.available
                          ? "No release available"
                          : "Coming soon"}
                      </p>
                      {asset &&
                        // <p className="download-platform-downloads">
                        //   {asset.download_count.toLocaleString()} downloads
                        // </p>
                        ""}
                    </div>
                  </div>

                  <div className="download-platform-actions">
                    {asset ? (
                      <Link
                        href={asset.browser_download_url}
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
                    ) : (
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
                        {platform.available ? "No Release" : "Coming Soon"}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Release Notes */}
          {release && release.body && (
            <div className="download-release-notes">
              <h3 className="download-release-notes-title">
                What's New in {release.tag_name}
              </h3>
              <div className="download-release-notes-content">
                <pre className="download-release-notes-text">
                  {release.body}
                </pre>
              </div>
              <div className="download-release-notes-footer">
                <Link
                  href={release.html_url}
                  className="download-release-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Full Release Notes
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
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
