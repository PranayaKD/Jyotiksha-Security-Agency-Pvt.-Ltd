/* ============================================
   JYOTIKSHA SECURITY AGENCY - OPTIMIZED JS
   Performance-optimized, Mobile-friendly
   ============================================ */

(function () {
  "use strict";

  // ============================================
  // INITIALIZATION
  // ============================================
  const app = {
    init() {
      this.cacheDOM();
      this.initAOS();
      this.initNavigation();
      this.initHeroSlider();
      this.initForms();
      this.initVideoHandlers();
      this.initScrollEffects();
      this.initCounters();
      this.initFAQ();
      console.log(
        "%c Jyotiksha Security Agency ",
        "background: linear-gradient(135deg, #0f4c81, #0a3a63); color: white; font-size: 16px; padding: 10px 20px; border-radius: 5px;",
      );
    },

    cacheDOM() {
      // Navigation
      this.mainNav = document.querySelector(".site-header");
      this.navToggle = document.getElementById("navToggle");
      this.navMenu = document.getElementById("navMenu");
      this.dropdowns = document.querySelectorAll(".has-dropdown");

      // Slider
      this.slides = document.querySelectorAll(".slide");
      this.dots = document.querySelectorAll(".dot");
      this.prevBtn = document.getElementById("sliderPrev");
      this.nextBtn = document.getElementById("sliderNext");

      // Forms
      this.leadForm = document.getElementById("leadForm");
      this.formSuccess = document.getElementById("formSuccess");
      this.contactForm = document.getElementById("contactForm");

      // Video
      this.playBtn = document.getElementById("playBtn");
      this.videoOverlay = document.querySelector(".video-overlay");
      this.videoModal = document.getElementById("videoModal");
      this.modalClose = document.getElementById("modalClose");
      this.modalIframe = document.getElementById("modalIframe");

      // Stats
      this.statsSection = document.querySelector(".stats-section");
      this.statNumbers = document.querySelectorAll(".stat-number");

      // Back to top
      this.backToTop = document.getElementById("backToTop");

      // FAQ
      this.faqQuestions = document.querySelectorAll(".faq-question");
    },

    // ============================================
    // AOS INITIALIZATION
    // ============================================
    initAOS() {
      if (typeof AOS !== "undefined") {
        AOS.init({
          duration: 800,
          easing: "ease-out-cubic",
          once: true,
          offset: 50,
          disable: "mobile", // Disable on mobile for better performance
        });
      }
    },

    // ============================================
    // NAVIGATION
    // ============================================
    initNavigation() {
      // Sticky navigation with throttle
      let lastScroll = 0;
      const throttleScroll = this.throttle(() => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
          this.mainNav?.classList.add("scrolled");
        } else {
          this.mainNav?.classList.remove("scrolled");
        }

        lastScroll = currentScroll;
      }, 100);

      window.addEventListener("scroll", throttleScroll, { passive: true });

      // Mobile menu toggle
      this.navToggle?.addEventListener("click", () => {
        this.navMenu?.classList.toggle("active");
        this.navToggle?.classList.toggle("active");

        // Prevent body scroll when menu is open
        if (this.navMenu?.classList.contains("active")) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "";
        }
      });

      // Mobile dropdown toggle
      this.dropdowns.forEach((dropdown) => {
        const link = dropdown.querySelector("a");
        link?.addEventListener("click", (e) => {
          if (window.innerWidth <= 992) {
            e.preventDefault();
            dropdown.classList.toggle("active");
          }
        });
      });

      // Close menu when clicking outside
      document.addEventListener("click", (e) => {
        if (
          this.navMenu &&
          this.navToggle &&
          !this.navMenu.contains(e.target) &&
          !this.navToggle.contains(e.target)
        ) {
          this.navMenu.classList.remove("active");
          this.navToggle.classList.remove("active");
          document.body.style.overflow = "";
        }
      });

      // Inject mobile utility if needed
      this.injectMobileUtility();

      // Smooth scroll for anchor links
      this.initSmoothScroll();
    },

    injectMobileUtility() {
      const headerTopBar = document.querySelector(".header-top-bar");
      if (headerTopBar && this.navMenu && window.innerWidth <= 1200) {
        const mobileUtils = headerTopBar.cloneNode(true);
        mobileUtils.className = "mobile-utility-wrapper";

        // Remove duplicate IDs
        mobileUtils
          .querySelectorAll("[id]")
          .forEach((el) => el.removeAttribute("id"));

        const wrapperLi = document.createElement("li");
        wrapperLi.style.width = "100%";
        wrapperLi.appendChild(mobileUtils);

        this.navMenu.appendChild(wrapperLi);
      }
    },

    initSmoothScroll() {
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (e) => {
          const href = anchor.getAttribute("href");
          if (href !== "#" && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
              const headerOffset = 100;
              const elementPosition = target.getBoundingClientRect().top;
              const offsetPosition =
                elementPosition + window.pageYOffset - headerOffset;

              window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
              });

              // Close mobile menu if open
              this.navMenu?.classList.remove("active");
              this.navToggle?.classList.remove("active");
              document.body.style.overflow = "";
            }
          }
        });
      });
    },

    // ============================================
    // HERO SLIDER
    // ============================================
    initHeroSlider() {
      if (!this.slides.length) return;

      let currentSlide = 0;
      let slideInterval;

      const goToSlide = (index) => {
        this.slides.forEach((slide) => slide.classList.remove("active"));
        this.dots.forEach((dot) => dot.classList.remove("active"));

        currentSlide = index;
        if (currentSlide >= this.slides.length) currentSlide = 0;
        if (currentSlide < 0) currentSlide = this.slides.length - 1;

        this.slides[currentSlide]?.classList.add("active");
        this.dots[currentSlide]?.classList.add("active");
      };

      const nextSlide = () => goToSlide(currentSlide + 1);
      const prevSlide = () => goToSlide(currentSlide - 1);

      const startSlider = () => {
        slideInterval = setInterval(nextSlide, 5000);
      };

      const stopSlider = () => {
        clearInterval(slideInterval);
      };

      // Event listeners
      this.prevBtn?.addEventListener("click", () => {
        stopSlider();
        prevSlide();
        startSlider();
      });

      this.nextBtn?.addEventListener("click", () => {
        stopSlider();
        nextSlide();
        startSlider();
      });

      this.dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          stopSlider();
          goToSlide(index);
          startSlider();
        });
      });

      // Pause on hover
      const sliderContainer = document.querySelector(".slider-container");
      sliderContainer?.addEventListener("mouseenter", stopSlider);
      sliderContainer?.addEventListener("mouseleave", startSlider);

      // Start auto-slide
      startSlider();

      // Pause when tab is not visible
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
          stopSlider();
        } else {
          startSlider();
        }
      });
    },

    // ============================================
    // FORMS
    // ============================================
    initForms() {
      // Lead form
      this.leadForm?.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleFormSubmit(this.leadForm, this.formSuccess);
      });

      // Contact form
      this.contactForm?.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleContactForm(this.contactForm);
      });
    },

    handleFormSubmit(form, successEl) {
      const formData = new FormData(form);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });

      // Validation
      if (!data.fullName || !data.contactNumber) {
        this.showAlert("Please fill in all required fields.", "error");
        return;
      }

      // Phone validation
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(data.contactNumber.replace(/\D/g, ""))) {
        this.showAlert("Please enter a valid 10-digit phone number.", "error");
        return;
      }

      // Store in localStorage
      this.storeInquiry(data);

      // Show success
      if (form && successEl) {
        form.style.display = "none";
        successEl.style.display = "block";
      }
    },

    handleContactForm(form) {
      const formData = new FormData(form);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });

      this.storeInquiry(data, "contact-page");
      this.showAlert(
        "Thank you for your message! We will get back to you shortly.",
        "success",
      );
      form.reset();
    },

    storeInquiry(data, source = "lead-form") {
      let inquiries = JSON.parse(localStorage.getItem("inquiries") || "[]");
      data.timestamp = new Date().toISOString();
      data.id = Date.now();
      data.source = source;
      inquiries.push(data);
      localStorage.setItem("inquiries", JSON.stringify(inquiries));
    },

    showAlert(message, type = "info") {
      // Simple alert for now - can be replaced with custom notification
      alert(message);
    },

    // ============================================
    // VIDEO HANDLERS
    // ============================================
    initVideoHandlers() {
      // Play button on video section
      this.playBtn?.addEventListener("click", () => {
        this.videoOverlay?.classList.add("hidden");
      });

      // Video modal
      this.modalClose?.addEventListener("click", () => {
        this.closeVideoModal();
      });

      this.videoModal?.addEventListener("click", (e) => {
        if (e.target === this.videoModal) {
          this.closeVideoModal();
        }
      });

      // Close modal on Escape
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          this.closeVideoModal();
        }
      });

      // Global function for opening modal
      window.openVideoModal = () => {
        if (this.videoModal && this.modalIframe) {
          this.modalIframe.src =
            "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1";
          this.videoModal.classList.add("active");
          document.body.style.overflow = "hidden";
        }
      };

      // Global function for resetting form
      window.resetForm = () => {
        if (this.leadForm && this.formSuccess) {
          this.leadForm.reset();
          this.leadForm.style.display = "block";
          this.formSuccess.style.display = "none";
        }
      };
    },

    closeVideoModal() {
      if (this.videoModal && this.modalIframe) {
        this.videoModal.classList.remove("active");
        this.modalIframe.src = "";
        document.body.style.overflow = "";
      }
    },

    // ============================================
    // SCROLL EFFECTS
    // ============================================
    initScrollEffects() {
      // Back to top button with throttle
      const throttleScroll = this.throttle(() => {
        if (window.pageYOffset > 500) {
          this.backToTop?.classList.add("visible");
        } else {
          this.backToTop?.classList.remove("visible");
        }
      }, 100);

      window.addEventListener("scroll", throttleScroll, { passive: true });

      this.backToTop?.addEventListener("click", () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });

      // Client logo slider pause on hover
      const clientsTrack = document.querySelector(".clients-track");
      if (clientsTrack) {
        clientsTrack.addEventListener("mouseenter", () => {
          clientsTrack.style.animationPlayState = "paused";
        });

        clientsTrack.addEventListener("mouseleave", () => {
          clientsTrack.style.animationPlayState = "running";
        });
      }
    },

    // ============================================
    // ANIMATED COUNTERS
    // ============================================
    initCounters() {
      if (!this.statsSection || !this.statNumbers.length) return;

      let countersAnimated = false;

      const animateCounters = () => {
        if (countersAnimated) return;

        this.statNumbers.forEach((counter) => {
          const target = parseInt(counter.getAttribute("data-target"));
          const duration = 2000;
          const step = target / (duration / 16);
          let current = 0;

          const updateCounter = () => {
            current += step;
            if (current < target) {
              counter.textContent = Math.floor(current);
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target;
            }
          };

          updateCounter();
        });

        countersAnimated = true;
      };

      // Intersection Observer for counters
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateCounters();
            }
          });
        },
        { threshold: 0.5 },
      );

      observer.observe(this.statsSection);
    },

    // ============================================
    // FAQ ACCORDION
    // ============================================
    initFAQ() {
      this.faqQuestions.forEach((button) => {
        button.addEventListener("click", () => {
          const item = button.parentElement;

          // Close other items (optional - remove for multiple open)
          // document.querySelectorAll('.faq-item').forEach(otherItem => {
          //     if (otherItem !== item) {
          //         otherItem.classList.remove('active');
          //     }
          // });

          item.classList.toggle("active");
        });
      });
    },

    // ============================================
    // UTILITY FUNCTIONS
    // ============================================
    throttle(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    },

    debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    },
  };

  // ============================================
  // START APPLICATION
  // ============================================
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => app.init());
  } else {
    app.init();
  }

  // Window load event for final optimizations
  window.addEventListener("load", () => {
    document.body.classList.add("loaded");

    // Lazy load images if needed
    if ("loading" in HTMLImageElement.prototype) {
      const images = document.querySelectorAll('img[loading="lazy"]');
      images.forEach((img) => {
        img.src = img.dataset.src || img.src;
      });
    }
  });
})();
