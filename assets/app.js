// assets/app.js  — EN / PL / ES + dropdown .lang-dd z flagami (SVG) + fallback <select>
/* === 3 FLAGS LANGUAGE SWITCH === */
(function initLangFlags(){
    // montaże: desktop + mobile (opcjonalny)
    const mounts = [document.getElementById('langFlags'), document.getElementById('langFlagsMobile')].filter(Boolean);
    if (!mounts.length) return;

    const langs = ['en','pl','es'];

    const flagSVG = (code) => {
        if (code === 'pl') {
            return '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><rect width="3" height="2" fill="#fff"/><rect y="1" width="3" height="1" fill="#DC143C"/></svg>';
        }
        if (code === 'es') {
            return '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><rect width="3" height="2" fill="#AA151B"/><rect y="0.5" width="3" height="1" fill="#F1BF00"/></svg>';
        }
        // en (UK style)
        return '<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><rect width="60" height="40" fill="#012169"/><path d="M0,0 60,40 M60,0 0,40" stroke="#FFF" stroke-width="8"/><path d="M0,0 60,40 M60,0 0,40" stroke="#C8102E" stroke-width="4"/><rect x="26" width="8" height="40" fill="#FFF"/><rect y="16" width="60" height="8" fill="#FFF"/><rect x="27.5" width="5" height="40" fill="#C8102E"/><rect y="17.5" width="60" height="5" fill="#C8102E"/></svg>';
    };

    const makeButtons = () =>
        langs.map(l => `<button type="button" class="flag-btn" data-lang="${l}" aria-label="${l.toUpperCase()}">${flagSVG(l)}</button>`).join('');

    const markActive = (root) => {
        root.querySelectorAll('.flag-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === currentLang);
        });
    };

    mounts.forEach(root => {
        root.innerHTML = makeButtons();
        markActive(root);

        root.addEventListener('click', (e) => {
            const btn = e.target.closest('.flag-btn');
            if (!btn || !root.contains(btn)) return;
            const lang = btn.getAttribute('data-lang');
            if (!lang || lang === currentLang) return;
            // zapis w localStorage i bezpieczny redirect z zachowaniem ścieżki / hash / query (bez ?lang=)
            switchTo(lang);
        });
    });
})();

