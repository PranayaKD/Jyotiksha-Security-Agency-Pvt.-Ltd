/* ============================================================
   M/S JYOTIKSHA SECURITY AGENCY PVT. LTD.
   script.js — Interactivity + GSAP Animations
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /* -------------------------------------------------------
     1. Footer Year
     ------------------------------------------------------- */
  const yearEl = document.getElementById("footerYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* -------------------------------------------------------
     2. Sticky Header
     ------------------------------------------------------- */
  const header = document.getElementById("header");

  const handleScroll = () => {
    if (window.scrollY > 60) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll(); // run once on load

  /* -------------------------------------------------------
     3. Hamburger Menu
     ------------------------------------------------------- */
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  const navOverlay = document.getElementById("navOverlay");

  const toggleMenu = () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("open");
    navOverlay.classList.toggle("active");
    document.body.style.overflow = navLinks.classList.contains("open")
      ? "hidden"
      : "";
  };

  hamburger.addEventListener("click", toggleMenu);
  navOverlay.addEventListener("click", toggleMenu);

  // Close menu when a link is clicked
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (navLinks.classList.contains("open")) toggleMenu();
    });
  });

  /* -------------------------------------------------------
     4. Active Nav Link on Scroll
     ------------------------------------------------------- */
  const sections = document.querySelectorAll("section[id]");
  const navAnchors = navLinks.querySelectorAll("a[href^='#']");

  const highlightNav = () => {
    const scrollPos = window.scrollY + 120;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navAnchors.forEach((a) => {
          a.classList.remove("active");
          if (a.getAttribute("href") === `#${id}`) {
            a.classList.add("active");
          }
        });
      }
    });
  };
  window.addEventListener("scroll", highlightNav, { passive: true });

  /* -------------------------------------------------------
     5. Smooth Scroll for Anchor Links
     ------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        e.preventDefault();
        const headerOffset = 72;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  /* -------------------------------------------------------
     6. Testimonial Slider
     ------------------------------------------------------- */
  const track = document.getElementById("testimonialTrack");
  const dots = document.querySelectorAll(".slider-dot");

  if (track && dots.length > 0) {
    let currentSlide = 0;
    const totalSlides = dots.length;
    let autoplayInterval;

    const goToSlide = (index) => {
      currentSlide = index;
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
      dots.forEach((dot) => dot.classList.remove("active"));
      dots[currentSlide].classList.add("active");
    };

    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        goToSlide(parseInt(dot.dataset.index, 10));
        resetAutoplay();
      });
    });

    const nextSlide = () => {
      goToSlide((currentSlide + 1) % totalSlides);
    };

    const startAutoplay = () => {
      autoplayInterval = setInterval(nextSlide, 5000);
    };

    const resetAutoplay = () => {
      clearInterval(autoplayInterval);
      startAutoplay();
    };

    startAutoplay();

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );

    track.addEventListener(
      "touchend",
      (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > 50) {
          if (diff > 0 && currentSlide < totalSlides - 1) {
            goToSlide(currentSlide + 1);
          } else if (diff < 0 && currentSlide > 0) {
            goToSlide(currentSlide - 1);
          }
          resetAutoplay();
        }
      },
      { passive: true }
    );
  }

  /* -------------------------------------------------------
     7. Contact Form Handling
     ------------------------------------------------------- */
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = form.querySelector("#name").value.trim();
      const phone = form.querySelector("#phone").value.trim();
      const service = form.querySelector("#service").value;
      const message = form.querySelector("#message").value.trim();

      if (!name || !phone) {
        alert("Please fill in your name and phone number.");
        return;
      }

      // Build a WhatsApp message as a lightweight "backend"
      const waText = encodeURIComponent(
        `Hello, I would like to enquire about your security services.\n\nName: ${name}\nPhone: ${phone}\nService: ${service || "Not specified"}\nMessage: ${message || "N/A"}`
      );
      window.open(`https://wa.me/918917432820?text=${waText}`, "_blank");

      form.reset();
      alert("Thank you! Your enquiry has been sent via WhatsApp.");
    });
  }

  /* -------------------------------------------------------
     8. GSAP Scroll Animations
     ------------------------------------------------------- */
  // Wait for GSAP to load (deferred)
  const initGSAP = () => {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
      setTimeout(initGSAP, 100);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Animate every .reveal element
    const reveals = document.querySelectorAll(".reveal");

    reveals.forEach((el, i) => {
      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay: i % 4 === 0 ? 0 : 0.1,
        ease: "power2.out",
      });
    });

    // Hero — immediate fade-in (not scroll-triggered)
    const heroReveals = document.querySelectorAll(".hero .reveal");
    heroReveals.forEach((el, i) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.3 + i * 0.2,
        ease: "power3.out",
      });
    });
  };

  initGSAP();
});
