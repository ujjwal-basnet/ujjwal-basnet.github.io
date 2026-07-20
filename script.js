const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const navPanel = document.querySelector("[data-nav-panel]");
const navLinks = [...document.querySelectorAll(".site-nav a[href^='#']")];

function setMenu(open) {
  if (!menuToggle || !navPanel) return;
  menuToggle.setAttribute("aria-expanded", String(open));
  navPanel.dataset.open = String(open);
  document.body.classList.toggle("menu-open", open);
}

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  setMenu(!isOpen);
});

navPanel?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("keydown", (event) => {
  const menuIsOpen = menuToggle?.getAttribute("aria-expanded") === "true";

  if (event.key === "Escape" && menuIsOpen) {
    setMenu(false);
    menuToggle?.focus();
  }
});

document.addEventListener("click", (event) => {
  if (
    menuToggle?.getAttribute("aria-expanded") === "true" &&
    header &&
    !header.contains(event.target)
  ) {
    setMenu(false);
  }
});

const desktopQuery = window.matchMedia("(min-width: 64rem)");
desktopQuery.addEventListener("change", (event) => {
  if (event.matches) setMenu(false);
});

function updateHeader() {
  header?.classList.toggle("is-scrolled", window.scrollY > 16);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const observedSections = [...document.querySelectorAll("#work, #systems, #films, #notes")];

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      navLinks.forEach((link) => {
        const active = link.getAttribute("href") === "#" + visible.target.id;
        if (active) {
          link.setAttribute("aria-current", "true");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    },
    {
      rootMargin: "-22% 0px -62% 0px",
      threshold: [0, 0.1, 0.35],
    },
  );

  observedSections.forEach((section) => sectionObserver.observe(section));
}

const year = document.querySelector("[data-year]");
if (year) year.textContent = String(new Date().getFullYear());
