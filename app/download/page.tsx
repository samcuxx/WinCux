import Image from "next/image";
import Link from "next/link";

export default function DownloadPage() {
  const platforms = [
    {
      name: "Windows",
      description: "For Windows 10 and Windows 11",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-13.051-1.35" />
        </svg>
      ),
      downloads: [
        {
          arch: "x64",
          url: "https://github.com/samcuxx/WinCux/releases/latest/download/WinCux-Setup-x64.exe",
          size: "~45 MB",
        },
        {
          arch: "arm64",
          url: "https://github.com/samcuxx/WinCux/releases/latest/download/WinCux-Setup-arm64.exe",
          size: "~42 MB",
        },
      ],
      available: true,
    },
    {
      name: "macOS",
      description: "For macOS 10.15 and later",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
      ),
      downloads: [
        {
          arch: "Intel",
          url: "#",
          size: "~48 MB",
        },
        {
          arch: "Apple Silicon",
          url: "#",
          size: "~45 MB",
        },
      ],
      available: false,
    },
    {
      name: "Linux",
      description: "For Ubuntu, Fedora, and other distributions",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.5 14.5c-.3-.3-.9-.3-1.2 0s-.3.9 0 1.2l2.1 2.1c.3.3.9.3 1.2 0s.3-.9 0-1.2l-2.1-2.1zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5c0 2.21 1.79 4 4 4s4-1.79 4-4-1.79-4-4-4-4 1.79-4 4z" />
        </svg>
      ),
      downloads: [
        {
          arch: "AppImage",
          url: "#",
          size: "~52 MB",
        },
        {
          arch: "deb",
          url: "#",
          size: "~48 MB",
        },
      ],
      available: false,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="section-padding">
        <div className="container">
          <div className="flex flex-col items-center text-center gap-8">
            <Image
              src="/logo.png"
              alt="WinCux Logo"
              width={96}
              height={96}
              className="rounded-2xl shadow-lg"
            />
            <div>
              <h1 className="title-lg mb-4">
                Download <span className="text-gradient">WinCux</span>
              </h1>
              <p className="description-lg max-w-2xl">
                Get the latest version of WinCux and start enhancing your
                desktop experience.
                <br />
                Free, open-source, and always up-to-date.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Download Cards */}
      <section className="pb-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {platforms.map((platform) => (
              <div key={platform.name} className="download-card">
                <div className="download-card__icon">{platform.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{platform.name}</h3>
                <p className="text-muted-foreground mb-6">
                  {platform.description}
                </p>

                <div className="space-y-3">
                  {platform.downloads.map((download) => (
                    <div key={download.arch}>
                      {platform.available ? (
                        <Link
                          href={download.url}
                          className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <svg
                              className="w-5 h-5 text-primary"
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
                            <div>
                              <div className="font-medium">{download.arch}</div>
                              <div className="text-sm text-muted-foreground">
                                {download.size}
                              </div>
                            </div>
                          </div>
                          <svg
                            className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </Link>
                      ) : (
                        <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/50 opacity-60">
                          <div className="flex items-center gap-3">
                            <svg
                              className="w-5 h-5 text-muted-foreground"
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
                            <div>
                              <div className="font-medium">{download.arch}</div>
                              <div className="text-sm text-muted-foreground">
                                Coming Soon
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="section-padding bg-muted/30">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="title-md mb-6">System Requirements</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="feature-card">
                <h3 className="font-semibold mb-2">Windows</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Windows 10 version 1903 or later</li>
                  <li>Windows 11 (recommended)</li>
                  <li>4GB RAM minimum</li>
                  <li>500MB storage space</li>
                </ul>
              </div>
              <div className="feature-card opacity-60">
                <h3 className="font-semibold mb-2">macOS</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>macOS 10.15 or later</li>
                  <li>Intel or Apple Silicon</li>
                  <li>4GB RAM minimum</li>
                  <li>500MB storage space</li>
                </ul>
              </div>
              <div className="feature-card opacity-60">
                <h3 className="font-semibold mb-2">Linux</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Ubuntu 18.04 or later</li>
                  <li>Fedora 32 or later</li>
                  <li>4GB RAM minimum</li>
                  <li>500MB storage space</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
