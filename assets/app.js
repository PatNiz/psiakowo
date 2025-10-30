document.addEventListener('DOMContentLoaded', () => {
  /* ===================== i18n ===================== */
  const dict = {
    pl: {
      'html@lang':'pl',
      'title':'Psiakowo – Mastif pirenejski (hodowla)',
      'meta_description':'Hodowla mastifa pirenejskiego – informacje o rasie, galeria, opinie, kontakt i dojazd.',
      'og_title':'Psiakowo – Mastif pirenejski',
      'og_description':'Mastif pirenejski – poznaj rasę, zobacz galerię i skontaktuj się z hodowlą.',
      'nav_about':'O nas','nav_dogs':'Nasze pieski','nav_gallery':'Galeria','nav_reviews':'Opinie','nav_contact':'Kontakt',
      'badge':'Hodowla mastifa pirenejskiego',
      'hero_title':'Mastif pirenejski – spokojny olbrzym z sercem do ludzi',
      'hero_lead':'Specjalizujemy się w rasie mastif pirenejski. Dbamy o prawidłową socjalizację, zdrowie i wsparcie dla nowych opiekunów.',
      'cta_breed':'O rasie','cta_contact':'Skontaktuj się',
      'about_title':'O nas',
      'about_lead':'Nazywam się Agnieszka Sikora i od ponad ośmiu lat prowadzę z pasją hodowlę „Psiakowo”. Działamy zgodnie z przepisami, zapewniając przejrzystość i najwyższe standardy opieki.',
      'breed_title':'Mastif pirenejski',
      'b1_pill':'Charakter','b1_h':'Spokojny, oddany, czujny','b1_p':'Równowaga i przywiązanie do rodziny; naturalny stróż o łagodnym usposobieniu.',
      'b2_pill':'Pielęgnacja','b2_h':'Sierść i zdrowie','b2_p':'Regularne szczotkowanie, rozsądny ruch, profilaktyka stawów i kontrola masy ciała.',
      'b3_pill':'Dla kogo','b3_h':'Dom z ogrodem','b3_p':'Najlepiej odnajduje się przy spokojnych, konsekwentnych opiekunach w przestrzeni z ogrodem.',
      'aboutbreed_title':'O rasie: mastif pirenejski',
      'fci_origin_b':'Pochodzenie','fci_origin_v':'Hiszpania (Aragonia); dawnej stróż owiec podczas transhumancji.',
      'fci_group_b':'Klasyfikacja FCI','fci_group_v':'Grupa 2 – Molosy, sekcja 2.2 (bez próby pracy).',
      'fci_height_b':'Wysokość w kębie','fci_height_v':'min. 77 cm psy, 72 cm suki; preferowane większe, brak górnej granicy.',
      'fci_char_b':'Charakter','fci_char_v':'spokojny, zrównoważony, oddany rodzinie, czujny stróż.',
      'fci_coat_b':'Szata i kolory','fci_coat_v':'biała z łatami różnych odcieni..., maska na głowie.',
      'fci_care_b':'Pielęgnacja','fci_care_v':'regularne szczotkowanie, dbałość o stawy i wagę, odpowiednia przestrzeń i ruch.',
      'aboutbreed_note':'Dane bazowe zgodne ze standardem FCI nr 92 i literaturą hodowlaną.',
      'gallery_title':'Galeria zdjęć',
      'feat1_h':'Pochodzenie','feat1_p':'Pełna dokumentacja pochodzenia, umowa kupna-sprzedaży oraz książeczka zdrowia.',
      'feat2_h':'Przejrzystość','feat2_p':'Zarejestrowani, nadzorowani i działający zgodnie z przepisami oraz dobrem zwierząt.',
      'feat3_h':'Kontakt','feat3_p':'Wsparcie i doradztwo przed i po zakupie szczeniaka – zawsze do dyspozycji.',
      'reviews_title':'Wasze opinie',
      'rev1_txt':'„Polecam pod każdym względem. Jesteśmy bardzo zadowoleni :)”','rev1_who':'— Eryk',
      'rev2_txt':'„Profesjonalna hodowla, świetny kontakt i wsparcie po zakupie.”','rev2_who':'— Mikołaj',
      'rev3_txt':'„Jamniczek ma się znakomicie i daje mnóstwo radości.”','rev3_who':'— Grzegorz',
      'reviews_note':'Możemy też wstawić wtyczkę opinii z Google/Trustindex – daj znać, jeśli chcesz.',
      'contact_title':'Dane kontaktowe',
      'c_phone_b':'Telefon','c_mail_b':'E-mail','c_addr_b':'Adres','c_nip_b':'NIP','c_regon_b':'REGON',
      'f_name_l':'Imię i nazwisko','f_email_l':'E-mail','f_msg_l':'Wiadomość','f_submit':'Wyślij',
      'gallery_mother':'Matka',
      'gallery_father':'Tata',
      'gallery_puppies':'Szczeniaki',
      'puppies_only_available':'Pokaż tylko dostępne',
      'status_available':'Dostępny/a',
      'status_reserved':'Zarezerwowany/a',
      'status_sold':'Sprzedany/a',
      'bank_title':'Dane do przelewu',
      'bank_rec_b':'Odbiorca','bank_title_b':'Tytuł','bank_bank_b':'Bank','bank_acct_b':'Numer rachunku','bank_addr_b':'Adres',
      'map_title':'Mapa dojazdu','map_text':'Aby otworzyć mapę w Google, kliknij:','map_btn':'Mapa dojazdu',
      'footer': `© ${new Date().getFullYear()} Psiakowo. Wszelkie prawa zastrzeżone.`
    },
    en: {
      'html@lang':'en',
      'title':'Psiakowo – Pyrenean Mastiff (breeding)',
      'meta_description':'Pyrenean Mastiff kennel — breed info, gallery, reviews, contact & directions.',
      'og_title':'Psiakowo – Pyrenean Mastiff',
      'og_description':'Meet the Pyrenean Mastiff — learn about the breed, browse the gallery and contact us.',
      'nav_about':'About','nav_dogs':'Our dogs','nav_gallery':'Gallery','nav_reviews':'Reviews','nav_contact':'Contact',
      'badge':'Pyrenean Mastiff breeding',
      'hero_title':'Pyrenean Mastiff — a gentle giant with a big heart',
      'hero_lead':'We specialise in the Pyrenean Mastiff breed. We ensure proper socialisation, health and owner support.',
      'cta_breed':'About the breed','cta_contact':'Contact us',
      'about_title':'About us',
      'about_lead':'My name is Agnieszka Sikora and for over eight years I’ve been running the “Psiakowo” kennel with passion. We operate transparently and to the highest welfare standards.',
      'breed_title':'Pyrenean Mastiff',
      'b1_pill':'Temperament','b1_h':'Calm, devoted, vigilant','b1_p':'Balanced and family-oriented; a natural guardian with a gentle nature.',
      'b2_pill':'Grooming','b2_h':'Coat & health','b2_p':'Regular brushing, sensible exercise, joint care and weight control.',
      'b3_pill':'For whom','b3_h':'House with a garden','b3_p':'Best with calm, consistent owners in a home with outdoor space.',
      'aboutbreed_title':'About the breed: Pyrenean Mastiff',
      'fci_origin_b':'Origin','fci_origin_v':'Spain (Aragon); historically a livestock guardian during transhumance.',
      'fci_group_b':'FCI classification','fci_group_v':'Group 2 — Molossers, section 2.2 (no working trial).',
      'fci_height_b':'Height at withers','fci_height_v':'min. 77 cm males, 72 cm females; larger preferred, no upper limit.',
      'fci_char_b':'Character','fci_char_v':'calm, balanced, devoted to family; vigilant guardian.',
      'fci_coat_b':'Coat & colours','fci_coat_v':'white with patches in various shades..., mask on the head.',
      'fci_care_b':'Care','fci_care_v':'regular brushing, joint care and weight control; space and reasonable exercise.',
      'aboutbreed_note':'Base data in line with FCI standard no. 92 and breed literature.',
      'gallery_title':'Photo gallery',
      'feat1_h':'Origin','feat1_p':'Full pedigree documentation, sale agreement and health booklet.',
      'feat2_h':'Transparency','feat2_p':'Registered, supervised and operating according to animal welfare regulations.',
      'feat3_h':'Support','feat3_p':'Advice and support before and after purchase — always available.',
      'reviews_title':'Your reviews',
      'rev1_txt':'“Highly recommended in every respect. We are very satisfied :)”','rev1_who':'— Eryk',
      'rev2_txt':'“Professional kennel, great communication and after-sale support.”','rev2_who':'— Mikołaj',
      'rev3_txt':'“Our little dachshund is doing great and brings us lots of joy.”','rev3_who':'— Grzegorz',
      'reviews_note':'We can also embed Google/Trustindex reviews — let me know if you want that.',
      'contact_title':'Contact details',
      'c_phone_b':'Phone','c_mail_b':'Email','c_addr_b':'Address','c_nip_b':'Tax ID (NIP)','c_regon_b':'REGON',
      'f_name_l':'Full name','f_email_l':'Email','f_msg_l':'Message','f_submit':'Send',
      'bank_title':'Bank transfer details',
      'gallery_mother':'Dam',
      'gallery_father':'Sire',
      'gallery_puppies':'Puppies',
      'puppies_only_available':'Show available only',
      'status_available':'Available',
      'status_reserved':'Reserved',
      'status_sold':'Sold',
      'bank_rec_b':'Recipient','bank_title_b':'Title','bank_bank_b':'Bank','bank_acct_b':'Account number','bank_addr_b':'Address',
      'map_title':'Directions map','map_text':'To open the map in Google, click:','map_btn':'Directions',
      'footer': `© ${new Date().getFullYear()} Psiakowo. All rights reserved.`
    }
  };

  const langBtn = document.getElementById('langToggle');
  const langBtnM = document.getElementById('langToggleMobile');

  const flagSVG = (code) => (
    code === 'pl'
      ? '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><rect width="3" height="2" fill="#fff"/><rect y="1" width="3" height="1" fill="#DC143C"/></svg>'
      : '<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><rect width="60" height="40" fill="#012169"/><path d="M0,0 60,40 M60,0 0,40" stroke="#FFF" stroke-width="8"/><path d="M0,0 60,40 M60,0 0,40" stroke="#C8102E" stroke-width="4"/><rect x="26" width="8" height="40" fill="#FFF"/><rect y="16" width="60" height="8" fill="#FFF"/><rect x="27.5" width="5" height="40" fill="#C8102E"/><rect y="17.5" width="60" height="5" fill="#C8102E"/></svg>'
  );

  function applyLang(lang){
    const d = dict[lang] || dict.pl;

    if (d['html@lang']) document.documentElement.setAttribute('lang', d['html@lang']);

    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const key = el.getAttribute('data-i18n');
      if (!key) return;
      const val = d[key];
      if (typeof val === 'undefined') return;

      const tag = el.tagName.toLowerCase();
      if (tag === 'meta') { el.setAttribute('content', val); }
      else if (tag === 'title') { document.title = val; }
      else { el.textContent = val; }
    });

    const setBtn = (btn, code) => {
      if (!btn) return;
      btn.innerHTML = `<span class="flag">${flagSVG(code)}</span><span class="code">${code.toUpperCase()}</span>`;
    };
    setBtn(langBtn, lang);
    setBtn(langBtnM, lang);

    // po podmianie tekstów odśwież karty szczeniąt (żeby statusy/etykiety były w dobrym języku)
renderPuppies();
    
    try { localStorage.setItem('lang', lang); } catch(e){}
  }

  // initial language
  let saved = null;
  try { saved = localStorage.getItem('lang'); } catch(e){}
  const defaultLang = ((navigator.language || '').toLowerCase().startsWith('pl')) ? 'pl' : 'en';
  let currentLang = saved || defaultLang;
  applyLang(currentLang);

  const toggleLang = ()=>{
    currentLang = (currentLang === 'pl') ? 'en' : 'pl';
    applyLang(currentLang);
  };
  langBtn?.addEventListener('click', toggleLang);
  langBtnM?.addEventListener('click', toggleLang);

  /* ===================== Layout helpers ===================== */
  const setHeaderH = () => {
    const h = document.querySelector('header');
    const hh = h ? Math.round(h.getBoundingClientRect().height) : 72;
    document.documentElement.style.setProperty('--header-h', hh + 'px');
    document.body.style.paddingTop = hh + 'px';
  };
  setHeaderH();
  window.addEventListener('resize', setHeaderH, { passive: true });

  /* ===================== Smooth scroll + mobile menu ===================== */
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileToggle = document.getElementById('mobileToggle');
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#' || href === '#!') return;
      const el = document.querySelector(href);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({behavior:'smooth'});
      }
      if (mobileMenu && mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        mobileToggle?.setAttribute('aria-expanded','false');
        document.body.style.overflow = '';
        const burger = mobileToggle?.querySelector('.icon-burger');
        const closeI = mobileToggle?.querySelector('.icon-close');
        if (burger && closeI) { burger.style.display='inline-flex'; closeI.style.display='none'; }
      }
    });
  });

  // Mobile menu toggle
  if (mobileToggle && mobileMenu) {
    const iconBurger = mobileToggle.querySelector('.icon-burger');
    const iconClose = mobileToggle.querySelector('.icon-close');
    const setIcons = (open) => {
      if(!iconBurger || !iconClose) return;
      iconBurger.style.display = open ? 'none' : 'inline-flex';
      iconClose.style.display = open ? 'inline-flex' : 'none';
    };
    mobileToggle.addEventListener('click', () => {
      const willOpen = !mobileMenu.classList.contains('open');
      mobileMenu.classList.toggle('open', willOpen);
      mobileToggle.setAttribute('aria-expanded', String(willOpen));
      document.body.style.overflow = willOpen ? 'hidden' : '';
      setIcons(willOpen);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded','false');
        document.body.style.overflow = '';
        setIcons(false);
      }
    });
    mobileMenu.addEventListener('click', (e) => {
      if (e.target === mobileMenu) {
        mobileMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded','false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ===================== Lightbox ===================== */
  const overlay = document.createElement('dialog');
  overlay.setAttribute('aria-label','Podgląd zdjęcia');
  Object.assign(overlay.style, { padding: 0, border: 'none', background: 'transparent' });
  overlay.addEventListener('click', () => overlay.close());
  const lbImg = document.createElement('img');
  Object.assign(lbImg.style, {
    maxWidth: 'min(92vw, 1200px)',
    maxHeight: '85vh',
    borderRadius: '14px',
    boxShadow: 'var(--shadow-lg)'
  });
  overlay.appendChild(lbImg);
  document.body.appendChild(overlay);
// LIGHTBOX: działa dla wszystkich obrazów na stronie
(function bindLightboxForAllImages(){
  // 1) Klik na <a> z obrazkiem (preferowane źródło: href)
  document.querySelectorAll('a:has(img):not(.no-lightbox)').forEach(link => {
    link.addEventListener('click', (e) => {
      // pomiń, jeśli link prowadzi gdzieś indziej niż do obrazka
      const href = link.getAttribute('href') || '';
      const isImg = /\.(avif|webp|jpe?g|png|gif|bmp|webm|svg)(\?.*)?$/i.test(href);
      if (!isImg) return; // normalny link – nie wchodzimy

      e.preventDefault();
      const img = link.querySelector('img');
      const full = img?.dataset.full || href; // preferuj data-full, jak masz miniatury
      lbImg.src = full;
      overlay.showModal();
    });
  });

  // 2) Klik na sam <img> bez linka (weź źródło z data-full albo src)
  document.querySelectorAll('img:not(a img)').forEach(img => {
    // opcjonalnie wyklucz elementy UI z klasą .no-lightbox
    if (img.closest('.no-lightbox')) return;

    img.style.cursor = 'default';
    img.setAttribute('role', 'button');
    img.setAttribute('tabindex', '0');
    img.addEventListener('click', () => {
      const full = img.dataset.full || img.currentSrc || img.src;
      lbImg.src = full;
      overlay.showModal();
    });
    // dostępność: Enter/Spacja
    img.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const full = img.dataset.full || img.currentSrc || img.src;
        lbImg.src = full;
        overlay.showModal();
      }
    });
  });
})();

  /* ===================== UI Enhancements ===================== */

  // 1) Sticky header state
  const header = document.querySelector('header');
  const onScrollHeader = () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 6);
  };
  onScrollHeader();
  window.addEventListener('scroll', onScrollHeader, { passive: true });

  // 2) Reveal on scroll (with stagger)
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealTargets = [
    '.h1', '.lead', '.hero-card',
    '.section-title', '.card', '.feature', '.op',
    '.panel', '.gallery a'
  ];
  const toReveal = document.querySelectorAll(revealTargets.join(','));
  toReveal.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.setProperty('--d', `${Math.min(i * 40, 320)}ms`);
  });

  if (!prefersReduced && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-in');
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
    toReveal.forEach(el => io.observe(el));
  } else {
    toReveal.forEach(el => el.classList.add('reveal-in'));
  }

  // 3) Parallax on hero image (foreground)


  // 3b) Parallax background on hero section (true parallax)
  (function setupParallaxBG(){
    const root = document.querySelector('.parallax-hero');
    if (!root || prefersReduced) return;

    let ticking = false;
    const speed = 0.18; // 0.12–0.25

    const update = () => {
      const rect = root.getBoundingClientRect();
      const viewportH = window.innerHeight || document.documentElement.clientHeight;
      const visibleCenter = rect.top + rect.height * 0.5 - viewportH * 0.5;
      const y = Math.max(-60, Math.min(60, -visibleCenter * speed));
      root.style.setProperty('--parallax-y', `${y}px`);
      ticking = false;
    };

    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update, { passive: true });
  })();

  // 4) Magnetic + ripple CTAs
  const makeRipple = (btn, x, y) => {
    const r = document.createElement('span');
    r.className = 'ripple';
    const rect = btn.getBoundingClientRect();
    r.style.left = `${x - rect.left}px`;
    r.style.top = `${y - rect.top}px`;
    btn.appendChild(r);
    r.addEventListener('animationend', () => r.remove());
  };

  document.querySelectorAll('.cta').forEach(btn => {
    if (!btn) return;
    // Magnetic hover
    if (!prefersReduced) {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const mx = e.clientX - rect.left - rect.width / 2;
        const my = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${mx * 0.06}px, ${my * 0.08}px)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    }
    // Ripple
    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.addEventListener('click', (e) => makeRipple(btn, e.clientX, e.clientY));
  });

  // 5) Subtle tilt on cards/features
  const tiltables = document.querySelectorAll('.card, .feature');
  if (!prefersReduced) {
    tiltables.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `rotateX(${(-py * 4)}deg) rotateY(${(px * 4)}deg) translateY(-2px)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
  }

  // 6) Active nav link while scrolling
  const sections = Array.from(document.querySelectorAll('section[id], main#start'));
  const links = Array.from(document.querySelectorAll('.menu a[href^="#"]'));
  const setActive = (id) => {
    links.forEach(a => a.classList.toggle('active',
      a.getAttribute('href') === `#${id}` || (id === 'start' && a.getAttribute('href') === '#start')
    ));
  };
  if ('IntersectionObserver' in window && sections.length && links.length) {
    const navObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id || 'start'); });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0.01 });
    sections.forEach(s => navObs.observe(s));
  }
  
  
});

