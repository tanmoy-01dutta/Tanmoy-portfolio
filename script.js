/* ==========================================================================
   TANMOY DUTTA — PORTFOLIO STYLES
   Structure:
   1. Design tokens (CSS variables) — dark theme default + light theme override
   2. Reset & base
   3. Utility classes
   4. Navbar
   5. Hero
   6. Section shell (shared by About / Skills / Projects / Contact)
   7. About
   8. Skills
   9. Projects
   10. Contact
   11. Footer
   12. Scroll-to-top button
   13. Fade-in scroll animation
   14. Responsive breakpoints
   ========================================================================== */

/* ---------- 1. DESIGN TOKENS ---------- */
:root {
  /* Fonts */
  --font-display: "Space Grotesk", sans-serif;
  --font-body: "Inter", sans-serif;
  --font-mono: "JetBrains Mono", monospace;

  /* Dark theme (default) */
  --bg: #10121a;
  --surface: #181b27;
  --surface-alt: #1e2230;
  --text: #edeef5;
  --text-muted: #8d92a8;
  --accent: #4fe3c6;       /* mint teal — primary signature color */
  --accent-soft: rgba(79, 227, 198, 0.12);
  --accent-2: #f2b84b;     /* warm amber — used sparingly for highlights */
  --border: rgba(255, 255, 255, 0.08);
  --shadow: rgba(0, 0, 0, 0.35);

  /* Layout */
  --container-width: 1120px;
  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 22px;
  --nav-height: 72px;

  /* Motion */
  --transition-fast: 0.2s ease;
  --transition-med: 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

/* Light theme override */
html[data-theme="light"] {
  --bg: #f5f6fa;
  --surface: #ffffff;
  --surface-alt: #eef0f6;
  --text: #161822;
  --text-muted: #5a5f73;
  --accent: #0fa98c;
  --accent-soft: rgba(15, 169, 140, 0.1);
  --accent-2: #d98a2b;
  --border: rgba(10, 12, 20, 0.08);
  --shadow: rgba(20, 24, 40, 0.08);
}

/* ---------- 2. RESET & BASE ---------- */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: var(--nav-height);
}

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  line-height: 1.6;
  transition: background var(--transition-med), color var(--transition-med);
  overflow-x: hidden;
}

img {
  max-width: 100%;
  display: block;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

button {
  font-family: inherit;
  cursor: pointer;
  border: none;
  background: none;
}

/* Visible keyboard focus for accessibility */
a:focus-visible,
button:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
  border-radius: 4px;
}

/* Respect reduced-motion preference */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* ---------- 3. UTILITIES ---------- */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.85rem 1.6rem;
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
  font-size: 0.9rem;
  font-weight: 500;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast), background var(--transition-fast);
}

.btn--primary {
  background: var(--accent);
  color: #0b0d12;
}

.btn--primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 28px -8px var(--accent-soft), 0 0 0 1px var(--accent);
}

.btn--ghost {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text);
}

.btn--ghost:hover {
  border-color: var(--accent);
  color: var(--accent);
  transform: translateY(-3px);
}

/* ---------- 4. NAVBAR ---------- */
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  height: var(--nav-height);
  display: flex;
  align-items: center;
  background: color-mix(in srgb, var(--bg) 80%, transparent);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--border);
  transition: background var(--transition-med), border-color var(--transition-med);
}

