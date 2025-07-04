const { ipcMain } = require("electron");
const fs = require("fs");
const https = require("https");
const os = require("os");
const path = require("path");
const { exec, spawn } = require("child_process");

// Helper function to get folder size
async function getFolderSize(folderPath) {
  try {
    let totalSize = 0;

    const items = fs.readdirSync(folderPath, { withFileTypes: true });

    for (const item of items) {
      const itemPath = path.join(folderPath, item.name);

      if (item.isDirectory()) {
        totalSize += await getFolderSize(itemPath);
      } else {
        const stats = fs.statSync(itemPath);
        totalSize += stats.size;
      }
    }

    return totalSize;
  } catch (error) {
    console.error("Error calculating folder size:", error);
    return 0;
  }
}

// Helper function to remove directory recursively
async function removeDirectory(dirPath) {
  if (fs.existsSync(dirPath)) {
    const items = fs.readdirSync(dirPath);

    for (const item of items) {
      const itemPath = path.join(dirPath, item);
      const stats = fs.statSync(itemPath);

      if (stats.isDirectory()) {
        await removeDirectory(itemPath);
      } else {
        fs.unlinkSync(itemPath);
      }
    }

    fs.rmdirSync(dirPath);
  }
}

function setupRainmeterHandlers() {
  // Rainmeter detection
  ipcMain.on("check-rainmeter-installation", async (event) => {
    try {
      // Common Rainmeter installation paths
      const commonPaths = [
        path.join("C:", "Program Files", "Rainmeter", "Rainmeter.exe"),
        path.join(
          os.homedir(),
          "AppData",
          "Local",
          "Rainmeter",
          "Rainmeter.exe"
        ),
      ];

      // Check registry for Rainmeter installation (Windows only)
      if (process.platform === "win32") {
        exec(
          'reg query "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall" /s /f "Rainmeter"',
          (error, stdout) => {
            let installed = false;

            // Check if Rainmeter is found in registry
            if (!error && stdout.includes("Rainmeter")) {
              installed = true;
            } else {
              // Fallback: Check common installation paths
              for (const rainmeterPath of commonPaths) {
                if (fs.existsSync(rainmeterPath)) {
                  installed = true;
                  break;
                }
              }
            }

            // Send result back to renderer
            event.reply("rainmeter-check-result", { installed });
          }
        );
      } else {
        // Non-Windows platforms: assume not installed
        event.reply("rainmeter-check-result", { installed: false });
      }
    } catch (error) {
      console.error("Error checking Rainmeter installation:", error);
      event.reply("rainmeter-check-result", { installed: false });
    }
  });

  // Helper function to start Rainmeter after installation
  const startRainmeterAfterInstall = (event) => {
    try {
      // Common Rainmeter installation paths
      const commonPaths = [
        path.join("C:", "Program Files", "Rainmeter", "Rainmeter.exe"),
        path.join(
          os.homedir(),
          "AppData",
          "Local",
          "Rainmeter",
          "Rainmeter.exe"
        ),
      ];

      let rainmeterPath = null;

      // Find the Rainmeter executable
      for (const pathToCheck of commonPaths) {
        if (fs.existsSync(pathToCheck)) {
          rainmeterPath = pathToCheck;
          break;
        }
      }

      if (rainmeterPath) {
        console.log("Found Rainmeter at:", rainmeterPath);

        // Launch Rainmeter
        const rainmeterProcess = spawn(rainmeterPath, [], {
          detached: true,
          stdio: "ignore",
        });

        // Detach the process so it runs independently
        rainmeterProcess.unref();

        console.log("Rainmeter started successfully");
        event.reply("rainmeter-install-result", {
          success: true,
          rainmeterStarted: true,
        });
      } else {
        console.log("Rainmeter executable not found in common paths");
        // Still report success for installation, but note that auto-start failed
        event.reply("rainmeter-install-result", {
          success: true,
          rainmeterStarted: false,
          startupNote:
            "Installation completed but couldn't auto-start Rainmeter. Please start it manually.",
        });
      }
    } catch (error) {
      console.error("Error starting Rainmeter:", error);
      // Still report success for installation, but note that auto-start failed
      event.reply("rainmeter-install-result", {
        success: true,
        rainmeterStarted: false,
        startupNote: `Installation completed but failed to auto-start Rainmeter: ${error.message}`,
      });
    }
  };

  // Rainmeter installation
  ipcMain.on("install-rainmeter", (event) => {
    if (process.platform !== "win32") {
      event.reply("rainmeter-install-result", {
        success: false,
        error: "Rainmeter installation is only supported on Windows.",
      });
      return;
    }

    try {
      // Set initial progress
      event.reply("rainmeter-install-progress", { progress: 10 });

      // Execute winget command to install Rainmeter
      const wingetProcess = exec(
        "winget install -e --id Rainmeter.Rainmeter --accept-package-agreements --accept-source-agreements",
        (error, stdout, stderr) => {
          if (error) {
            console.error("Winget installation error:", error);
            event.reply("rainmeter-install-result", {
              success: false,
              error: `Installation failed: ${error.message}`,
            });
            return;
          }

          // Check if stdout contains success messages
          if (
            stdout.includes("Successfully installed") ||
            stdout.includes("was successfully installed")
          ) {
            event.reply("rainmeter-install-progress", { progress: 100 });

            // Attempt to start Rainmeter after successful installation
            // Add a small delay to ensure installation is fully complete
            setTimeout(() => {
              startRainmeterAfterInstall(event);
            }, 2000);
          } else if (stdout.includes("already installed")) {
            event.reply("rainmeter-install-progress", { progress: 100 });

            // Attempt to start Rainmeter since it's already installed
            // Add a small delay for consistency
            setTimeout(() => {
              startRainmeterAfterInstall(event);
            }, 1000);
          } else {
            event.reply("rainmeter-install-result", {
              success: false,
              error:
                "Installation process completed but couldn't verify success.",
            });
          }
        }
      );

      // Track progress
      let progress = 10;
      const progressInterval = setInterval(() => {
        progress += 5;
        if (progress < 90) {
          event.reply("rainmeter-install-progress", { progress });
        } else {
          clearInterval(progressInterval);
        }
      }, 1000);

      // Handle process close
      wingetProcess.on("close", (code) => {
        clearInterval(progressInterval);

        if (code !== 0) {
          event.reply("rainmeter-install-result", {
            success: false,
            error: `Process exited with code ${code}`,
          });
        }
      });
    } catch (error) {
      console.error("Error starting Rainmeter installation:", error);
      event.reply("rainmeter-install-result", {
        success: false,
        error: `Failed to start installation: ${error.message}`,
      });
    }
  });

  // Download Rainmeter skin (.rmskin file)
  ipcMain.handle(
    "download-rainmeter-skin",
    async (event, { url, filename, skinId }) => {
      try {
        const rainmeterSkinsPath = path.join(
          os.homedir(),
          "Documents",
          "Rainmeter",
          "Downloads"
        );

        // Create Rainmeter downloads folder if it doesn't exist
        if (!fs.existsSync(rainmeterSkinsPath)) {
          fs.mkdirSync(rainmeterSkinsPath, { recursive: true });

          // Set hidden attribute on Windows
          if (process.platform === "win32") {
            try {
              const { execSync } = require("child_process");
              execSync(`attrib +h "${rainmeterSkinsPath}"`);
              console.log("Set hidden attribute on Rainmeter Downloads folder");
            } catch (error) {
              console.error(
                "Failed to set hidden attribute on Rainmeter Downloads folder:",
                error
              );
            }
          }
        }

        const filePath = path.join(rainmeterSkinsPath, filename);

        // Check if file already exists
        if (fs.existsSync(filePath)) {
          console.log("Skin already downloaded:", filePath);
          return { success: true, path: filePath, alreadyExists: true, skinId };
        }

        return new Promise((resolve, reject) => {
          const file = fs.createWriteStream(filePath);

          console.log("Downloading Rainmeter skin from:", url);
          console.log("Saving to:", filePath);

          // Send download progress updates
          let totalSize = 0;
          let downloadedSize = 0;

          const downloadRequest = https.get(url, (response) => {
            if (response.statusCode !== 200) {
              reject({
                success: false,
                error: `HTTP ${response.statusCode}: ${response.statusMessage}`,
                skinId,
              });
              return;
            }

            totalSize = parseInt(response.headers["content-length"] || "0");

            response.on("data", (chunk) => {
              downloadedSize += chunk.length;
              if (totalSize > 0) {
                const progress = Math.round((downloadedSize / totalSize) * 100);
                event.sender.send("skin-download-progress", {
                  skinId,
                  progress,
                  downloadedSize,
                  totalSize,
                });
              }
            });

            response.pipe(file);

            file.on("finish", () => {
              file.close();
              console.log("Rainmeter skin download completed:", filePath);
              resolve({
                success: true,
                path: filePath,
                alreadyExists: false,
                skinId,
              });
            });

            file.on("error", (err) => {
              fs.unlink(filePath, () => {}); // Delete the file on error
              console.error("File write error:", err);
              reject({ success: false, error: err.message, skinId });
            });
          });

          downloadRequest.on("error", (err) => {
            console.error("Download error:", err);
            reject({ success: false, error: err.message, skinId });
          });
        });
      } catch (error) {
        console.error("Download skin function error:", error);
        return { success: false, error: error.message, skinId };
      }
    }
  );

  // Install Rainmeter skin (.rmskin file)
  ipcMain.handle(
    "install-rainmeter-skin",
    async (event, { skinPath, skinId, skinName }) => {
      try {
        if (process.platform !== "win32") {
          return {
            success: false,
            error: "Rainmeter skin installation is only supported on Windows.",
            skinId,
          };
        }

        // Find Rainmeter installation path first
        const rainmeterPaths = [
          path.join("C:", "Program Files", "Rainmeter"),
          path.join(os.homedir(), "AppData", "Local", "Rainmeter"),
        ];

        let rainmeterDir = null;
        for (const rainmeterPath of rainmeterPaths) {
          if (fs.existsSync(rainmeterPath)) {
            rainmeterDir = rainmeterPath;
            break;
          }
        }

        if (!rainmeterDir) {
          return {
            success: false,
            error:
              "Rainmeter installation not found. Please ensure Rainmeter is installed.",
            skinId,
          };
        }

        // Verify skin file exists
        if (!fs.existsSync(skinPath)) {
          return {
            success: false,
            error: "Skin file not found. Please download the skin first.",
            skinId,
          };
        }

        // Send initial progress
        event.sender.send("skin-install-progress", {
          skinId,
          progress: 10,
          message: "Starting installation...",
        });

        // Helper function for direct execution fallback
        const tryDirectExecution = () => {
          return new Promise((resolve) => {
            // Fallback: Execute .rmskin file directly (uses Windows file association)
            event.sender.send("skin-install-progress", {
              skinId,
              progress: 30,
              message: "Using Windows file association...",
            });

            // Use 'start' command to execute the .rmskin file with its associated program
            const installProcess = spawn(
              "cmd",
              ["/c", "start", "/wait", `"${skinPath}"`],
              {
                detached: false,
                stdio: "ignore",
              }
            );

            installProcess.on("close", (code) => {
              if (code === 0 || code === null) {
                // Installation completed
                event.sender.send("skin-install-progress", {
                  skinId,
                  progress: 90,
                  message: "Processing installation...",
                });

                setTimeout(() => {
                  event.sender.send("skin-install-progress", {
                    skinId,
                    progress: 100,
                    message: "Installation complete!",
                  });

                  resolve({
                    success: true,
                    path: path.join(
                      os.homedir(),
                      "Documents",
                      "Rainmeter",
                      "Skins"
                    ),
                    skinId,
                    message: `${skinName} installation process completed.`,
                  });
                }, 1000);
              } else {
                resolve({
                  success: false,
                  error: `Installation failed with exit code: ${code}`,
                  skinId,
                });
              }
            });

            installProcess.on("error", (error) => {
              console.error("Direct execution error:", error);
              resolve({
                success: false,
                error: `Installation failed: ${error.message}`,
                skinId,
              });
            });

            // Set a timeout to prevent hanging
            setTimeout(() => {
              try {
                installProcess.kill();
              } catch (err) {
                console.error("Error killing install process:", err);
              }
              resolve({
                success: false,
                error: "Installation timed out",
                skinId,
              });
            }, 60000); // 60 second timeout
          });
        };

        // First try using SkinInstaller.exe (recommended method)
        const skinInstallerPath = path.join(rainmeterDir, "SkinInstaller.exe");

        if (fs.existsSync(skinInstallerPath)) {
          // Use SkinInstaller.exe with silent installation
          const installCommand = `"${skinInstallerPath}" "${skinPath}" /S`;

          return new Promise((resolve) => {
            exec(
              installCommand,
              { timeout: 60000 },
              (error, stdout, stderr) => {
                if (error) {
                  console.error("SkinInstaller.exe error:", error);
                  // Fallback to direct execution
                  tryDirectExecution().then(resolve);
                  return;
                }

                // Send progress updates
                event.sender.send("skin-install-progress", {
                  skinId,
                  progress: 80,
                  message: "Installation complete",
                });

                setTimeout(() => {
                  event.sender.send("skin-install-progress", {
                    skinId,
                    progress: 100,
                    message: "Skin installed successfully!",
                  });

                  resolve({
                    success: true,
                    path: path.join(
                      os.homedir(),
                      "Documents",
                      "Rainmeter",
                      "Skins"
                    ),
                    skinId,
                    message: `${skinName} has been successfully installed.`,
                  });
                }, 500);
              }
            );
          });
        } else {
          // SkinInstaller.exe not found, try direct execution
          return tryDirectExecution();
        }
      } catch (error) {
        console.error("Install skin function error:", error);
        return { success: false, error: error.message, skinId };
      }
    }
  );

  // Get list of installed Rainmeter skins
  ipcMain.handle("get-installed-rainmeter-skins", async (event) => {
    try {
      if (process.platform !== "win32") {
        return {
          success: false,
          error: "Only supported on Windows.",
          skins: [],
        };
      }

      const skinsPath = path.join(
        os.homedir(),
        "Documents",
        "Rainmeter",
        "Skins"
      );

      if (!fs.existsSync(skinsPath)) {
        return { success: true, skins: [] };
      }

      const skins = [];
      const skinFolders = fs
        .readdirSync(skinsPath, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);

      for (const skinFolder of skinFolders) {
        const skinPath = path.join(skinsPath, skinFolder);
        const stats = fs.statSync(skinPath);

        // Look for .ini files to determine if it's a valid skin
        const iniFiles = fs
          .readdirSync(skinPath)
          .filter((file) => file.endsWith(".ini"))
          .filter((file) => file !== "desktop.ini");

        if (iniFiles.length > 0) {
          skins.push({
            skinId: skinFolder.toLowerCase().replace(/\s+/g, "-"),
            name: skinFolder,
            path: skinPath,
            installedAt: stats.birthtime.toISOString(),
            configFiles: iniFiles,
            size: await getFolderSize(skinPath),
          });
        }
      }

      return { success: true, skins };
    } catch (error) {
      console.error("Get installed skins error:", error);
      return { success: false, error: error.message, skins: [] };
    }
  });

  // Enable/Disable Rainmeter skin
  ipcMain.handle(
    "toggle-rainmeter-skin",
    async (event, { skinId, skinName, skinPath, isEnabled }) => {
      try {
        if (process.platform !== "win32") {
          return {
            success: false,
            error: "Rainmeter skin management is only supported on Windows.",
            skinId,
          };
        }

        // Find Rainmeter executable
        const rainmeterPaths = [
          path.join("C:", "Program Files", "Rainmeter", "Rainmeter.exe"),
          path.join(
            os.homedir(),
            "AppData",
            "Local",
            "Rainmeter",
            "Rainmeter.exe"
          ),
        ];

        let rainmeterExe = null;
        for (const rainmeterPath of rainmeterPaths) {
          if (fs.existsSync(rainmeterPath)) {
            rainmeterExe = rainmeterPath;
            break;
          }
        }

        if (!rainmeterExe) {
          return {
            success: false,
            error: "Rainmeter executable not found.",
            skinId,
          };
        }

        // Send progress update
        const action = isEnabled ? "Disabling" : "Enabling";
        event.sender.send("skin-toggle-progress", {
          skinId,
          message: `${action} ${skinName}...`,
        });

        // Use Rainmeter bangs to enable/disable skin
        const command = isEnabled
          ? `"${rainmeterExe}" !DeactivateConfig "${skinName}"`
          : `"${rainmeterExe}" !ActivateConfig "${skinName}"`;

        return new Promise((resolve, reject) => {
          exec(command, { timeout: 10000 }, (error, stdout, stderr) => {
            if (error) {
              console.error("Skin toggle error:", error);
              resolve({
                success: false,
                error: `Failed to ${isEnabled ? "disable" : "enable"} skin: ${
                  error.message
                }`,
                skinId,
              });
              return;
            }

            resolve({
              success: true,
              isEnabled: !isEnabled,
              skinId,
              message: `${skinName} has been ${
                isEnabled ? "disabled" : "enabled"
              }.`,
            });
          });
        });
      } catch (error) {
        console.error("Toggle skin function error:", error);
        return { success: false, error: error.message, skinId };
      }
    }
  );

  // Open Rainmeter skin configuration
  ipcMain.handle(
    "configure-rainmeter-skin",
    async (event, { skinId, skinName, skinPath }) => {
      try {
        if (process.platform !== "win32") {
          return {
            success: false,
            error: "Rainmeter configuration is only supported on Windows.",
            skinId,
          };
        }

        // Find Rainmeter executable
        const rainmeterPaths = [
          path.join("C:", "Program Files", "Rainmeter", "Rainmeter.exe"),
          path.join(
            os.homedir(),
            "AppData",
            "Local",
            "Rainmeter",
            "Rainmeter.exe"
          ),
        ];

        let rainmeterExe = null;
        for (const rainmeterPath of rainmeterPaths) {
          if (fs.existsSync(rainmeterPath)) {
            rainmeterExe = rainmeterPath;
            break;
          }
        }

        if (!rainmeterExe) {
          return {
            success: false,
            error: "Rainmeter executable not found.",
            skinId,
          };
        }

        // Open Rainmeter manage dialog for the specific skin
        const command = `"${rainmeterExe}" !Manage Skins "${skinName}"`;

        return new Promise((resolve, reject) => {
          exec(command, { timeout: 10000 }, (error, stdout, stderr) => {
            if (error) {
              console.error("Configure skin error:", error);
              resolve({
                success: false,
                error: `Failed to open configuration: ${error.message}`,
                skinId,
              });
              return;
            }

            resolve({
              success: true,
              skinId,
              message: `Configuration opened for ${skinName}.`,
            });
          });
        });
      } catch (error) {
        console.error("Configure skin function error:", error);
        return { success: false, error: error.message, skinId };
      }
    }
  );

  // Open Rainmeter main configuration
  ipcMain.handle("open-rainmeter-config", async (event) => {
    try {
      if (process.platform !== "win32") {
        return {
          success: false,
          error: "Rainmeter configuration is only supported on Windows.",
        };
      }

      // Find Rainmeter executable
      const rainmeterPaths = [
        path.join("C:", "Program Files", "Rainmeter", "Rainmeter.exe"),
        path.join(
          os.homedir(),
          "AppData",
          "Local",
          "Rainmeter",
          "Rainmeter.exe"
        ),
      ];

      let rainmeterExe = null;
      for (const rainmeterPath of rainmeterPaths) {
        if (fs.existsSync(rainmeterPath)) {
          rainmeterExe = rainmeterPath;
          break;
        }
      }

      if (!rainmeterExe) {
        return {
          success: false,
          error:
            "Rainmeter executable not found. Please ensure Rainmeter is installed.",
        };
      }

      // Open Rainmeter main manage dialog
      const command = `"${rainmeterExe}" !Manage`;

      return new Promise((resolve, reject) => {
        exec(command, { timeout: 10000 }, (error, stdout, stderr) => {
          if (error) {
            console.error("Open Rainmeter config error:", error);
            resolve({
              success: false,
              error: `Failed to open Rainmeter configuration: ${error.message}`,
            });
            return;
          }

          resolve({
            success: true,
            message: "Rainmeter configuration window opened successfully.",
          });
        });
      });
    } catch (error) {
      console.error("Open Rainmeter config function error:", error);
      return { success: false, error: error.message };
    }
  });

  // Uninstall Rainmeter skin
  ipcMain.handle(
    "uninstall-rainmeter-skin",
    async (event, { skinId, skinName, skinPath }) => {
      try {
        console.log(
          `Attempting to uninstall skin: ID=${skinId}, Name=${skinName}, Path=${skinPath}`
        );

        if (process.platform !== "win32") {
          return {
            success: false,
            error:
              "Rainmeter skin uninstallation is only supported on Windows.",
            skinId,
          };
        }

        // If skinPath is not provided or doesn't exist, try to find the skin
        let actualSkinPath = skinPath;
        const skinsBasePath = path.join(
          os.homedir(),
          "Documents",
          "Rainmeter",
          "Skins"
        );

        if (!actualSkinPath || !fs.existsSync(actualSkinPath)) {
          console.log("Skin path not found, searching for skin...");

          // Try to find the skin by name or a close match
          if (fs.existsSync(skinsBasePath)) {
            const skinFolders = fs
              .readdirSync(skinsBasePath, { withFileTypes: true })
              .filter((dirent) => dirent.isDirectory())
              .map((dirent) => dirent.name);

            // Look for exact match first
            let foundFolder = skinFolders.find(
              (folder) => folder.toLowerCase() === skinName.toLowerCase()
            );

            // If no exact match, try partial matches
            if (!foundFolder) {
              foundFolder = skinFolders.find(
                (folder) =>
                  folder.toLowerCase().includes(skinName.toLowerCase()) ||
                  skinName.toLowerCase().includes(folder.toLowerCase())
              );
            }

            // Try matching by generated ID
            if (!foundFolder) {
              const expectedId = skinName.toLowerCase().replace(/\s+/g, "-");
              foundFolder = skinFolders.find(
                (folder) =>
                  folder.toLowerCase().replace(/\s+/g, "-") === expectedId ||
                  folder.toLowerCase().replace(/\s+/g, "-") === skinId
              );
            }

            if (foundFolder) {
              actualSkinPath = path.join(skinsBasePath, foundFolder);
              console.log(`Found skin at: ${actualSkinPath}`);
            }
          }
        }

        if (!actualSkinPath || !fs.existsSync(actualSkinPath)) {
          return {
            success: false,
            error: `Cannot find skin files for "${skinName}". The skin may not be installed or may have been moved.`,
            skinId,
          };
        }

        // Send progress update
        if (event && event.sender) {
          event.sender.send("skin-uninstall-progress", {
            skinId,
            progress: 20,
            message: `Preparing to uninstall ${skinName}...`,
          });
        }

        // First, disable the skin if it's active
        const rainmeterPaths = [
          path.join("C:", "Program Files", "Rainmeter", "Rainmeter.exe"),
          path.join(
            os.homedir(),
            "AppData",
            "Local",
            "Rainmeter",
            "Rainmeter.exe"
          ),
        ];

        let rainmeterExe = null;
        for (const rainmeterPath of rainmeterPaths) {
          if (fs.existsSync(rainmeterPath)) {
            rainmeterExe = rainmeterPath;
            break;
          }
        }

        if (rainmeterExe) {
          console.log(`Deactivating skin using: ${rainmeterExe}`);
          // Deactivate the skin first - try both the folder name and skin name
          const folderName = path.basename(actualSkinPath);

          await new Promise((resolve) => {
            exec(`"${rainmeterExe}" !DeactivateConfig "${folderName}"`, () => {
              // Also try with original skin name if different
              if (folderName !== skinName) {
                exec(
                  `"${rainmeterExe}" !DeactivateConfig "${skinName}"`,
                  () => {
                    resolve();
                  }
                );
              } else {
                resolve();
              }
            });
          });
        }

        if (event && event.sender) {
          event.sender.send("skin-uninstall-progress", {
            skinId,
            progress: 50,
            message: `Removing skin files...`,
          });
        }

        // Remove the skin folder
        console.log(`Removing directory: ${actualSkinPath}`);
        await removeDirectory(actualSkinPath);

        if (event && event.sender) {
          event.sender.send("skin-uninstall-progress", {
            skinId,
            progress: 100,
            message: `Uninstallation complete!`,
          });
        }

        console.log(`Successfully uninstalled skin: ${skinName}`);
        return {
          success: true,
          skinId,
          message: `${skinName} has been successfully uninstalled.`,
        };
      } catch (error) {
        console.error("Uninstall skin function error:", error);
        return {
          success: false,
          error: `Failed to uninstall skin: ${error.message}`,
          skinId,
        };
      }
    }
  );
}

module.exports = { setupRainmeterHandlers };
