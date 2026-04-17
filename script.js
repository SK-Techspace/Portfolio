const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");
const revealItems = document.querySelectorAll(".panel, .section-heading, .metric-card");
const sections = document.querySelectorAll("main section[id]");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

revealItems.forEach((item) => item.classList.add("reveal"));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      const link = document.querySelector(`.site-nav a[href="#${id}"]`);
      if (!link) return;

      if (entry.isIntersecting) {
        navLinks.forEach((navLink) => navLink.classList.remove("is-active"));
        link.classList.add("is-active");
      }
    });
  },
  {
    threshold: 0.35,
    rootMargin: "-20% 0px -55% 0px",
  }
);

sections.forEach((section) => navObserver.observe(section));