.navbar__inner {
  width: 100%;
  max-width: var(--container-width);
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar__brand {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.brand__bracket {
  color: var(--accent);
}

.navbar__nav {
  display: flex;
  gap: 2rem;
  font-family: var(--font-mono);
}

.nav__link {
  position: relative;
  font-size: 0.92rem;
  color: var(--text-muted);
  transition: color var(--transition-fast);
}

.nav__link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -6px;
  width: 0;
  height: 2px;
  background: var(--accent);
  transition: width var(--transition-fast);
}

.nav__link:hover {
  color: var(--text);
}

.nav__link:hover::after,
.nav__link.active::after {
  width: 100%;
}

.nav__link.active {
  color: var(--accent);
}

.navbar__actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.theme-toggle {
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  border: 1px solid var(--border);
  color: var(--text);
  transition: border-color var(--transition-fast), color var(--transition-fast), transform var(--transition-fast);
}

.theme-toggle:hover {
  border-color: var(--accent);
  color: var(--accent);
  transform: rotate(20deg);
}

/* Hamburger — hidden on desktop */
.hamburger {
  display: none;
  width: 40px;
  height: 40px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
}

.hamburger span {
  width: 22px;
  height: 2px;
  background: var(--text);
  transition: transform var(--transition-fast), opacity var(--transition-fast);
}

.hamburger.active span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.hamburger.active span:nth-child(2) {
  opacity: 0;
}
.hamburger.active span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* ---------- 5. HERO ---------- */
.hero {
  position: relative;
  min-height: calc(100vh - var(--nav-height));
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 1.5rem;
  overflow: hidden;
}

.hero__bg {
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    radial-gradient(circle at 18% 20%, var(--accent-soft), transparent 40%),
    radial-gradient(circle at 82% 78%, rgba(242, 184, 75, 0.08), transparent 45%);
}

.hero__container {
  max-width: 780px;
}

.hero__eyebrow {
  font-family: var(--font-mono);
  color: var(--accent);
  font-size: 0.95rem;
  margin-bottom: 1rem;
}

.hero__name {
  font-family: var(--font-display);
  font-size: clamp(2.6rem, 7vw, 5rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.05;
  background: linear-gradient(135deg, var(--text) 40%, var(--accent) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero__tagline {
  margin-top: 1.4rem;
  font-family: var(--font-mono);
  font-size: clamp(1rem, 2.4vw, 1.25rem);
  color: var(--text-muted);
  min-height: 1.6em;
}

.cursor {
  color: var(--accent);
  animation: blink 1s step-start infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

.hero__cta {
  margin-top: 2.5rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.hero__scroll-hint {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: var(--text-muted);
  font-size: 1.2rem;
  animation: bounce 2.2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translate(-50%, 0); }
  50% { transform: translate(-50%, 10px); }
}

/* ---------- 6. SECTION SHELL ---------- */
.section {
  padding: 6.5rem 1.5rem;
}

.section--alt {
  background: var(--surface);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.section__container {
  max-width: var(--container-width);
  margin: 0 auto;
}

.section__label {
  font-family: var(--font-mono);
  color: var(--accent);
  font-size: 0.9rem;
  margin-bottom: 0.6rem;
}

.section__title {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 600;
  margin-bottom: 3rem;
  letter-spacing: -0.01em;
}

/* ---------- 7. ABOUT ---------- */
.about__grid {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 3rem;
  align-items: start;
}

.about__card {
  display: flex;
  justify-content: center;
}

.about__avatar {
  width: 200px;
  height: 200px;
  border-radius: var(--radius-lg);
  background: linear-gradient(150deg, var(--surface-alt), var(--surface));
  border: 1px solid var(--border);
  display: grid;
  place-items: center;
  font-size: 4.5rem;
  color: var(--accent);
  transition: transform var(--transition-med);
}

.about__avatar:hover {
  transform: translateY(-6px) rotate(-2deg);
}

.about__content p {
  color: var(--text-muted);
  margin-bottom: 1.1rem;
  max-width: 62ch;
}

.about__content strong {
  color: var(--text);
}

.about__facts {
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.fact {
  padding: 1rem 1.2rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  transition: border-color var(--transition-fast), transform var(--transition-fast);
}

.fact:hover {
  border-color: var(--accent);
  transform: translateY(-3px);
}

.fact__label {
  display: block;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 0.35rem;
}

.fact__value {
  font-weight: 600;
}

/* ---------- 8. SKILLS ---------- */
.skills__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem 3rem;
}

.skill__head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.6rem;
  font-family: var(--font-mono);
  font-size: 0.95rem;
}

.skill__name i {
  color: var(--accent);
  margin-right: 0.4rem;
}

.skill__percent {
  color: var(--text-muted);
}

.skill__bar {
  height: 10px;
  border-radius: 999px;
  background: var(--surface-alt);
  border: 1px solid var(--border);
  overflow: hidden;
}

.skill__fill {
  height: 100%;
  width: 0%; /* animated by JS on scroll */
  border-radius: 999px;
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
  transition: width 1.4s cubic-bezier(0.22, 1, 0.36, 1);
}

/* ---------- 9. PROJECTS ---------- */
.projects__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.75rem;
}

.project-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: transform var(--transition-med), box-shadow var(--transition-med), border-color var(--transition-med);
}

.project-card:hover {
  transform: translateY(-8px);
  border-color: var(--accent);
  box-shadow: 0 20px 40px -20px var(--shadow);
}

.project-card__top {
  height: 130px;
  display: grid;
  place-items: center;
  font-size: 2.4rem;
  color: var(--accent);
  background: linear-gradient(145deg, var(--accent-soft), transparent);
  border-bottom: 1px solid var(--border);
}

.project-card__body {
  padding: 1.5rem;
}

.project-card__tag {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--accent-2);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.project-card__body h3 {
  font-family: var(--font-display);
  font-size: 1.25rem;
  margin: 0.5rem 0 0.6rem;
}

.project-card__body p {
  color: var(--text-muted);
  font-size: 0.93rem;
  margin-bottom: 1.2rem;
}

.project-card__links {
  display: flex;
  gap: 1.4rem;
}

.link {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--text);
  border-bottom: 1px solid transparent;
  transition: color var(--transition-fast), border-color var(--transition-fast);
}

.link i {
  margin-right: 0.3rem;
}

.link:hover {
  color: var(--accent);
  border-color: var(--accent);
}

/* ---------- 10. CONTACT ---------- */
.contact__box {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 2.2rem 2.5rem;
}

.contact__icon {
  width: 64px;
  height: 64px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  font-size: 1.5rem;
  border-radius: 50%;
  background: var(--accent-soft);
  color: var(--accent);
}

.contact__info {
  display: flex;
  flex-direction: column;
  margin-right: auto;
}

.contact__label {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.contact__value {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 600;
  transition: color var(--transition-fast);
}

.contact__value:hover {
  color: var(--accent);
}

/* ---------- 11. FOOTER ---------- */
.footer {
  text-align: center;
  padding: 2rem 1.5rem;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--text-muted);
  border-top: 1px solid var(--border);
}

/* ---------- 12. SCROLL-TO-TOP BUTTON ---------- */
.scroll-top {
  position: fixed;
  right: 1.75rem;
  bottom: 1.75rem;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--accent);
  color: #0b0d12;
  font-size: 1.05rem;
  box-shadow: 0 10px 25px -8px var(--shadow);
  opacity: 0;
  visibility: hidden;
  transform: translateY(12px);
  transition: opacity var(--transition-fast), transform var(--transition-fast), visibility var(--transition-fast);
  z-index: 90;
}

.scroll-top.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.scroll-top:hover {
  transform: translateY(-4px);
}

/* ---------- 13. FADE-IN SCROLL ANIMATION ---------- */
.fade-in {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}

/* ---------- 14. RESPONSIVE BREAKPOINTS ---------- */
@media (max-width: 900px) {
  .about__grid {
    grid-template-columns: 1fr;
  }

  .about__card {
    justify-content: flex-start;
  }

  .skills__grid {
    grid-template-columns: 1fr;
  }

  .projects__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 760px) {
  .navbar__nav {
    position: fixed;
    top: var(--nav-height);
    left: 0;
    right: 0;
    flex-direction: column;
    gap: 0;
    background: var(--bg);
    border-bottom: 1px solid var(--border);
    max-height: 0;
    overflow: hidden;
    transition: max-height var(--transition-med);
  }

  .navbar__nav.open {
    max-height: 320px;
  }

  .nav__link {
    padding: 1rem 1.5rem;
    width: 100%;
    border-top: 1px solid var(--border);
  }

  .hamburger {
    display: flex;
  }

  .projects__grid {
    grid-template-columns: 1fr;
  }

  .contact__box {
    flex-direction: column;
    text-align: center;
  }

  .contact__info {
    margin-right: 0;
    align-items: center;
  }
}

@media (max-width: 480px) {
  .section {
    padding: 4.5rem 1.25rem;
  }

  .about__facts {
    grid-template-columns: 1fr;
  }

  .hero__cta {
    flex-direction: column;
    align-items: stretch;
  }
}