// ====== DANE SZCZENIĄT (EDYTUJ) ======
const puppiesData = [
  { id:'M1', name:'M1', sex:'pies', status:'available', img:'assets/szczeniaki/m1.jpg' },
  { id:'M2', name:'M2', sex:'pies', status:'reserved',  img:'assets/szczeniaki/m2.jpg' },
  { id:'F1', name:'F1', sex:'suka', status:'sold',      img:'assets/szczeniaki/f1.jpg' },
  { id:'F2', name:'F2', sex:'suka', status:'available', img:'assets/szczeniaki/f2.jpg' },
];

// pomocnicze tłumaczenie w runtime
const t = (key) => (dict[currentLang] && dict[currentLang][key]) || key;

// główny render „Szczeniąt”
function renderPuppies(){
  const grid = document.getElementById('puppiesGrid');
  if(!grid) return;

  const onlyAvail = document.getElementById('onlyAvailable')?.checked;
  const list = puppiesData.filter(p => !onlyAvail || p.status === 'available');

  const statusClass = (s) => `status-pill status-${s}`;
  const statusText  = (s) => ({
    'available': t('status_available'),
    'reserved' : t('status_reserved'),
    'sold'     : t('status_sold')
  }[s] || s);

  grid.innerHTML = list.map(p => {
    const sexLabel = p.sex === 'pies' ? (currentLang === 'en' ? 'male' : 'pies')
                                      : (currentLang === 'en' ? 'female' : 'suka');
    return `
      <article class="card puppy-card" data-id="${p.id}" data-status="${p.status}"
        aria-label="Szczeniak ${p.name} — ${sexLabel}, status: ${statusText(p.status)}">
        <a href="${p.img}">
          <img loading="lazy" src="${p.img}" alt="Szczeniak ${p.name} — ${sexLabel}">
        </a>
        <div class="p">
          <div class="puppy-meta">
            <div class="puppy-name">${p.name} <span style="color:var(--muted); font-weight:600">• ${sexLabel}</span></div>
            <span class="${statusClass(p.status)}">${statusText(p.status)}</span>
          </div>
        </div>
      </article>
    `;
  }).join('');

  // lightbox już masz globalny – tylko podpinamy kliknięcia dla świeżo wstrzykniętych <a>
  try {
    const overlay = document.querySelector('dialog');
    const lbImg = overlay?.querySelector('img');
    document.querySelectorAll('#puppiesGrid a').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href') || '';
        const isImg = /\.(avif|webp|jpe?g|png|gif|bmp|webm|svg)(\?.*)?$/i.test(href);
        if (!isImg) return;
        if (overlay && lbImg) {
          e.preventDefault();
          lbImg.src = href;
          overlay.showModal();
        }
      });
    });
  } catch(_){}
}
