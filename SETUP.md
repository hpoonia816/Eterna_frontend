# Setup Instructions

## Prerequisites

You need to install Node.js (version 18 or higher) to run this project.

### Install Node.js

1. **Download Node.js:**
   - Visit: https://nodejs.org/
   - Download the LTS (Long Term Support) version
   - Choose the Windows Installer (.msi) for your system (64-bit recommended)

2. **Install Node.js:**
   - Run the installer
   - Follow the installation wizard
   - Make sure to check "Add to PATH" option
   - Complete the installation

3. **Verify Installation:**
   - Open a new PowerShell/Command Prompt window
   - Run: `node --version` (should show v18.x.x or higher)
   - Run: `npm --version` (should show version number)

## Running the Project

Once Node.js is installed, follow these steps:

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Start Development Server:**
   ```bash
   npm run dev
   ```

3. **Open in Browser:**
   - The app will be available at: http://localhost:3000
   - Open this URL in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Troubleshooting

If you encounter issues:

1. **Node.js not found:**
   - Restart your terminal after installing Node.js
   - Verify Node.js is in your PATH: `where node`

2. **Port 3000 already in use:**
   - Kill the process using port 3000
   - Or change the port in `package.json`

3. **Dependencies installation fails:**
   - Delete `node_modules` folder and `package-lock.json`
   - Run `npm install` again
   - Try `npm cache clean --force` if issues persist


