/* ============================================================
   RESTLESS STATE — Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Utility Bar Ticker --- */
  const tickerItems = document.querySelectorAll('.utility-bar__ticker-item');
  if (tickerItems.length > 0) {
    let currentTicker = 0;
    tickerItems[0].classList.add('active');
    setInterval(() => {
      tickerItems[currentTicker].classList.remove('active');
      currentTicker = (currentTicker + 1) % tickerItems.length;
      tickerItems[currentTicker].classList.add('active');
    }, 3500);
  }

  /* --- Sticky Header --- */
  const header = document.querySelector('.site-header');
  if (header) {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY > 80) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      lastScroll = scrollY;
    }, { passive: true });
  }

  /* --- Mobile Menu --- */
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Accordion submenus
    const toggles = mobileMenu.querySelectorAll('.mobile-menu__toggle');
    toggles.forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        const submenu = toggle.closest('.mobile-menu__item').querySelector('.mobile-menu__submenu');
        if (submenu) {
          submenu.classList.toggle('active');
          toggle.classList.toggle('active');
        }
      });
    });
  }

  /* --- Hero Slideshow --- */
  const heroSlides = document.querySelectorAll('.hero__slide');
  const heroDots = document.querySelectorAll('.hero__dot');
  const heroSection = document.querySelector('.hero');
  if (heroSlides.length > 0) {
    let currentSlide = 0;
    let slideInterval;
    let isPaused = false;

    const goToSlide = (index) => {
      heroSlides[currentSlide].classList.remove('active');
      if (heroDots[currentSlide]) heroDots[currentSlide].classList.remove('active');
      currentSlide = index;
      heroSlides[currentSlide].classList.add('active');
      if (heroDots[currentSlide]) heroDots[currentSlide].classList.add('active');
    };

    const nextSlide = () => {
      goToSlide((currentSlide + 1) % heroSlides.length);
    };

    const prevSlide = () => {
      goToSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length);
    };

    const startAutoplay = () => {
      slideInterval = setInterval(() => {
        if (!isPaused) nextSlide();
      }, 5000);
    };

    // Dot navigation
    heroDots.forEach((dot, i) => {
      dot.addEventListener('click', () => goToSlide(i));
    });

    // Arrow navigation
    const prevArrow = document.querySelector('.hero__arrow--prev');
    const nextArrow = document.querySelector('.hero__arrow--next');
    if (prevArrow) prevArrow.addEventListener('click', prevSlide);
    if (nextArrow) nextArrow.addEventListener('click', nextSlide);

    // Pause on hover
    if (heroSection) {
      heroSection.addEventListener('mouseenter', () => { isPaused = true; });
      heroSection.addEventListener('mouseleave', () => { isPaused = false; });
    }

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    if (heroSection) {
      heroSection.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });
      heroSection.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
          diff > 0 ? nextSlide() : prevSlide();
        }
      }, { passive: true });
    }

    startAutoplay();
  }

  /* --- Tabbed Product Carousel --- */
  const tabs = document.querySelectorAll('.product-tabs__tab');
  const panels = document.querySelectorAll('.product-tabs__panel');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const targetPanel = document.getElementById(target);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });

  /* --- Cart Drawer --- */
  const cartBtn = document.querySelector('[data-cart-toggle]');
  const cartDrawer = document.querySelector('.cart-drawer');
  const cartOverlay = document.querySelector('.cart-overlay');
  const cartClose = document.querySelector('.cart-drawer__close');

  const openCart = () => {
    if (cartDrawer) cartDrawer.classList.add('active');
    if (cartOverlay) cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeCart = () => {
    if (cartDrawer) cartDrawer.classList.remove('active');
    if (cartOverlay) cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (cartBtn) cartBtn.addEventListener('click', openCart);
  if (cartClose) cartClose.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

  /* --- Product Page: Image Gallery Thumbnails --- */
  const thumbs = document.querySelectorAll('.product-gallery__thumb');
  const mainImg = document.querySelector('.product-gallery__main img');
  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      if (mainImg && thumb.dataset.src) {
        mainImg.src = thumb.dataset.src;
        mainImg.alt = thumb.dataset.label || '';
      }
    });
  });

  /* --- Product Page: Color Swatches --- */
  const colorSwatches = document.querySelectorAll('.product-color-swatch');
  colorSwatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      colorSwatches.forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
    });
  });

  /* --- Product Page: Size Buttons --- */
  const sizeBtns = document.querySelectorAll('.product-size-btn:not(.disabled)');
  sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  /* --- Product Page: Quantity --- */
  const qtyMinus = document.querySelector('.product-quantity__btn--minus');
  const qtyPlus = document.querySelector('.product-quantity__btn--plus');
  const qtyValue = document.querySelector('.product-quantity__value');
  if (qtyMinus && qtyPlus && qtyValue) {
    qtyMinus.addEventListener('click', () => {
      let val = parseInt(qtyValue.textContent);
      if (val > 1) qtyValue.textContent = val - 1;
    });
    qtyPlus.addEventListener('click', () => {
      let val = parseInt(qtyValue.textContent);
      if (val < 10) qtyValue.textContent = val + 1;
    });
  }

  /* --- Product Page: Accordion --- */
  const accordionTriggers = document.querySelectorAll('.product-accordion__trigger');
  accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.product-accordion__item');
      const content = item.querySelector('.product-accordion__content');
      const isActive = item.classList.contains('active');

      // Close all
      document.querySelectorAll('.product-accordion__item').forEach(i => {
        i.classList.remove('active');
        i.querySelector('.product-accordion__content').style.maxHeight = '0';
      });

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  /* --- Collection Page: Filter Toggles --- */
  const filterTitles = document.querySelectorAll('.filter-group__title');
  filterTitles.forEach(title => {
    title.addEventListener('click', () => {
      title.closest('.filter-group').classList.toggle('collapsed');
    });
  });

  /* --- Collection Page: Filter Checkboxes --- */
  const filterOptions = document.querySelectorAll('.filter-option');
  filterOptions.forEach(option => {
    option.addEventListener('click', () => {
      const checkbox = option.querySelector('.filter-option__checkbox');
      if (checkbox) checkbox.classList.toggle('checked');
    });
  });

  /* --- Collection Page: Mobile Filter Toggle --- */
  const filterToggle = document.querySelector('.filter-toggle-btn');
  const sidebar = document.querySelector('.collection-sidebar');
  if (filterToggle && sidebar) {
    filterToggle.addEventListener('click', () => {
      sidebar.classList.toggle('active');
      filterToggle.textContent = sidebar.classList.contains('active') ? '✕ Hide Filters' : '☰ Show Filters';
    });
  }

  /* --- Collection Page: Color Filter Swatches --- */
  const filterColorSwatches = document.querySelectorAll('.filter-color-swatch');
  filterColorSwatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      swatch.classList.toggle('active');
    });
  });

  /* --- Smooth Scroll for Anchor Links --- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
