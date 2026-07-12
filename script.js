(function(){
  // NAVBAR scroll state
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    backToTop.style.opacity = window.scrollY > 400 ? '1' : '0.6';
  });

  // Mobile menu
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuOverlay = document.getElementById('menuOverlay');
  function closeMenu(){
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    menuOverlay.classList.remove('open');
  }
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    menuOverlay.classList.toggle('open');
  });
  menuOverlay.addEventListener('click', closeMenu);
  document.querySelectorAll('.mnav-link').forEach(a => a.addEventListener('click', closeMenu));

  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e){
      const targetId = this.getAttribute('href');
      if(targetId.length > 1){
        const target = document.querySelector(targetId);
        if(target){
          e.preventDefault();
          const offset = 80;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({top, behavior:'smooth'});
        }
      }
    });
  });

  // Active nav link highlight
  const sections = document.querySelectorAll('section[id]');
  const navLinkEls = document.querySelectorAll('.nav-link');
  function setActiveLink(){
    let currentId = '';
    const scrollPos = window.scrollY + 120;
    sections.forEach(sec => {
      if(scrollPos >= sec.offsetTop){
        currentId = sec.getAttribute('id');
      }
    });
    navLinkEls.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
    });
  }
  window.addEventListener('scroll', setActiveLink);
  setActiveLink();

  // Back to top
  backToTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

  // Ripple effect on buttons
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e){
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });

  // Work filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const workCards = document.querySelectorAll('.work-card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      workCards.forEach(card => {
        const match = filter === 'all' || card.getAttribute('data-category') === filter;
        if(match){
          card.classList.remove('hidden-card');
          card.style.opacity = '1';
        } else {
          card.style.opacity = '0';
          setTimeout(() => card.classList.add('hidden-card'), 300);
        }
      });
    });
  });

  // Scroll reveal via IntersectionObserver
  const revealEls = document.querySelectorAll('.reveal');
  const skillFills = document.querySelectorAll('.skill-fill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:0.15});
  revealEls.forEach(el => observer.observe(el));

  // Skill bars animate when about section visible
  const skillsBlock = document.querySelector('.skills-block');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        skillFills.forEach(fill => {
          fill.style.width = fill.getAttribute('data-width') + '%';
        });
        skillObserver.disconnect();
      }
    });
  }, {threshold:0.3});
  if(skillsBlock) skillObserver.observe(skillsBlock);

  // Floating particles
  const particlesContainer = document.getElementById('particles');
  const particleCount = window.innerWidth < 768 ? 18 : 34;
  for(let i=0;i<particleCount;i++){
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 3 + 1.5;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = Math.random() * 100 + '%';
    p.style.bottom = '-10px';
    const duration = Math.random() * 8 + 8;
    const delay = Math.random() * 10;
    p.style.animationDuration = duration + 's';
    p.style.animationDelay = delay + 's';
    particlesContainer.appendChild(p);
  }

  
})();
window.addEventListener("pageshow", function () {
  if (document.activeElement) {
    document.activeElement.blur();
  }
});

document.addEventListener("visibilitychange", function () {
  if (!document.hidden && document.activeElement) {
    document.activeElement.blur();
  }
});
