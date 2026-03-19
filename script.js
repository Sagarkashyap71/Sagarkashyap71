/* ===========================
   IMMEDIATELY make all content visible
=========================== */
document.addEventListener('DOMContentLoaded', function () {

  // Force show everything immediately as fallback
  function showAll() {
    document.querySelectorAll('.reveal').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
    document.querySelectorAll(
      '.hero-tag, .hero-name, .hero-tagline, .hero-sub, .hero-btns, .hero-socials, .hero-visual'
    ).forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
    document.querySelectorAll('.skill-fill').forEach(bar => {
      bar.style.width = bar.getAttribute('data-width') || '70%';
    });
  }

  // Show immediately on load
  showAll();

  // ===========================
  // NAVBAR
  // ===========================
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function () {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    highlightActiveNav();
  });

  // ===========================
  // HAMBURGER
  // ===========================
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');
  hamburger.addEventListener('click', function () {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  // ===========================
  // ACTIVE NAV
  // ===========================
  function highlightActiveNav() {
    document.querySelectorAll('section[id]').forEach(sec => {
      const top = sec.offsetTop - 120;
      const bottom = top + sec.offsetHeight;
      const navLink = document.querySelector(`.nav-links a[href="#${sec.id}"]`);
      if (navLink) {
        navLink.style.color = (window.scrollY >= top && window.scrollY < bottom) ? 'var(--accent)' : '';
      }
    });
  }

  // ===========================
  // SMOOTH SCROLL
  // ===========================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
      }
    });
  });

  // ===========================
  // SCROLL REVEAL
  // ===========================
  if ('IntersectionObserver' in window) {
    const revealEls = document.querySelectorAll('.reveal');
    revealEls.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(28px)';
      el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, i * 60);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -30px 0px' });

    revealEls.forEach(el => observer.observe(el));

    // Safety net: force show everything after 1.5s
    setTimeout(showAll, 1500);
  }

  // ===========================
  // TYPING EFFECT
  // ===========================
  const taglineEl = document.querySelector('.hero-tagline');
  if (taglineEl) {
    const fullText = "B.Tech CSE Student | Aspiring Developer";
    taglineEl.textContent = '';
    let i = 0;
    function typeWriter() {
      if (i < fullText.length) {
        taglineEl.textContent += fullText.charAt(i++);
        setTimeout(typeWriter, 50);
      }
    }
    setTimeout(typeWriter, 400);
  }

  // ===========================
  // CONTACT FORM
  // ===========================
  const form = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      if (!name || !email || !message) return;
      const btn = form.querySelector('.btn-primary');
      btn.textContent = 'Sending...';
      btn.disabled = true;
      setTimeout(() => {
        successMsg.style.display = 'block';
        form.reset();
        btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
        btn.disabled = false;
        setTimeout(() => { successMsg.style.display = 'none'; }, 4000);
      }, 1200);
    });
  }

});
