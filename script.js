/* ==========================================================================
   TANMOY DUTTA — PORTFOLIO SCRIPT
   Sections:
   1. Footer year
   2. Sticky navbar shadow + active link on scroll
   3. Mobile hamburger menu
   4. Dark / light mode toggle (persisted in localStorage)
   5. Hero typewriter effect
   6. Scroll-to-top button
   7. Fade-in on scroll (IntersectionObserver)
   8. Animated skill progress bars (IntersectionObserver)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- 1. FOOTER YEAR ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  /* ---------- 2. STICKY NAVBAR: shadow + active section highlight ---------- */
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav__link");
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", () => {
    // Add a subtle shadow once the page has scrolled
    navbar.style.boxShadow = window.scrollY > 10 ? "0 4px 20px rgba(0,0,0,0.15)" : "none";

    // Highlight the nav link for the section currently in view
    let currentId = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        currentId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
    });
  });


  /* ---------- 3. MOBILE HAMBURGER MENU ---------- */
  const hamburger = document.getElementById("hamburger");
  const primaryNav = document.getElementById("primary-nav");

  hamburger.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("open");
    hamburger.classList.toggle("active", isOpen);
    hamburger.setAttribute("aria-expanded", isOpen);
  });

  // Close the mobile menu whenever a nav link is tapped
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      primaryNav.classList.remove("open");
      hamburger.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });


  /* ---------- 4. DARK / LIGHT MODE TOGGLE ---------- */
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const htmlEl = document.documentElement;

  // Load saved preference, defaulting to dark mode
  const savedTheme = localStorage.getItem("tanmoy-portfolio-theme") || "dark";
  setTheme(savedTheme);

  themeToggle.addEventListener("click", () => {
    const nextTheme = htmlEl.getAttribute("data-theme") === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("tanmoy-portfolio-theme", nextTheme);
  });

  function setTheme(theme) {
    if (theme === "light") {
      htmlEl.setAttribute("data-theme", "light");
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
      themeToggle.setAttribute("aria-pressed", "true");
    } else {
      htmlEl.removeAttribute("data-theme");
      themeIcon.classList.remove("fa-sun");
      themeIcon.classList.add("fa-moon");
      themeToggle.setAttribute("aria-pressed", "false");
    }
  }


  /* ---------- 5. HERO TYPEWRITER EFFECT ---------- */
  const typewriterEl = document.getElementById("typewriter");
  const taglinePhrases = [
    "learning Web Design.",
    "building with HTML & CSS.",
    "practicing JavaScript, one project at a time.",
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeLoop() {
    const currentPhrase = taglinePhrases[phraseIndex];

    if (!isDeleting) {
      charIndex++;
      typewriterEl.textContent = currentPhrase.slice(0, charIndex);

      if (charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(typeLoop, 1400); // pause at the end of the phrase
        return;
      }
    } else {
      charIndex--;
      typewriterEl.textContent = currentPhrase.slice(0, charIndex);

      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % taglinePhrases.length;
      }
    }

    const speed = isDeleting ? 35 : 55;
    setTimeout(typeLoop, speed);
  }

  typeLoop();


  /* ---------- 6. SCROLL-TO-TOP BUTTON ---------- */
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  window.addEventListener("scroll", () => {
    scrollTopBtn.classList.toggle("show", window.scrollY > 400);
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });


  /* ---------- 7. FADE-IN ON SCROLL ---------- */
  const fadeEls = document.querySelectorAll(".fade-in");

  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          fadeObserver.unobserve(entry.target); // animate once
        }
      });
    },
    { threshold: 0.15 }
  );

  fadeEls.forEach((el) => fadeObserver.observe(el));


  /* ---------- 8. ANIMATED SKILL PROGRESS BARS ---------- */
  const skillBars = document.querySelectorAll(".skill__fill");

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const bar = entry.target;
        const targetWidth = bar.getAttribute("data-width");
        const percentLabel = bar.closest(".skill").querySelector(".skill__percent");
        const target = parseInt(percentLabel.getAttribute("data-target"), 10);

        // Animate the bar width
        bar.style.width = `${targetWidth}%`;

        // Animate the percentage counter alongside the bar
        let current = 0;
        const duration = 1400; // ms, matches the CSS bar transition
        const stepTime = 16;
        const steps = duration / stepTime;
        const increment = target / steps;

        const counter = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(counter);
          }
          percentLabel.textContent = `${Math.round(current)}%`;
        }, stepTime);

        skillObserver.unobserve(bar);
      });
    },
    { threshold: 0.4 }
  );

  skillBars.forEach((bar) => skillObserver.observe(bar));

});
