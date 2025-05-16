# Block Tech Doc

Status: Next Up
Date Created: May 16, 2025 8:12 PM

This is an easy-to-use app for searching Ethereum accounts and transaction hashes.

The app is built with Next.js and TypeScript, integrating the Etherscan API.

Try the live demo at [https://block-tech-exam.vercel.app/](https://block-tech-exam.vercel.app/)

### env

Your will add .env to root folder like this

```jsx
NEXT_PUBLIC_ETHERSCAN_API_KEY=Your api key
```

### Core Framework:

- Next.js 15.3.2 (React Framework)
- TypeScript as the development language
- React 19 as the frontend framework

### **UI Framework & Styling**:

- Material-UI (@mui/material) for UI components
- Tailwind CSS for style management
- Emotion for CSS-in-JS styling solution

### **Key Dependencies**:

- axios (^1.9.0) - HTTP client for API requests
- ethers (^6.14.1) - Ethereum development library
- @mui/material (^7.1.0) - Material UI components
- @emotion/react & @emotion/styled (^11.14.0) - CSS-in-JS solution

### **Development Tools**:

- Turbopack for development server (as seen in the dev script)
- ESLint for code linting
- PostCSS for CSS processing
- TypeScript for type safety

### **Project Structure**:

```bash
   /
   ├── src/
   │   ├── app/         # Next.js app router and pages
   │   ├── components/  # React components
   │   └── lib/         # Utility functions and shared libraries
   ├── public/          # Static assets
   ├── .next/          # Next.js build output
   └── node_modules/    # Dependencies
```