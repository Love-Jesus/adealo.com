# Comprehensive PC Setup Guide for Adealo

This detailed guide will walk you through setting up the Adealo development environment on your Windows PC, from installing prerequisites to running the application and troubleshooting common issues.

## Table of Contents

1. [Prerequisites Installation](#prerequisites-installation)
2. [Git Setup and Authentication](#git-setup-and-authentication)
3. [Visual Studio Code Configuration](#visual-studio-code-configuration)
4. [Cloning the Repository](#cloning-the-repository)
5. [Installing Project Dependencies](#installing-project-dependencies)
6. [Environment Variables Setup](#environment-variables-setup)
7. [Firebase Configuration](#firebase-configuration)
8. [Running the Application](#running-the-application)
9. [Deployment](#deployment)
10. [Cross-Platform Development Workflow](#cross-platform-development-workflow)
11. [Common Issues and Solutions](#common-issues-and-solutions)
12. [Setup Verification Checklist](#setup-verification-checklist)

## Prerequisites Installation

### 1. Git for Windows

1. Download Git for Windows from [git-scm.com/download/win](https://git-scm.com/download/win)
2. Run the installer and use these recommended settings:
   - Select components: Default options are fine
   - Default editor: Choose your preferred editor (VS Code recommended)
   - PATH environment: Select "Git from the command line and also from 3rd-party software"
   - HTTPS transport backend: Use the OpenSSL library
   - Line ending conversions: "Checkout Windows-style, commit Unix-style line endings"
   - Terminal emulator: Use Windows' default console window
   - Default behavior of `git pull`: "Default (fast-forward or merge)"
   - Credential helper: Git Credential Manager
   - Extra options: Enable file system caching
   - Experimental options: None needed

### 2. Node.js v18

1. Download Node.js v18 LTS from [nodejs.org](https://nodejs.org/)
2. Run the installer with default options
3. Verify installation by opening Command Prompt and running:
   ```
   node --version
   npm --version
   ```
   You should see v18.x.x and 9.x.x or similar

### 3. Visual Studio Code

1. Download VS Code from [code.visualstudio.com](https://code.visualstudio.com/)
2. Run the installer with default options
3. Launch VS Code after installation

### 4. Firebase CLI

1. Open Command Prompt as Administrator
2. Install Firebase CLI globally:
   ```
   npm install -g firebase-tools
   ```
3. Verify installation:
   ```
   firebase --version
   ```
   You should see a version number like 12.x.x

## Git Setup and Authentication

### Setting Up SSH Authentication (Recommended)

1. **Generate an SSH key**:
   - Open Git Bash (installed with Git for Windows)
   - Run:
     ```
     ssh-keygen -t ed25519 -C "your_email@example.com"
     ```
   - Press Enter to accept the default file location
   - Enter a secure passphrase (or leave empty if you prefer)

2. **Start the SSH agent**:
   ```
   eval "$(ssh-agent -s)"
   ssh-add ~/.ssh/id_ed25519
   ```

3. **Add the SSH key to your GitHub account**:
   - Copy your public key to clipboard:
     ```
     clip < ~/.ssh/id_ed25519.pub
     ```
   - Go to GitHub → Settings → SSH and GPG keys → New SSH key
   - Give it a title (e.g., "Windows PC")
   - Paste your key and click "Add SSH key"

4. **Test your SSH connection**:
   ```
   ssh -T git@github.com
   ```
   You should see: "Hi username! You've successfully authenticated..."

### Alternative: Personal Access Token (PAT)

If you prefer using HTTPS instead of SSH:

1. **Create a Personal Access Token on GitHub**:
   - Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Click "Generate new token" → "Generate new token (classic)"
   - Give it a name, set expiration, and select `repo` scope
   - Click "Generate token" and copy the token immediately

2. **Configure Git to store credentials**:
   ```
   git config --global credential.helper store
   ```

3. **When you first clone or push**, you'll be prompted for your username and password:
   - Username: your GitHub username
   - Password: use your Personal Access Token, not your GitHub password

## Visual Studio Code Configuration

### Recommended Extensions

Install these extensions to enhance your development experience:

1. **ESLint**: JavaScript linting
   - Search "ESLint" in the Extensions tab and install

2. **Prettier**: Code formatting
   - Search "Prettier" in the Extensions tab and install

3. **Firebase**: Firebase integration
   - Search "Firebase" in the Extensions tab and install

4. **GitLens**: Enhanced Git capabilities
   - Search "GitLens" in the Extensions tab and install

5. **TypeScript**: TypeScript language support
   - Search "TypeScript" in the Extensions tab and install

### Workspace Settings

Create a `.vscode/settings.json` file in your project with these recommended settings:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "files.eol": "\n"
}
```

## Cloning the Repository

1. **Create a directory** for your projects (if you don't have one already):
   ```
   mkdir C:\Projects
   cd C:\Projects
   ```

2. **Clone the repository**:
   - Using SSH (if you set up SSH keys):
     ```
     git clone git@github.com:Love-Jesus/adealo.com.git
     ```
   - Using HTTPS (if you're using a PAT):
     ```
     git clone https://github.com/Love-Jesus/adealo.com.git
     ```

3. **Navigate to the project directory**:
   ```
   cd adealo.com
   ```

## Installing Project Dependencies

1. **Install root-level dependencies**:
   ```
   npm install
   ```

2. **Install prospecting-tool dependencies**:
   ```
   cd prospecting-tool
   npm install
   ```

3. **Install Firebase Functions dependencies**:
   ```
   cd functions
   npm install
   cd ../..
   ```

## Environment Variables Setup

### Frontend Environment Variables

1. **Create a `.env` file** in the `prospecting-tool` directory:
   ```
   cd prospecting-tool
   copy .env.example .env
   ```

2. **Edit the `.env` file** with your actual values:
   ```
   VITE_IPINFO_ACCESS_TOKEN=your_ipinfo_token
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

### Firebase Functions Environment Variables

1. **Create a `.env` file** in the `prospecting-tool/functions` directory:
   ```
   cd functions
   copy .env.example .env
   ```

2. **Set Firebase config variables**:
   ```
   firebase functions:config:set ipinfo.access_token="your_ipinfo_token" sendgrid.api_key="your_sendgrid_api_key" stripe.secret_key="your_stripe_secret_key" stripe.webhook_secret="your_stripe_webhook_secret"
   ```

## Firebase Configuration

1. **Log in to Firebase**:
   ```
   firebase login
   ```
   This will open a browser window for authentication.

2. **Select your Firebase project**:
   ```
   firebase use YOUR_PROJECT_ID
   ```
   Replace `YOUR_PROJECT_ID` with your actual Firebase project ID.

3. **Initialize Firebase locally** (if not already initialized):
   ```
   firebase init
   ```
   Select the features you need (Firestore, Functions, Hosting, etc.)

## Running the Application

### Development Server

1. **Start the development server**:
   ```
   cd prospecting-tool
   npm run dev
   ```
   This will start the Vite development server, typically at http://localhost:3000

2. **Access the application** by opening your browser and navigating to:
   ```
   http://localhost:3000
   ```

### Firebase Emulators

For testing Firebase functionality locally:

1. **Start Firebase emulators**:
   ```
   firebase emulators:start
   ```

2. **Access the Emulator UI** at:
   ```
   http://localhost:4000
   ```

## Deployment

### Deploying to Firebase Hosting

1. **Build the project**:
   ```
   cd prospecting-tool
   npm run build
   ```

2. **Deploy to Firebase**:
   ```
   firebase deploy
   ```
   Or to deploy only specific components:
   ```
   firebase deploy --only hosting
   firebase deploy --only functions
   firebase deploy --only firestore:rules
   ```

## Cross-Platform Development Workflow

When working across multiple machines (Windows PC and macOS):

1. **Before switching machines**:
   - Commit and push all changes:
     ```
     git add .
     git commit -m "Your descriptive commit message"
     git push
     ```

2. **When starting work on the other machine**:
   - Pull the latest changes:
     ```
     git pull
     ```
   - Install any new dependencies:
     ```
     npm install
     cd prospecting-tool
     npm install
     cd functions
     npm install
     cd ../..
     ```

3. **Keep environment variables in sync**:
   - Ensure your `.env` files are updated on both machines
   - Consider using a secure method to share environment variables between machines

## Common Issues and Solutions

### Git Authentication Issues

**Issue**: "Authentication failed" when pushing to GitHub

**Solutions**:
- Verify your SSH key is added to your GitHub account
- If using HTTPS, ensure you're using a Personal Access Token, not your password
- Check that your token has the correct permissions
- Try regenerating your PAT if it's expired

### Node.js Version Issues

**Issue**: "This module requires Node.js version X or later"

**Solutions**:
- Install Node Version Manager (nvm) for Windows:
  - Download the nvm-windows installer from [github.com/coreybutler/nvm-windows/releases](https://github.com/coreybutler/nvm-windows/releases)
  - Install with default options
  - Open a new Command Prompt and run:
    ```
    nvm install 18
    nvm use 18
    ```
- Verify the correct version is active:
  ```
  node --version
  ```

### Firebase CLI Issues

**Issue**: "Error: Failed to get Firebase project" or authentication errors

**Solutions**:
- Ensure you're logged in with the correct account:
  ```
  firebase logout
  firebase login
  ```
- Verify you have access to the Firebase project
- Try reinstalling the Firebase CLI:
  ```
  npm uninstall -g firebase-tools
  npm install -g firebase-tools
  ```

### Dependency Installation Issues

**Issue**: "npm ERR! code ENOENT" or other installation errors

**Solutions**:
- Clear npm cache:
  ```
  npm cache clean --force
  ```
- Delete node_modules folder and reinstall:
  ```
  rd /s /q node_modules
  npm install
  ```
- Check for Node.js version compatibility
- Ensure you have proper network access (no proxy issues)

### Firebase Emulator Issues

**Issue**: "Error: Could not start Firestore emulator"

**Solutions**:
- Ensure Java is installed (required for Firebase emulators):
  - Download and install from [java.com](https://www.java.com/download/)
- Check if the port is already in use:
  - Run `netstat -ano | findstr 8080` (replace 8080 with the port number)
  - Kill the process using that port if needed

## Setup Verification Checklist

Use this checklist to verify your setup is complete and working correctly:

- [ ] Git is installed and configured
- [ ] Node.js v18 is installed and active
- [ ] Visual Studio Code is installed with recommended extensions
- [ ] Repository is cloned successfully
- [ ] All dependencies are installed without errors
- [ ] Environment variables are set up correctly
- [ ] Firebase CLI is installed and logged in
- [ ] Development server starts without errors
- [ ] Application loads in browser correctly
- [ ] Firebase emulators run successfully (if needed)
- [ ] Git push/pull works without authentication errors
- [ ] You can make changes and see them reflected in the application

## Additional Resources

- [Git Documentation](https://git-scm.com/doc)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Vite Documentation](https://vitejs.dev/guide/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Visual Studio Code Documentation](https://code.visualstudio.com/docs)

## Conclusion

You should now have a fully functional development environment for the Adealo project on your Windows PC. If you encounter any issues not covered in this guide, refer to the project's GitHub repository issues or contact the development team.

Remember to always pull the latest changes before starting work and push your changes when you're done to maintain synchronization between your development machines.
