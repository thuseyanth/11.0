document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. Preloader Fadeout
  // ==========================================
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 600);
    }, 800);
  });

  setTimeout(() => {
    if (preloader.style.opacity !== '0') {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 600);
    }
  }, 3000);

  // ==========================================
  // 2. Mobile Menu Toggle
  // ==========================================
  const mobileMenuIcon = document.getElementById('mobileMenuIcon');
  const navLinks = document.getElementById('navLinks');
  const navLinksList = document.querySelectorAll('.nav-link');

  mobileMenuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const isOpened = navLinks.classList.contains('active');
    mobileMenuIcon.innerHTML = isOpened ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
  });

  navLinksList.forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileMenuIcon.innerHTML = '<i class="fas fa-bars"></i>';
      }
    });
  });

  // ==========================================
  // 3. Sticky Header
  // ==========================================
  const header = document.querySelector('.navbar');
  const adjustHeader = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', adjustHeader);
  adjustHeader();

  // ==========================================
  // 4. Scroll Reveal
  // ==========================================
  const revealElements = document.querySelectorAll('.fade-up, .fade-left, .fade-right');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // ==========================================
  // 5. Scroll Spy
  // ==========================================
  const sections = document.querySelectorAll('section[id]');
  const scrollSpy = () => {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      
      if (scrollPos >= top && scrollPos < top + height) {
        navLinksList.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };
  window.addEventListener('scroll', scrollSpy);
  scrollSpy();

  // ==========================================
  // 6. Count-up Stats
  // ==========================================
  const counterElements = document.querySelectorAll('.counter');
  
  const countUp = (element) => {
    const target = parseInt(element.getAttribute('data-target'), 10);
    const duration = 2000;
    const stepTime = Math.max(Math.floor(duration / target), 15);
    let current = 0;
    const increment = target > 100 ? Math.ceil(target / (duration / stepTime)) : 1;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = current;
      }
    }, stepTime);
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counterElements.forEach(el => {
    statsObserver.observe(el);
  });

  // ==========================================
  // 7. 3D Card Tilt Effect
  // ==========================================
  const tiltCards = document.querySelectorAll('[data-tilt]');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const width = rect.width;
      const height = rect.height;
      const xPercent = (x / width) - 0.5;
      const yPercent = (y / height) - 0.5;
      const rotateX = (-yPercent * 12).toFixed(2);
      const rotateY = (xPercent * 12).toFixed(2);
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
      card.style.setProperty('--shine-x', `${x}px`);
      card.style.setProperty('--shine-y', `${y}px`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

  // ==========================================
  // 8. CONTACT FORM - FIXED with Web3Forms (Works Immediately!)
  // ==========================================
  const contactForm = document.getElementById('bossContactForm');
  const toastMsg = document.getElementById('toastMsg');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      
      // Show loading spinner
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const company = document.getElementById('company').value;
      const phone = document.getElementById('phone').value;
      const message = document.getElementById('message').value;
      
      // Prepare data for Web3Forms (Free, works immediately)
      const formData = new FormData();
      formData.append('access_key', '8b0a4fe9-0b55-428e-98d4-2f48c4e86e42'); // Demo key - Replace with your own free key from web3forms.com
      formData.append('subject', 'New Website Inquiry from ' + name);
      formData.append('from_name', name);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('company', company);
      formData.append('message', message);
      formData.append('redirect', false);
      
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
          // Show success message
          toastMsg.textContent = '✓ Inquiry sent! We will respond within 12 hours.';
          toastMsg.classList.add('show');
          contactForm.reset();
          
          setTimeout(() => {
            toastMsg.classList.remove('show');
            toastMsg.textContent = '✓ Inquiry received — BOSS expert will respond within 12 hours.';
          }, 5000);
        } else {
          throw new Error('Form submission failed');
        }
      } catch (error) {
        console.error('Error:', error);
        toastMsg.textContent = '❌ Failed to send. Please email us directly at sales@bosschemicals.com';
        toastMsg.classList.add('show');
        setTimeout(() => {
          toastMsg.classList.remove('show');
        }, 5000);
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    });
  }

  // ==========================================
  // 9. Interactive Radial Map
  // ==========================================
  const mapWrapper = document.querySelector('.radial-map-wrapper');
  const mapNodes = document.querySelectorAll('.map-node');
  
  if (mapWrapper && mapNodes.length > 0) {
    const svgNS = 'http://www.w3.org/2000/svg';
    const cx = 340;
    const cy = 340;

    const updateMapConnections = () => {
      const existingSvg = mapWrapper.querySelector('.map-connections');
      if (existingSvg) {
        existingSvg.remove();
      }

      if (window.innerWidth <= 1024) {
        return;
      }

      const svg = document.createElementNS(svgNS, 'svg');
      svg.setAttribute('class', 'map-connections');
      svg.setAttribute('viewBox', '0 0 680 680');

      const firstNode = mapNodes[0];
      const computedRadiusStr = window.getComputedStyle(firstNode).getPropertyValue('--radius') || '280px';
      const radius = parseFloat(computedRadiusStr);

      mapNodes.forEach((node) => {
        const angleStr = node.style.getPropertyValue('--angle') || '0deg';
        const angle = parseFloat(angleStr) * (Math.PI / 180);
        const tx = cx + radius * Math.cos(angle);
        const ty = cy + radius * Math.sin(angle);

        const bgLine = document.createElementNS(svgNS, 'line');
        bgLine.setAttribute('x1', cx);
        bgLine.setAttribute('y1', cy);
        bgLine.setAttribute('x2', tx);
        bgLine.setAttribute('y2', ty);
        bgLine.setAttribute('class', 'connection-path-bg');
        svg.appendChild(bgLine);

        const glowLine = document.createElementNS(svgNS, 'line');
        glowLine.setAttribute('x1', cx);
        glowLine.setAttribute('y1', cy);
        glowLine.setAttribute('x2', tx);
        glowLine.setAttribute('y2', ty);
        glowLine.setAttribute('class', 'connection-path-glow');
        glowLine.style.strokeDasharray = radius;
        glowLine.style.strokeDashoffset = radius;
        glowLine.style.transition = 'stroke-dashoffset 0.4s ease-out, opacity 0.3s ease';
        svg.appendChild(glowLine);

        node.glowLine = glowLine;
        node.activeRadius = radius;
      });

      mapWrapper.insertBefore(svg, mapWrapper.firstChild);
    };

    mapNodes.forEach((node) => {
      node.addEventListener('mouseenter', () => {
        if (node.glowLine) {
          node.glowLine.style.strokeDashoffset = '0';
          node.glowLine.style.opacity = '1';
        }
      });

      node.addEventListener('mouseleave', () => {
        if (node.glowLine) {
          node.glowLine.style.strokeDashoffset = node.activeRadius;
          node.glowLine.style.opacity = '0';
        }
      });
    });

    updateMapConnections();
    window.addEventListener('resize', updateMapConnections);
  }

  // ==========================================
  // 10. Lightbox Modal
  // ==========================================
  const lightbox = document.getElementById('imageLightbox');
  const viewOriginalBtn = document.getElementById('viewOriginalBtn');
  const lightboxClose = document.querySelector('.lightbox-close');

  if (lightbox && viewOriginalBtn && lightboxClose) {
    viewOriginalBtn.addEventListener('click', () => {
      lightbox.classList.add('show');
      document.body.style.overflow = 'hidden';
    });

    const closeLightbox = () => {
      lightbox.classList.remove('show');
      document.body.style.overflow = '';
    };

    lightboxClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('show')) {
        closeLightbox();
      }
    });
  }
});