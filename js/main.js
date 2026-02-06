// ===============================
// ELEMENTS
// ===============================
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const themeToggle = document.getElementById("themeToggle");
const body = document.body;
const yearSpan = document.getElementById("year");
const navItems = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section");

// ===============================
// MOBILE MENU TOGGLE
// ===============================
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Close menu when clicking a nav link (mobile-friendly)
navItems.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
  });
});

// ===============================
// THEME TOGGLE (DARK / LIGHT)
// ===============================
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  body.classList.add("dark");
  themeToggle.textContent = "☀️";
} else {
  themeToggle.textContent = "🌙";
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    themeToggle.textContent = "☀️";
  } else {
    localStorage.setItem("theme", "light");
    themeToggle.textContent = "🌙";
  }
});
// ===============================
// DYNAMIC FOOTER YEAR
// ===============================
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// ===============================
// SCROLL SPY - ACTIVE NAV LINK
// ===============================
window.addEventListener("scroll", () => {
  const scrollPos = window.scrollY + 100; // offset for fixed nav

  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;

    if (scrollPos >= top && scrollPos < bottom) {
      const id = section.getAttribute("id");
      navItems.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${id}`) {
          link.classList.add("active");
        }
      });
    }
  });
});

// ===============================
// SMOOTH SCROLL (OPTIONAL if not CSS native)
// ===============================
navItems.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ===============================
// CLIENT BRAND PRESET TOGGLE
// ===============================
// Example: cycle through branding classes when clicking logo
const brandClasses = ["brand-radio", "brand-podcast", "brand-corporate"];
const logo = document.querySelector(".logo");

if (logo) {
  logo.addEventListener("click", () => {
    // Remove current brand class
    brandClasses.forEach(cls => body.classList.remove(cls));

    // Get current brand index
    let current = brandClasses.findIndex(cls => body.classList.contains(cls));
    let next = (current + 1) % brandClasses.length;

    body.classList.add(brandClasses[next]);
  });
}
