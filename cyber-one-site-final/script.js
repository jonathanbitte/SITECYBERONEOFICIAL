document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  const glow = document.querySelector('.cursor-glow');

  window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 25), { passive: true });

  toggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
  }));

  if (window.matchMedia('(pointer:fine)').matches) {
    window.addEventListener('pointermove', event => {
      glow.style.left = `${event.clientX}px`;
      glow.style.top = `${event.clientY}px`;
    }, { passive: true });
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

  const sponsors = {
    SESI: { logo: 'sesilogo.png', site: 'https://www.sesi.portaldaindustria.com.br/para-voce', instagram: 'https://www.instagram.com/sesi.es/', linkedin: 'https://www.linkedin.com/company/sesi-es/' },
    TUNGSTEK: { logo: 'tungstek3.png', site: 'https://www.tungstek.com.br/' },
    TRIGLAV: { logo: 'triglav.png', site: 'https://triglav.com.br/' },
    ABRASOLDAS: { logo: 'abrasoldas.png', site: 'http://www.abrasoldas.com.br/' },
    FEKARTS: { logo: 'fekarts.png', instagram: 'https://www.instagram.com/fekarts1/' },
    PRINTES: { logo: 'PrintES.png', instagram: 'https://www.instagram.com/printes.visual/' },
    ROLDAM: { logo: 'Roldam.png', instagram: 'https://www.instagram.com/rolda.nn/' }
  };
  const modal = document.querySelector('#sponsorModal');
  const modalLogo = document.querySelector('#modalLogo');
  const modalTitle = document.querySelector('#modalTitle');
  const modalInstagram = document.querySelector('#modalInstagram');
  const modalSite = document.querySelector('#modalSite');
  const modalLinkedin = document.querySelector('#modalLinkedin');
  const modalLinks = document.querySelector('#modalLinks');
  document.querySelectorAll('.sponsor-card').forEach(card => card.addEventListener('click', () => {
    const name = card.dataset.sponsor;
    const data = sponsors[name];
    if (!data || !modal) return;
    modalLogo.src = data.logo;
    modalLogo.alt = name;
    modalTitle.textContent = name;
    [[modalInstagram, data.instagram], [modalSite, data.site], [modalLinkedin, data.linkedin]].forEach(([link, url]) => {
      link.hidden = !url;
      if (url) link.href = url;
    });
    const availableLinks = [data.instagram, data.site, data.linkedin].filter(Boolean).length;
    modalLinks.classList.toggle('single-link', availableLinks === 1);
    modal.showModal();
  }));
  document.querySelector('.modal-close')?.addEventListener('click', () => modal.close());
  modal?.addEventListener('click', event => { if (event.target === modal) modal.close(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && modal?.open) modal.close(); });
});


  const slides = [...document.querySelectorAll('.carousel-slide')];
  const dots = [...document.querySelectorAll('.carousel-dots button')];
  const previous = document.querySelector('.carousel-prev');
  const next = document.querySelector('.carousel-next');
  let currentSlide = 0;
  let carouselTimer;

  function showSlide(index) {
    currentSlide = (index + slides.length) % slides.length;
    slides.forEach((slide, itemIndex) => slide.classList.toggle('active', itemIndex === currentSlide));
    dots.forEach((dot, itemIndex) => dot.classList.toggle('active', itemIndex === currentSlide));
  }
  function restartCarousel() {
    clearInterval(carouselTimer);
    carouselTimer = setInterval(() => showSlide(currentSlide + 1), 5000);
  }
  previous?.addEventListener('click', () => { showSlide(currentSlide - 1); restartCarousel(); });
  next?.addEventListener('click', () => { showSlide(currentSlide + 1); restartCarousel(); });
  dots.forEach((dot, index) => dot.addEventListener('click', () => { showSlide(index); restartCarousel(); }));
  if (slides.length) restartCarousel();


  const areaDetails = document.querySelector('#areaDetails');
  const areaDetailsTitle = document.querySelector('#areaDetailsTitle');
  const areaDetailsText = document.querySelector('#areaDetailsText');
  const areaDetailsTags = document.querySelector('#areaDetailsTags');
  const areaContent = {
    programacao: {
      title: 'Programação',
      text: 'Nossa programação é formada por dois programadores, responsáveis por transformar as estratégias do time em código e comportamento para o robô. Trabalhamos com Java e utilizamos a WPILib no VS Code para desenvolver, testar e organizar os sistemas de controle, sensores e comandos do robô. A área também atua em parceria constante com a mecânica e a elétrica para que tudo funcione de forma integrada.',
      tags: ['02 programadores', 'Java', 'WPILib', 'VS Code', 'Controle e sensores']
    },
    eletrica: {
      title: 'Eletricistas',
      text: 'A elétrica é formada pelos dois programadores e por mais um integrante que atua exclusivamente como eletricista, totalizando três pessoas. O grupo entende como cada componente funciona e monta o sistema elétrico com excelência, organização e segurança. Também contamos com integrantes que fazem curso técnico integrado de Eletrotécnica, fortalecendo a nossa preparação para a arena.',
      tags: ['03 integrantes', 'Eletrotécnica', 'Fiação e energia', 'Segurança', 'Integração com a programação']
    },
    mecanica: {
      title: 'Mecânica',
      text: 'A mecânica conta com três integrantes e transforma as ideias em um robô capaz de competir. Temos alunos que fazem curso técnico de Mecânica e integrantes que trabalham com AutoCAD 3D para projetar peças, montar o robô, avaliar melhorias e pensar em estratégias de construção e desempenho.',
      tags: ['03 mecânicos', 'Curso técnico de Mecânica', 'AutoCAD 3D', 'Projeto e montagem', 'Estratégia de robô']
    },
    marketing: {
      title: 'Marketing e Gestão',
      text: 'Com quatro integrantes, Marketing e Gestão são o cérebro do funcionamento e da divulgação do time. Essa área organiza processos, planeja ações, cuida da comunicação, busca parcerias e apresenta a Cyber One para a comunidade. É o elo que ajuda o trabalho técnico a ganhar visibilidade e impacto dentro e fora das competições.',
      tags: ['04 integrantes', 'Gestão do time', 'Comunicação', 'Parcerias', 'Divulgação']
    }
  };
  document.querySelectorAll('.area-more').forEach(button => button.addEventListener('click', () => {
    const content = areaContent[button.dataset.area];
    if (!content) return;
    areaDetailsTitle.textContent = content.title;
    areaDetailsText.textContent = content.text;
    areaDetailsTags.innerHTML = content.tags.map(tag => `<span>${tag}</span>`).join('');
    areaDetails.classList.add('open');
    areaDetails.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }));
  document.querySelectorAll('.area-card').forEach(card => card.addEventListener('click', event => {
    if (event.target.closest('.area-more')) return;
    card.querySelector('.area-more')?.click();
  }));
  document.querySelector('.area-details-close')?.addEventListener('click', () => areaDetails.classList.remove('open'));
