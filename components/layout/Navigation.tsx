"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import ThemeSwitch from "../ThemeSwitch";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleDropdownToggle = (
    dropdownName: string,
    event: React.MouseEvent
  ) => {
    event.stopPropagation();
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const handleDropdownHover = (dropdownName: string | null) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }

    if (dropdownName) {
      setActiveDropdown(dropdownName);
    } else {
      dropdownTimeoutRef.current = setTimeout(() => {
        setActiveDropdown(null);
      }, 300);
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="zen-navbar">
        <div className="zen-nav-container">
          {/* Brand */}
          <Link href="/" className="zen-nav-brand">
            <Image
              src="/logo.png"
              alt="WinCux Logo"
              width={32}
              height={32}
              className="zen-logo"
            />
            <span>WinCux</span>
          </Link>

          {/* Desktop Menu */}
          <div className="zen-nav-menu">
            {/* Getting Started Dropdown */}
            <div
              className="zen-dropdown-wrapper"
              onMouseEnter={() => handleDropdownHover("gettingStarted")}
              onMouseLeave={() => handleDropdownHover(null)}
            >
              <button
                className="zen-dropdown-trigger"
                onClick={(e) => handleDropdownToggle("gettingStarted", e)}
              >
                <span>Getting Started</span>
                <svg
                  className={`zen-chevron ${
                    activeDropdown === "gettingStarted"
                      ? "zen-chevron-open"
                      : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {activeDropdown === "gettingStarted" && (
                <div className="zen-dropdown-menu zen-dropdown-2col">
                  <Link
                    href="#features"
                    className="zen-dropdown-item zen-dropdown-featured"
                  >
                    <div className="zen-dropdown-title">
                      Desktop Enhancement
                    </div>
                    <div className="zen-dropdown-description">
                      Transform your Windows desktop with beautiful wallpapers
                      and Rainmeter integration
                    </div>
                    <button className="zen-dropdown-btn">
                      Try WinCux
                      <svg
                        className="zen-arrow-icon"
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
                    </button>
                  </Link>
                  <Link href="/download" className="zen-dropdown-item">
                    <div className="zen-dropdown-title">Download</div>
                    <div className="zen-dropdown-description">
                      Get WinCux for Windows, macOS, and Linux
                    </div>
                  </Link>
                  <Link
                    href="https://github.com/samcuxx/WinCux"
                    className="zen-dropdown-item"
                  >
                    <div className="zen-dropdown-title">GitHub</div>
                    <div className="zen-dropdown-description">
                      View source code and contribute to the project
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Useful Links Dropdown */}
            <div
              className="zen-dropdown-wrapper"
              onMouseEnter={() => handleDropdownHover("usefulLinks")}
              onMouseLeave={() => handleDropdownHover(null)}
            >
              <button
                className="zen-dropdown-trigger"
                onClick={(e) => handleDropdownToggle("usefulLinks", e)}
              >
                <span>Useful Links</span>
                <svg
                  className={`zen-chevron ${
                    activeDropdown === "usefulLinks" ? "zen-chevron-open" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {activeDropdown === "usefulLinks" && (
                <div className="zen-dropdown-menu zen-dropdown-1col">
                  <Link href="#about" className="zen-dropdown-item">
                    <div className="zen-dropdown-title">About Us</div>
                    <div className="zen-dropdown-description">
                      Learn more about WinCux and our mission
                    </div>
                  </Link>
                  <Link
                    href="https://github.com/samcuxx/WinCux/wiki"
                    className="zen-dropdown-item"
                  >
                    <div className="zen-dropdown-title">Documentation</div>
                    <div className="zen-dropdown-description">
                      User guides and technical documentation
                    </div>
                  </Link>
                  <Link
                    href="https://github.com/samcuxx/WinCux"
                    className="zen-dropdown-item"
                  >
                    <div className="zen-dropdown-title">GitHub</div>
                    <div className="zen-dropdown-description">
                      Report issues and contribute to development
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Direct Features Link */}
            <Link href="#features" className="zen-nav-link">
              <span>Features</span>
            </Link>
          </div>

          {/* Actions */}
          <div className="zen-nav-actions">
            <div className="zen-theme-switcher">
              <ThemeSwitch />
            </div>
            <Link href="/download" className="zen-download-btn">
              <span className="zen-download-text">
                Download
                <svg
                  className="zen-arrow-icon"
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
              </span>
              <span className="zen-download-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </span>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="zen-mobile-menu-btn"
              aria-label="Open menu"
            >
              <svg
                className="zen-menu-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Slide Menu */}
      <div
        className={`zen-mobile-menu ${
          isMobileMenuOpen ? "zen-mobile-menu-open" : ""
        }`}
      >
        <div className="zen-mobile-header">
          <div className="zen-mobile-title">Menu</div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="zen-mobile-close"
          >
            <span className="sr-only">Close menu</span>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <nav className="zen-mobile-nav">
          <ul className="zen-mobile-list">
            <li>
              <div className="zen-mobile-section">Getting Started</div>
              <ul className="zen-mobile-sublist">
                <li>
                  <Link
                    href="#features"
                    className="zen-mobile-link"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Desktop Enhancement
                  </Link>
                </li>
                <li>
                  <Link
                    href="/download"
                    className="zen-mobile-link"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Download
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/samcuxx/WinCux"
                    className="zen-mobile-link"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    GitHub
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <div className="zen-mobile-section">Useful Links</div>
              <ul className="zen-mobile-sublist">
                <li>
                  <Link
                    href="#about"
                    className="zen-mobile-link"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/samcuxx/WinCux/wiki"
                    className="zen-mobile-link"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/samcuxx/WinCux"
                    className="zen-mobile-link"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    GitHub
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link
                href="#features"
                className="zen-mobile-main-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                href="/download"
                className="zen-mobile-main-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Download
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="zen-mobile-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
