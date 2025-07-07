import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer
      id="footer"
      className="zen-footer"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="zen-footer-container">
        <div className="zen-footer-content">
          {/* Brand Section */}
          <section className="zen-footer-brand" aria-labelledby="footer-title">
            <Link href="/">
              <h2 id="footer-title" className="zen-footer-title">
                WinCux
              </h2>
            </Link>
            <p className="zen-footer-description">
              Beautifully designed, privacy-focused, and packed with features.
              We care about your desktop experience, not your data.
            </p>
          </section>

          {/* Download Button */}
          <section className="zen-footer-download">
            <Link
              href="/download"
              className="zen-footer-download-btn"
              aria-label="Download WinCux"
            >
              Download
              <svg
                className="zen-arrow-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </section>

          {/* Navigation Links */}
          <section
            className="zen-footer-nav"
            aria-label="Footer navigation and links"
          >
            <div className="zen-footer-links-grid">
              <div className="zen-footer-links-left">
                {/* Follow Us Section */}
                <section
                  className="zen-footer-section"
                  aria-labelledby="follow-us-heading"
                >
                  <h3 id="follow-us-heading" className="zen-footer-heading">
                    Follow Us
                  </h3>
                  <div className="zen-social-links">
                    <Link
                      href="https://github.com/samcuxx/WinCux"
                      className="zen-social-link"
                      aria-label="GitHub"
                    >
                      <svg
                        className="zen-social-icon"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </Link>
                    <Link
                      href="#"
                      className="zen-social-link"
                      aria-label="Twitter"
                    >
                      <svg
                        className="zen-social-icon"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </Link>
                    <Link
                      href="#"
                      className="zen-social-link"
                      aria-label="Discord"
                    >
                      <svg
                        className="zen-social-icon"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                      </svg>
                    </Link>
                    <Link
                      href="#"
                      className="zen-social-link"
                      aria-label="Reddit"
                    >
                      <svg
                        className="zen-social-icon"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
                      </svg>
                    </Link>
                  </div>
                </section>

                {/* About Us Section */}
                <section
                  className="zen-footer-section"
                  aria-labelledby="about-us-heading"
                >
                  <h3 id="about-us-heading" className="zen-footer-heading">
                    About Us
                  </h3>
                  <nav aria-label="About navigation">
                    <ul className="zen-footer-list">
                      <li>
                        <Link href="#about" className="zen-footer-link">
                          Team & Contributors
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="zen-footer-link">
                          Privacy Policy
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </section>
              </div>

              {/* Get Started Section */}
              <nav
                className="zen-footer-section"
                aria-labelledby="get-started-heading"
              >
                <h3 id="get-started-heading" className="zen-footer-heading">
                  Get Started
                </h3>
                <ul className="zen-footer-list">
                  <li>
                    <Link href="#" className="zen-footer-link">
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link href="#features" className="zen-footer-link">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="zen-footer-link">
                      Release Notes
                    </Link>
                  </li>
                  <li>
                    <Link href="/download" className="zen-footer-link">
                      Download
                    </Link>
                  </li>
                </ul>
              </nav>

              {/* Get Help Section */}
              <nav
                className="zen-footer-section"
                aria-labelledby="get-help-heading"
              >
                <h3 id="get-help-heading" className="zen-footer-heading">
                  Get Help
                </h3>
                <ul className="zen-footer-list">
                  <li>
                    <Link href="#" className="zen-footer-link">
                      Discord
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="zen-footer-link">
                      Status
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://github.com/samcuxx/WinCux/issues"
                      className="zen-footer-link"
                    >
                      Report an Issue
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="zen-footer-link">
                      Security
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </section>

          {/* Copyright Section */}
          <section
            className="zen-footer-copyright"
            aria-label="Copyright information"
          >
            <p className="zen-copyright-text">
              Made with ❤️ by{" "}
              <Link href="#about" className="zen-copyright-link">
                SamCux
              </Link>
            </p>
          </section>
        </div>

        {/* Decorative Circles */}
        <div className="zen-footer-decoration" aria-hidden="true">
          <div className="zen-circles"></div>
        </div>
      </div>
    </footer>
  );
}