(() => {
    'use strict';

    /* =========================
     *  DETEKCJA JĘZYKA
     *  Priorytet: URL (/en|/pl|/es) > localStorage > 'en'
     * ========================= */
    const pathLangFromURL =
        location.pathname.startsWith('/pl/') ? 'pl' :
            location.pathname.startsWith('/es/') ? 'es' :
                location.pathname.startsWith('/en/') ? 'en' : null;

    let saved;
    try { saved = localStorage.getItem('lang'); } catch(e) { saved = null; }

    const LANGS = ['en','pl','es'];
    const sanitizeLang = (l) => (LANGS.includes(l) ? l : 'en');
    const currentLang = sanitizeLang(pathLangFromURL || saved || 'en');

    function switchTo(lang) {
        lang = sanitizeLang(lang);
        try { localStorage.setItem('lang', lang); } catch(e){}

        // usuń wiodący /en|pl|es z bieżącej ścieżki i przypnij nowy prefix
        const base = location.pathname.replace(/^\/(en|pl|es)(?=\/|$)/, '');
        const newPath = `/${lang}${base.endsWith('/') ? base : base + '/'}`;

        // wyczyść ewentualny ?lang=...
        const cleanQuery = location.search
            .replace(/([?&])lang=(en|pl|es)\b/gi, '$1')
            .replace(/[?&]$/, '');

        location.href = newPath + cleanQuery + location.hash;
    }




    /* =========================
     *  FALLBACK: <select id="langSelect"> / #langSelectMobile
     * ========================= */
    (function initSelectFallback() {
        const dd  = document.getElementById('langSelect');
        const ddM = document.getElementById('langSelectMobile');
        if (!dd && !ddM) return;

        const decorateOptions = (select) => {
            if (!select) return;
            Array.from(select.options).forEach(opt => {
                const v = sanitizeLang(opt.value);
                opt.value = v;
                // Uwaga: SVG w <option> się nie wyświetli — zostawiamy czysty kod języka
                opt.textContent = v.toUpperCase();
            });
        };
        decorateOptions(dd);
        decorateOptions(ddM);

        if (dd)  dd.value  = currentLang;
        if (ddM) ddM.value = currentLang;

        const sync = (lng) => {
            if (dd  && dd.value  !== lng) dd.value  = lng;
            if (ddM && ddM.value !== lng) ddM.value = lng;
            switchTo(lng);
        };
        dd?.addEventListener('change',  e => sync(e.target.value));
        ddM?.addEventListener('change', e => sync(e.target.value));
    })();

    /* =========================
     *  TEKSTY (etykiety do kart)
     * ========================= */
    const STR_BY_LANG = {
        en: { male:'male',   female:'female',   available:'Available',     reserved:'Reserved',        sold:'Sold' },
        pl: { male:'pies',   female:'suka',     available:'Dostępny/a',    reserved:'Zarezerwowany/a', sold:'Sprzedany/a' },
        es: { male:'macho',  female:'hembra',   available:'Disponible',    reserved:'Reservado/a',     sold:'Vendido/a' }
    };
    const STR = STR_BY_LANG[currentLang] || STR_BY_LANG.en;

    const textStatus = (s) => ({ available: STR.available, reserved: STR.reserved, sold: STR.sold }[s] || s);
    const textSex = (sexPL) => {
        // w danych: 'pies' / 'suka'
        if (currentLang === 'pl') return sexPL;
        return sexPL === 'pies' ? STR.male : STR.female;
    };

    /* =========================
     *  DANE SZCZENIĄT (absolutne ścieżki do /assets)
     * ========================= */
    const puppiesData = [
        { id:'B1', name:'Black',      sex:'pies',   status:'available', imgs:['/assets/szczeniaki/Black1.jpg','/assets/szczeniaki/Black2.jpg']},
        { id:'B2', name:'Blue',       sex:'pies',   status:'reserved',  imgs:['/assets/szczeniaki/Blue1.jpg','/assets/szczeniaki/Blue2.jpg']},
        { id:'G1', name:'Green',      sex:'suka',   status:'available', imgs:['/assets/szczeniaki/Green1.jpg','/assets/szczeniaki/Green2.jpg']},
        { id:'LB1',name:'Light Blue', sex:'suka',   status:'available', imgs:['/assets/szczeniaki/LightBlue1.jpg','/assets/szczeniaki/LightBlue2.jpg']},
        { id:'O1', name:'Orange',     sex:'suka',   status:'available', imgs:['/assets/szczeniaki/Orange1.jpg','/assets/szczeniaki/Orange2.jpg']},
        { id:'P1', name:'Pink',       sex:'suka',   status:'available', imgs:['/assets/szczeniaki/Pink1.jpg','/assets/szczeniaki/Pink2.jpg']},
        { id:'R1', name:'Red',        sex:'suka',   status:'available', imgs:['/assets/szczeniaki/Red1.jpg','/assets/szczeniaki/Red2.jpg']},
        { id:'Y1', name:'Yellow',     sex:'suka',   status:'available', imgs:['/assets/szczeniaki/Yellow1.jpg','/assets/szczeniaki/Yellow2.jpg']}
    ];

    /* =========================
     *  RENDER KART SZCZENIĄT
     * ========================= */
    function renderPuppies() {
        const grid = document.getElementById('puppiesGrid');
        if(!grid) return;

        const onlyAvail = document.getElementById('onlyAvailable')?.checked;
        const list = (Array.isArray(puppiesData) ? puppiesData : []).filter(p => !onlyAvail || p.status === 'available');

        grid.innerHTML = list.map(p => {
            const sexLabel = textSex(p.sex);
            const imgs = Array.isArray(p.imgs) ? p.imgs.filter(Boolean) : (p.img ? [p.img] : []);
            const hasMany = imgs.length > 1;
            const src0 = imgs[0] || '';
            const srcsAttr = imgs.join('|');
            const dots = imgs.map((_,i)=>`<button class="puppy-dot${i===0?' active':''}" data-idx="${i}" aria-label="slide ${i+1}"></button>`).join('');
            return `
<article class="card puppy-card" data-id="${p.id || ''}" data-status="${p.status || ''}">
  <div class="puppy-slider" data-srcs="${srcsAttr}" data-current="0">
    <a class="puppy-link" href="${src0}">
      <img class="puppy-img" loading="lazy" src="${src0}" alt="Puppy ${p.name || ''} — ${sexLabel}">
    </a>
    <button class="puppy-prev" aria-label="Prev" ${hasMany?'':'hidden'}>‹</button>
    <button class="puppy-next" aria-label="Next" ${hasMany?'':'hidden'}>›</button>
    <div class="puppy-dots" ${hasMany?'':'hidden'}>${dots}</div>
  </div>
  <div class="p">
    <div class="puppy-meta">
      <div class="puppy-name">${p.name || ''} <span style="color:var(--muted); font-weight:600">• ${sexLabel}</span></div>
      <span class="status-pill status-${p.status}">${textStatus(p.status)}</span>
    </div>
  </div>
</article>`;
        }).join('');

        const showSlide = (slider, idx) => {
            const srcs = (slider.dataset.srcs || '').split('|').filter(Boolean);
            if (!srcs.length) return;
            const n = srcs.length;
            const newIdx = ((idx % n) + n) % n;
            const imgEl = slider.querySelector('.puppy-img');
            const linkEl = slider.querySelector('.puppy-link');
            if (imgEl) imgEl.src = srcs[newIdx];
            if (linkEl) linkEl.href = srcs[newIdx];
            slider.dataset.current = String(newIdx);
            slider.querySelectorAll('.puppy-dot').forEach((d,i)=> d.classList.toggle('active', i===newIdx));
        };

        const overlay = document.querySelector('dialog');
        const lbImg = overlay?.querySelector('img');
        const openLB = (src) => {
            if (overlay && lbImg) { lbImg.src = src; overlay.showModal(); }
            else { window.open(src, '_blank', 'noopener'); }
        };

        const sliders = grid.querySelectorAll('.puppy-slider');
        sliders.forEach(slider => {
            const prev = slider.querySelector('.puppy-prev');
            const next = slider.querySelector('.puppy-next');
            const area = slider.querySelector('.puppy-link');
            const imgEl = slider.querySelector('.puppy-img');
            const show = (i) => showSlide(slider, i);

            prev?.addEventListener('click', (e)=>{ e.preventDefault(); show(Number(slider.dataset.current||0)-1); });
            next?.addEventListener('click', (e)=>{ e.preventDefault(); show(Number(slider.dataset.current||0)+1); });

            slider.querySelectorAll('.puppy-dot').forEach(dot=>{
                dot.addEventListener('click', (e)=>{ e.preventDefault(); show(Number(dot.dataset.idx||0)); });
            });

            let startX = 0, dx = 0, dragging = false, suppressClick = false;
            const THRESH = 40;
            const onPointerDown = (e) => {
                e.preventDefault(); dragging = true; dx = 0;
                startX = e.clientX ?? (e.touches?.[0]?.clientX) ?? 0;
                slider.classList.add('dragging'); area?.setPointerCapture?.(e.pointerId ?? 0);
                if (imgEl) imgEl.draggable = false;
            };
            const onPointerMove = (e) => { if (!dragging) return; const x = e.clientX ?? (e.touches?.[0]?.clientX) ?? startX; dx = x - startX; };
            const onPointerUp   = (e) => {
                if (!dragging) return; dragging = false; slider.classList.remove('dragging');
                if (Math.abs(dx) > THRESH) {
                    const dir = dx < 0 ? +1 : -1;
                    show(Number(slider.dataset.current||0) + dir);
                    suppressClick = true; setTimeout(()=> suppressClick = false, 120);
                }
                dx = 0; try { area?.releasePointerCapture?.(e.pointerId ?? 0); } catch(_) {}
            };
            area?.addEventListener('pointerdown', onPointerDown, { passive:false });
            area?.addEventListener('pointermove', onPointerMove,  { passive:false });
            area?.addEventListener('pointerup',   onPointerUp,    { passive:false });
            area?.addEventListener('pointercancel', onPointerUp,  { passive:false });
            area?.addEventListener('pointerleave',  (e)=>{ if (dragging) onPointerUp(e); }, { passive:false });

            area?.addEventListener('click', (e) => {
                if (suppressClick) { e.preventDefault(); e.stopPropagation(); }
                else {
                    const href = area.getAttribute('href') || '';
                    if (/\.(avif|webp|jpe?g|png|gif|bmp|webm|svg)(\?.*)?$/i.test(href)) { e.preventDefault(); openLB(href); }
                }
            }, true);

            let wheelLock = false;
            slider.addEventListener('wheel', (e) => {
                if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
                if (wheelLock) return;
                const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
                if (Math.abs(delta) < 10) return;
                e.preventDefault(); wheelLock = true;
                const dir = delta > 0 ? +1 : -1;
                show(Number(slider.dataset.current||0) + dir);
                setTimeout(()=> wheelLock = false, 220);
            }, { passive:false });

            area?.addEventListener('keydown', (e)=>{
                if (e.key === 'ArrowLeft')  { e.preventDefault(); show(Number(slider.dataset.current||0)-1); }
                if (e.key === 'ArrowRight') { e.preventDefault(); show(Number(slider.dataset.current||0)+1); }
            });

            show(Number(slider.dataset.current||0));
        });
    }

    document.getElementById('onlyAvailable')?.addEventListener('change', renderPuppies);
    renderPuppies();

    /* =========================
     *  LIGHTBOX (wspólny <dialog>)
     * ========================= */
    if (!document.querySelector('dialog')) {
        const overlay = document.createElement('dialog');
        overlay.setAttribute('aria-label','Image preview');
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
        overlay.addEventListener('close', () => {
            document.documentElement.classList.remove('lb-open');
        });
    }

    /* =========================
     *  HEADER / MOBILE MENU
     * ========================= */
    const setHeaderH = () => {
        const h = document.querySelector('header');
        const hh = h ? Math.round(h.getBoundingClientRect().height) : 72;
        document.documentElement.style.setProperty('--header-h', hh + 'px');
        document.body.style.paddingTop = hh + 'px';
    };
    setHeaderH();
    window.addEventListener('resize', setHeaderH, { passive: true });

    const mobileMenu = document.getElementById('mobileMenu');
    const mobileToggle = document.getElementById('mobileToggle');
    if (mobileToggle && mobileMenu) {
        const iconBurger = mobileToggle.querySelector('.icon-burger');
        const iconClose  = mobileToggle.querySelector('.icon-close');
        const setIcons = (open) => {
            if(!iconBurger || !iconClose) return;
            iconBurger.style.display = open ? 'none' : 'inline-flex';
            iconClose.style.display  = open ? 'inline-flex' : 'none';
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

    /* =========================
     *  SMOOTH SCROLL (linki #hash)
     * ========================= */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            const href = a.getAttribute('href');
            if (!href || href === '#' || href === '#!') return;
            const el = document.querySelector(href);
            if (el) { e.preventDefault(); el.scrollIntoView({behavior:'smooth'}); }
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

})();
