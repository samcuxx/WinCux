<div align="center">
  <img src="public/resources/icon.png" alt="WinCux Logo" width="128" height="128">
  
  **A Professional Windows 11-Style Desktop Enhancement Application**
  
  Manage wallpapers and Rainmeter skins with a modern, intuitive interface designed for Windows 11.
  
  [![Latest Release](https://img.shields.io/github/v/release/samcuxx/WinCux?style=flat-square)](https://github.com/samcuxx/WinCux/releases)
  [![License](https://img.shields.io/github/license/samcuxx/WinCux?style=flat-square)](LICENSE)
  [![Downloads](https://img.shields.io/github/downloads/samcuxx/WinCux/total?style=flat-square)](https://github.com/samcuxx/WinCux/releases)
</div>

## 🌟 Features

### 🖼️ Wallpaper Management
- **Browse & Download**: Explore thousands of high-quality wallpapers from Wallhaven
- **Smart Search**: Advanced filtering by categories, colors, resolutions, and tags
- **Instant Preview**: View wallpapers in full resolution before downloading
- **One-Click Apply**: Set wallpapers as desktop background instantly
- **Local Library**: Manage your downloaded wallpapers with thumbnail previews
- **Cache Management**: Intelligent caching for faster browsing

### 🌈 Rainmeter Integration
- **Automatic Detection**: Checks for Rainmeter installation and offers automated setup
- **Skin Management**: Browse, download, and install Rainmeter skins
- **Easy Configuration**: Launch skin configurations with a single click
- **Toggle Controls**: Enable/disable skins directly from the app
- **Organized Library**: Keep track of all installed skins with metadata

### 🎨 Modern Design
- **Windows 11 Aesthetics**: Fluent Design System with acrylic effects and modern shadows
- **Dark/Light Themes**: Seamless theme switching with system preference detection
- **Responsive Interface**: Clean, intuitive layout optimized for desktop use
- **Smooth Animations**: Polished interactions and transitions
- **Custom Title Bar**: Frameless window with native window controls

### ⚙️ Smart Features
- **Auto-Updates**: Automatic application updates via GitHub releases
- **NSFW Filtering**: Optional content filtering with automatic cache refresh
- **Performance Optimization**: Efficient image loading and caching
- **Download Management**: Track downloads with progress indicators
- **Settings Sync**: Persistent preferences across sessions

## 🚀 Quick Start

### Download & Install
1. Download the latest release from the [Releases page](https://github.com/samcuxx/WinCux/releases)
2. Run the installer (`WinCux Setup.exe`)
3. Launch WinCux from your desktop or Start menu

### First Launch
1. **Browse Wallpapers**: Click on "Wallpapers" to explore the gallery
2. **Search & Filter**: Use the search bar and filters to find your perfect wallpaper
3. **Download & Apply**: Click any wallpaper to preview, then download and set as wallpaper
4. **Rainmeter Setup**: Visit "Rainmeter" section to install and manage skins
5. **Customize Settings**: Access "Settings" to configure themes and preferences

## 🛠️ Technology Stack

- **Frontend**: Next.js 14 with TypeScript
- **Desktop Framework**: Electron 28
- **UI Components**: shadcn/ui built on Radix UI
- **Styling**: Tailwind CSS with custom Windows 11 components
- **API Integration**: Wallhaven API for wallpaper content
- **Theme System**: next-themes for dark/light mode
- **Icons**: Lucide React icon library

## 📁 Project Structure

```
WinCux/
├── app/                    # Next.js application routes
│   ├── page.tsx           # Home dashboard
│   ├── wallpapers/        # Wallpaper gallery
│   ├── rainmeter/         # Rainmeter management
│   ├── downloads/         # Download management
│   └── settings/          # Application settings
├── components/            # Reusable UI components
│   ├── layout/           # Layout components (sidebar, topbar)
│   ├── pages/            # Page-specific components
│   ├── ui/               # shadcn/ui components
│   ├── wallpapers/       # Wallpaper-related components
│   └── rainmeter/        # Rainmeter-related components
├── main/                 # Electron main process
│   ├── main.js           # Application entry point
│   ├── preload.js        # Preload script for IPC
│   └── handlers/         # IPC handlers for different features
├── lib/                  # Utility libraries
│   ├── services/         # API services
│   ├── contexts/         # React contexts
│   └── utils.ts          # Utility functions
├── types/                # TypeScript definitions
└── resources/            # Application resources (icons, etc.)
```

## 🔧 Development

### Prerequisites
- Node.js 18+ and npm
- Git for version control

### Setup
```bash
# Clone the repository
git clone https://github.com/samcuxx/WinCux.git
cd WinCux

# Install dependencies
npm install

# Start development server
npm run dev
```

### Building
```bash
# Build for production
npm run build

# Build and package for distribution
# You will need to "export GH_TOKEN=your_github_token"

npm run publish
```

## 🎯 Usage Guide

### Managing Wallpapers
1. **Browse**: Use the wallpaper gallery to explore content
2. **Search**: Enter keywords in the search bar
3. **Filter**: Use category, color, and resolution filters
4. **Preview**: Click any wallpaper for full-size preview
5. **Download**: Click "Download" to save to your wallpaper library
6. **Apply**: Click "Set as Wallpaper" to apply to your desktop

### Rainmeter Integration
1. **Install Rainmeter**: If not installed, the app will guide you through setup
2. **Browse Skins**: Explore available Rainmeter skins
3. **Install**: Download and install skins directly from the app
4. **Manage**: Toggle skins on/off and access configurations
5. **Organize**: Keep track of all installed skins in one place

### Settings & Customization
- **Theme**: Switch between light and dark modes
- **Content Filter**: Enable/disable NSFW content filtering
- **Cache**: Manage downloaded content and clear cache
- **Updates**: Configure automatic update preferences

## 🔒 Privacy & Security

- **Local Storage**: All downloaded content is stored locally on your device
- **Secure API**: Uses HTTPS for all external API communications
- **No Tracking**: No personal data collection or analytics
- **Content Filtering**: Optional NSFW filtering for appropriate content

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: Report bugs on [GitHub Issues](https://github.com/samcuxx/WinCux/issues)
- **Discussions**: Join the conversation in [GitHub Discussions](https://github.com/samcuxx/WinCux/discussions)
- **Updates**: Follow releases for the latest features and fixes

## 🙏 Acknowledgments

- **Wallhaven**: For providing the excellent wallpaper API
- **Rainmeter**: For the amazing desktop customization platform
- **Microsoft**: For the Windows 11 Fluent Design System inspiration
- **Open Source Community**: For the incredible tools and libraries that made this possible

---

<div align="center">
  <p>Built with ❤️ for the Windows customization community</p>
  <p>© 2025 SamCux. All rights reserved.</p>
</div>
