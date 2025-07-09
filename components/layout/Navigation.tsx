"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import ThemeSwitch from "../ThemeSwitch";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isAnimated, setIsAnimated] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Navbar animation effect
  useEffect(() => {
    const animateNavbar = () => {
      const brandElement = document.querySelector(".wincux-nav-brand");
      const menuElement = document.querySelector(".wincux-nav-menu");
      const actionsElement = document.querySelector(".wincux-nav-actions");

      // Animate brand
      setTimeout(() => {
        if (brandElement) {
          const htmlElement = brandElement as HTMLElement;
          htmlElement.style.transition =
            "all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)";
          htmlElement.style.opacity = "1";
          htmlElement.style.transform = "translateY(0)";
          htmlElement.style.filter = "blur(0)";
        }
      }, 100);

      // Animate menu
      setTimeout(() => {
        if (menuElement) {
          const htmlElement = menuElement as HTMLElement;
          htmlElement.style.transition =
            "all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)";
          htmlElement.style.opacity = "1";
          htmlElement.style.transform = "translateY(0)";
          htmlElement.style.filter = "blur(0)";
        }
      }, 250);

      // Animate actions
      setTimeout(() => {
        if (actionsElement) {
          const htmlElement = actionsElement as HTMLElement;
          htmlElement.style.transition =
            "all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)";
          htmlElement.style.opacity = "1";
          htmlElement.style.transform = "translateY(0)";
          htmlElement.style.filter = "blur(0)";
        }
      }, 400);

      // Mark animation as complete
      setTimeout(() => {
        setIsAnimated(true);
      }, 1000);
    };

    // Start navbar animation after a short delay
    const timer = setTimeout(animateNavbar, 50);
    return () => clearTimeout(timer);
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
      <nav className="wincux-navbar">
        <div className="wincux-nav-container">
          {/* Brand */}
          <Link
            href="/"
            className="wincux-nav-brand"
            style={{
              opacity: 0,
              transform: "translateY(-20px)",
              filter: "blur(4px)",
            }}
          >
            <Image
              src="/logo.png"
              alt="WinCux Logo"
              width={32}
              height={32}
              className="wincux-logo"
            />
            <span>WinCux</span>
          </Link>

          {/* Desktop Menu */}
          <div
            className="wincux-nav-menu"
            style={{
              opacity: 0,
              transform: "translateY(-20px)",
              filter: "blur(4px)",
            }}
          ></div>

          {/* Actions */}
          <div
            className="wincux-nav-actions"
            style={{
              opacity: 0,
              transform: "translateY(-20px)",
              filter: "blur(4px)",
            }}
          >
            <div className="wincux-theme-switcher">
              <ThemeSwitch />
            </div>
            <Link href="/download" className="wincux-download-btn">
              <span className="wincux-download-text">
                Download
                <svg
                  className="wincux-arrow-icon"
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
              <span className="wincux-download-icon">
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
              className="wincux-mobile-menu-btn"
              aria-label="Open menu"
            >
              <svg
                className="wincux-menu-icon"
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
        className={`wincux-mobile-menu ${
          isMobileMenuOpen ? "wincux-mobile-menu-open" : ""
        }`}
      >
        <div className="wincux-mobile-header">
          <div className="wincux-mobile-title">Menu</div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="wincux-mobile-close"
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
        <nav className="wincux-mobile-nav">
          <ul className="wincux-mobile-list">
            <li>
              <div className="wincux-mobile-section">Getting Started</div>
              <ul className="wincux-mobile-sublist">
                <li>
                  <Link
                    href="#features"
                    className="wincux-mobile-link"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Desktop Enhancement
                  </Link>
                </li>
                <li>
                  <Link
                    href="/download"
                    className="wincux-mobile-link"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Download
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/samcuxx/WinCux"
                    className="wincux-mobile-link"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    GitHub
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <div className="wincux-mobile-section">Useful Links</div>
              <ul className="wincux-mobile-sublist">
                <li>
                  <Link
                    href="#about"
                    className="wincux-mobile-link"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/samcuxx/WinCux/wiki"
                    className="wincux-mobile-link"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/samcuxx/WinCux"
                    className="wincux-mobile-link"
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
                className="wincux-mobile-main-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                href="/download"
                className="wincux-mobile-main-link bg-[#6c5dd3]"
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
          className="wincux-mobile-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
