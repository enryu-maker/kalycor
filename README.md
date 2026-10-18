# Kalycor Group

> Building a Future of Possibilities — Creating opportunities that move people, places, and markets forward.

A modern, high-performance landing page for **Kalycor Group**, showcasing diverse business verticals across Staffing, Real Estate, Agriculture, Global Trade, and Security.

---

## 🌟 Key Features

- **Interactive Services Showcase**: Synchronized scroll and dynamic video reel previews for each core business vertical.
- **Custom Visual Experience**: Fluid custom cursor, smooth scroll progress indicator, and responsive drawer navigation.
- **Responsive & Adaptive**: Handcrafted layouts optimized across mobile (320px+), tablet, desktop, and ultra-wide displays.
- **Interactive Enquiry Form**: Clean contact section with real-time feedback and state handling.
- **Typography & Aesthetics**: Curated typography pairing (`Instrument Serif`, `Manrope`, and `DM Sans`) with dark-mode aesthetic.
- **Production Ready**: Fully static prerendering with Next.js Turbopack, TypeScript strict mode, and semantic HTML5.

---

## 🏗️ Core Verticals

1. **Staffing**: Connecting organizations with high-caliber talent to drive business growth.
2. **Real Estate**: Developing and shaping sustainable spaces for long-term value.
3. **Agriculture**: Modern, sustainable pathways from cultivation to global markets.
4. **Import / Export**: Dependable cross-border trade connecting products and markets.
5. **Security**: Comprehensive enterprise and personnel protection solutions.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Fonts**: Google Fonts (`Manrope`, `DM Sans`, `Instrument Serif`)

---

## 📁 Project Structure

```text
kalycor/
├── public/                  # Static assets (videos, brand graphics, images)
│   ├── images/
│   └── videos/
├── src/
│   ├── app/
│   │   ├── globals.css      # Core theme, variables & custom styles
│   │   ├── layout.tsx       # Root layout, fonts & SEO metadata
│   │   ├── loading.tsx      # Loading state indicator
│   │   ├── not-found.tsx    # Branded 404 error page
│   │   └── page.tsx         # Main landing page entry
│   └── components/
│       ├── interactive/     # Navbar, cursor, showcase, enquiry form
│       └── sections/        # Hero, Who We Are, Services, Footer
├── next.config.ts           # Next.js configuration
├── package.json             # Dependencies and project scripts
└── tsconfig.json            # TypeScript configuration
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js 18.18+** or higher installed on your machine.

### 1. Clone the repository

```bash
git clone https://github.com/your-username/kalycor.git
cd kalycor
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📦 Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Next.js local development server with Turbopack. |
| `npm run build` | Compiles the production application and prerenders static pages. |
| `npm run start` | Runs the compiled production build locally. |
| `npm run lint` | Runs ESLint to check for code quality and type inconsistencies. |

---

## 🚢 Deployment

The project can be deployed seamlessly to platforms supporting Next.js, such as [Vercel](https://vercel.com):

1. Push your repository to GitHub / GitLab.
2. Import the project in Vercel.
3. Deploy — build configurations and routing are automatically detected.

---

## 📄 License

This project is proprietary and confidential. All rights reserved by **Kalycor Group**.
