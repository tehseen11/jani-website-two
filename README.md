# Janitha — DevOps Engineer Portfolio

A premium, futuristic, 3D-animated DevOps portfolio built with React, TypeScript,
Vite, Tailwind CSS, Framer Motion, GSAP-ready, React Three Fiber, and Lenis smooth
scroll. Styled as a dark cloud-infrastructure control center, inspired by
Stripe / Linear / Vercel / Datadog visual language — without copying any of them.

## ✨ Sections

1. **Hero** — full-viewport 3D cloud core with orbiting tech nodes (AWS, Docker,
   Kubernetes, Terraform, Jenkins, GitHub Actions, Prometheus, Grafana). The scene
   rotates toward the cursor.
2. **Tech Marquee** — infinite glassmorphism scroller of the full stack.
3. **About** — mission statement + scroll-triggered animated counters + floating
   decorative icons.
4. **Skills & Certifications** — categorized skill cards with 3D tilt on hover,
   plus certification cards.
5. **Experience** — animated vertical timeline (Support Engineer → Junior DevOps
   Engineer → DevOps Engineer).
6. **Featured Projects** — sticky stacking project cards with tech tags, live
   demo & GitHub links.
7. **DevOps Dashboard** — Datadog-style live metrics with animated sparklines
   (Infrastructure Health, Container Status, Deployment Success Rate, Cluster
   Nodes, CPU/Memory Usage).
8. **Contact** — particle background, contact methods grid, magnetic CTA.

## 🧱 Folder Structure

```
janitha-devops-portfolio/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── tsconfig.node.json
├── public/
│   ├── robots.txt
│   └── resume.pdf          ← add your real resume here
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── types/
    │   └── index.ts
    ├── data/
    │   └── content.ts       ← all copy/content lives here
    ├── hooks/
    │   ├── useLenis.ts
    │   ├── useMousePosition.ts
    │   └── useCounter.ts
    └── components/
        ├── layout/
        │   ├── Navbar.tsx
        │   ├── Loader.tsx
        │   ├── ScrollProgress.tsx
        │   └── CursorGlow.tsx
        ├── three/
        │   ├── CloudScene.tsx
        │   └── OrbitingIcon.tsx
        ├── ui/
        │   ├── MagneticButton.tsx
        │   └── GlassCard.tsx
        └── sections/
            ├── Hero.tsx
            ├── TechMarquee.tsx
            ├── About.tsx
            ├── Skills.tsx
            ├── Experience.tsx
            ├── Projects.tsx
            ├── Dashboard.tsx
            └── Contact.tsx
```

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173.

### Build for production

```bash
npm run build
npm run preview
```

## ✏️ Editing content

Almost everything you'd want to change — tech lists, skills, certifications,
experience, projects, dashboard metrics — lives in **`src/data/content.ts`**.
Update names, years, descriptions, and links there; the UI re-renders
automatically.

Update your real email/social links in `src/components/sections/Contact.tsx`
and `src/components/sections/Hero.tsx` (resume link).

Drop your real `resume.pdf` into `public/` (it will be served at `/resume.pdf`).

## 🎨 Design tokens

| Token       | Value     |
|-------------|-----------|
| Background  | `#0C0C0C` |
| Primary     | `#00D4FF` |
| Secondary   | `#7C3AED` |
| Success     | `#10B981` |
| Text        | `#D7E2EA` |
| Font        | Kanit (300–900) |

All defined in `tailwind.config.js` as `bg`, `primary`, `secondary`, `success`,
`text`.

## ⚙️ Performance notes

- Heavy sections (`About`, `Skills`, `Experience`, `Projects`, `Dashboard`,
  `Contact`) and the Three.js scene are **lazy-loaded** with `React.lazy` +
  `Suspense`, so the initial bundle stays small.
- `vite-plugin-compression2` gzips build output automatically.
- Manual chunk splitting separates `three`/`@react-three` and
  `framer-motion`/`gsap` into their own vendor chunks (`vite.config.ts`).
- `prefers-reduced-motion` is respected globally (Lenis smooth scroll disables
  itself, CSS animations collapse to near-instant).
- Images/screenshots you add for projects should be served as WebP and lazy
  loaded (`loading="lazy"`) to keep Lighthouse scores high.

## 🧩 Tech stack

- **React 18 + TypeScript + Vite** — app shell & build tooling
- **Tailwind CSS** — utility styling with custom design tokens
- **Framer Motion** — scroll reveals, hover/tap micro-interactions, magnetic buttons
- **React Three Fiber + drei** — the 3D cloud infrastructure hero scene
- **Lenis** — smooth inertia scrolling
- **Lucide React** — icon set throughout

> Note: brand logos (AWS, Docker, Kubernetes, etc.) are rendered as styled text
> labels rather than trademarked logo artwork, since Lucide does not ship brand
> marks and using real logos would require separate licensing/SVG assets. Drop
> your own licensed SVG logos into `src/components/three/OrbitingIcon.tsx` and
> the marquee/skill cards if you'd like real brand icons.

## 📦 Deployment

### Vercel
```bash
npm install -g vercel
vercel
```
Framework preset: **Vite**. Build command `npm run build`, output dir `dist`.

### Netlify
```bash
npm run build
```
Drag the `dist/` folder into Netlify, or connect the repo with:
- Build command: `npm run build`
- Publish directory: `dist`

### GitHub Pages
1. `npm install -D gh-pages`
2. Add to `package.json` scripts: `"deploy": "gh-pages -d dist"`
3. Set `base: '/your-repo-name/'` in `vite.config.ts`
4. `npm run build && npm run deploy`

### Any static host (S3, Cloudflare Pages, Firebase Hosting)
Just upload the contents of `dist/` after running `npm run build`.

## ✅ Lighthouse / SEO checklist

- Meta description + Open Graph tags set in `index.html`
- `robots.txt` included in `public/`
- Add a `sitemap.xml` once you have a live domain
- Run `npm run build && npm run preview`, then audit with Chrome DevTools
  Lighthouse before going live
