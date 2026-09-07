# Personal Portfolio

A modern, high-performance **Frontend-Based Portfolio Website** built with **React 19**, **Vite**, **Framer Motion**, and **Tailwind CSS v4**.

This application presents an interactive, standalone single-page portfolio with persistent dark/light theme switching, animated interactive sections, smooth scrolling, skill categorization, project highlights, and an interactive contact form—with zero external backend server dependencies required.

---

## Key Features

- **Standalone Frontend Architecture**: Self-contained data management with local portfolio modules (`src/data/portfolioData.js`). No external backend API dependencies required.
- **Hero & Dynamic Typing Effect**: Interactive introduction with typing effect and smooth scale scroll animations.
- **3D Backdrop Effects**: Vanta.js interactive 3D ring visual background.
- **Dark & Light Theme Toggle**: Persistent theme switching saved across browser sessions in `localStorage`.
- **Interactive Skill Filter**: Categorized skill view (Frontend, Backend, Languages, Tools, Design) with animated confidence progress indicators.
- **Featured Work Section**: Expandable project card showcase with tech tags and direct GitHub links.
- **Interactive Contact Form**: Client-side validated form with real-time feedback notifications.
- **Fully Responsive Navigation**: Glassmorphic top navigation shell with an interactive mobile menu drawer.
- **Smooth Motion & Micro-Interactions**: Section scroll animations powered by Framer Motion.

---

## Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4 + Custom Utility Classes
- **Animations**: Framer Motion & Vanta.js (Three.js)
- **Icons**: React Icons (`react-icons`)
- **Linting**: ESLint v10

---

## Prerequisites

- **Node.js**: 18+ recommended
- **npm**: 9+ recommended

---

## Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/SarrafTanish/Personal_Portfolio.git
   cd Personal_Portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. Open your browser at `http://localhost:5173` (or the URL shown in your terminal).

---

## Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Launches the local Vite development server with HMR. |
| `npm run build` | Compiles and optimizes production assets into the `dist/` directory. |
| `npm run preview` | Serves the production build output locally for testing. |
| `npm run lint` | Runs ESLint across all JavaScript/JSX source files. |

---

## Project Structure

```text
Personal_Portfolio/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── data/
│   │   └── portfolioData.js     # Static portfolio data (profile, skills, projects, experience)
│   ├── App.jsx                  # Main single-page application component
│   ├── index.css                # Global CSS styles & Tailwind v4 imports
│   └── main.jsx                 # Vite React root mount point
├── eslint.config.js             # ESLint configuration
├── index.html                   # HTML entry point with SEO metadata
├── package.json                 # Project dependencies and npm scripts
├── vite.config.js               # Vite build tool configuration
└── README.md                    # Project documentation
```

---

## Deployment

Since this is a 100% client-side web application, you can deploy the generated build directly to any static web hosting provider (e.g. Vercel, Netlify, GitHub Pages, Cloudflare Pages).

1. Build the production application:
   ```bash
   npm run build
   ```
2. Deploy the generated `dist/` directory to your static host.

---

## License

Created by **Tanish Kumar Sarraf**. All rights reserved.
