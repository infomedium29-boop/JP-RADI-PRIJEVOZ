(function () {
  const body = document.body;
  const menuBtn = document.querySelector('.menu-btn');
  const mobileLinks = document.querySelectorAll('.mobile-panel a');

  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      const isOpen = body.classList.toggle('menu-open');
      menuBtn.setAttribute('aria-expanded', String(isOpen));
    });
  }
  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      body.classList.remove('menu-open');
      if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
    });
  });

  const loader = document.querySelector('.intro-loader');
  const skipIntro = document.querySelector('.skip-intro');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hideLoader = () => {
    if (!loader) return;
    loader.classList.add('is-hidden');
    window.setTimeout(() => loader.remove(), 650);
  };

  if (loader) {
    if (prefersReduced || sessionStorage.getItem('jpIntroShown') === 'true') {
      loader.remove();
    } else {
      sessionStorage.setItem('jpIntroShown', 'true');
      window.setTimeout(hideLoader, 2600);
      if (skipIntro) skipIntro.addEventListener('click', hideLoader);
    }
  }

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });
    revealItems.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index % 4, 3) * 80}ms`;
      observer.observe(item);
    });
  } else {
    revealItems.forEach((item) => item.classList.add('in-view'));
  }

  const form = document.querySelector('[data-contact-form]');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const lines = [
        `Ime i prezime: ${data.get('ime') || ''}`,
        `Telefon: ${data.get('telefon') || ''}`,
        `E-mail: ${data.get('email') || ''}`,
        `Vrsta usluge: ${data.get('usluga') || ''}`,
        `Relacija: ${data.get('relacija') || ''}`,
        '',
        `Poruka: ${data.get('poruka') || ''}`
      ];
      const subject = encodeURIComponent('Upit s web stranice - J.P. Radić 2024');
      const bodyText = encodeURIComponent(lines.join('\n'));
      window.location.href = `mailto:jpradic2024@gmail.com?subject=${subject}&body=${bodyText}`;
    });
  }
})();
