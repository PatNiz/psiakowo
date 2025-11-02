// assets/app.js — wersja kompatybilna: lokalnie, IntelliJ 63342, Python http.server, GitHub Pages (repo albo custom domain)
(() => {
    'use strict';

    /* ---------- Wykrywanie języka z URL ---------- */
    const LANGS = ['pl', 'en'];
    const path = location.pathname;
    const langMatch = path.match(/(?:^|\/)(pl|en)(?=\/|$)/);
    const currentLang = langMatch ? langMatch[1] : 'en';
    const targetLang  = currentLang === 'pl' ? 'en' : 'pl';

    /* ---------- Przycisk języka pokazuje język DOCZELOWY ---------- */
    const flagSVG = (code) => (
        code === 'pl'
            ? '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><rect width="3" height="2" fill="#fff"/><rect y="1" width="3" height="1" fill="#DC143C"/></svg>'
            : '<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><rect width="60" height="40" fill="#012169"/><path d="M0,0 60,40 M60,0 0,40" stroke="#FFF" stroke-width="8"/><path d="M0,0 60,40 M60,0 0,40" stroke="#C8102E" stroke-width="4"/><rect x="26" width="8" height="40" fill="#FFF"/><rect y="16" width="60" height="8" fill="#FFF"/><rect x="27.5" width="5" height="40" fill="#C8102E"/><rect y="17.5" width="60" height="5" fill="#C8102E"/></svg>'
    );

    const langBtn  = document.getElementById('langToggle');
    const langBtnM = document.getElementById('langToggleMobile');

    const paintBtn = (btn, code) => {
        if (!btn) return;
        btn.innerHTML = `<span class="flag">${flagSVG(code)}</span><span class="code">${code.toUpperCase()}</span>`;
    };
    paintBtn(langBtn,  targetLang);
    paintBtn(langBtnM, targetLang);

    /* ---------- Przełączanie języka – podmień TYLKO segment /pl|en/ ---------- */
    function switchTo(lang) {
        try { localStorage.setItem('lang', lang); } catch(e) {}

        // 1) najpierw spróbuj podmienić istniejący segment /pl|en/
        const m = location.pathname.match(/^(.*?)(?:\/(pl|en))(\/.*)?$/);
        if (m) {
            const prefix = m[1] || '';             // np. "", "/repo" (na GitHub Pages repo)
            const rest   = m[3] || '/index.html';  // reszta ścieżki
            const newPath = `${prefix}/${lang}${rest}`;
            location.href = newPath + location.search + location.hash;
            return;
        }

        // 2) jeśli nie ma segmentu -> dorzuć /lang na końcu prefixu (obsługa root i GH Pages repo)
        // Na GitHub Pages (repo) pierwszym segmentem bywa /repo-name, więc nie korzystamy z bezwzględnego '/'
        const parts = location.pathname.split('/').filter(Boolean);
        let prefix = '';
        if (location.hostname.endsWith('.github.io') && parts.length) {
            // username.github.io/repo → prefix to "/repo"
            prefix = '/' + parts[0];
        }
        const newPath = `${prefix}/${lang}/index.html`;
        location.href = newPath + location.search + location.hash;
    }

    const toggleLang = () => switchTo(targetLang);
    langBtn?.addEventListener('click', toggleLang);
    langBtnM?.addEventListener('click', toggleLang);

    /* ---------- Teksty statusów / płci ---------- */
    const STR = {
        lang: currentLang,
        male:    currentLang === 'pl' ? 'pies'   : 'male',
        female:  currentLang === 'pl' ? 'suka'   : 'female',
        available: currentLang === 'pl' ? 'Dostępny/a' : 'Available',
        reserved:  currentLang === 'pl' ? 'Zarezerwowany/a' : 'Reserved',
        sold:      currentLang === 'pl' ? 'Sprzedany/a' : 'Sold'
    };

    const textStatus = (s) => ({
        available: STR.available,
        reserved : STR.reserved,
        sold     : STR.sold
    }[s] || s);

    const textSex = (sexPL) => {
        if (currentLang === 'pl') return sexPL;            // 'pies' / 'suka'
        return sexPL === 'pies' ? STR.male : STR.female;   // EN
    };

    /* ---------- Dane szczeniąt (RELATYWNE ścieżki od /en/ lub /pl/) ---------- */
    // Jesteśmy w /en/… lub /pl/…, więc do assets idziemy poziom wyżej: "../assets/…"
    const A = '..'; // katalog wyżej względem /en/ i /pl/
    const puppiesData = [
        { id:'B1', name:'Black',      sex:'pies',   status:'available', imgs:[`${A}/assets/szczeniaki/Black1.jpg`,`${A}/assets/szczeniaki/Black2.jpg`]},
        { id:'B2', name:'Blue',       sex:'pies',   status:'reserved',  imgs:[`${A}/assets/szczeniaki/Blue1.jpg`, `${A}/assets/szczeniaki/Blue2.jpg`]},
        { id:'G1', name:'Green',      sex:'suka',   status:'available', imgs:[`${A}/assets/szczeniaki/Green1.jpg`,`${A}/assets/szczeniaki/Green2.jpg`]},
        { id:'LB1',name:'Light Blue', sex:'suka',   status:'available', imgs:[`${A}/assets/szczeniaki/LightBlue1.jpg`,`${A}/assets/szczeniaki/LightBlue2.jpg`]},
        { id:'O1', name:'Orange',     sex:'suka',   status:'available', imgs:[`${A}/assets/szczeniaki/Orange1.jpg`,`${A}/assets/szczeniaki/Orange2.jpg`]},
        { id:'P1', name:'Pink',       sex:'suka',   status:'available', imgs:[`${A}/assets/szczeniaki/Pink1.jpg`,`${A}/assets/szczeniaki/Pink2.jpg`]},
        { id:'R1', name:'Red',        sex:'suka',   status:'available', imgs:[`${A}/assets/szczeniaki/Red1.jpg`,`${A}/assets/szczeniaki/Red2.jpg`]},
        { id:'Y1', name:'Yellow',     sex:'suka',   status:'available', imgs:[`${A}/assets/szczeniaki/Yellow1.jpg`,`${A}/assets/szczeniaki/Yellow2.jpg`]}
    ];

    /* ---------- Render kart szczeniąt ---------- */
    function renderPuppies(){
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
                if (Math.abs(dx) > THRESH) { const dir = dx < 0 ? +1 : -1; show(Number(slider.dataset.current||0) + dir); suppressClick = true; setTimeout(()=> suppressClick = false, 120); }
                dx = 0; try { area?.releasePointerCapture?.(e.pointerId ?? 0); } catch(_){}
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

    /* ---------- Lightbox dialog (wspólny) ---------- */
    if (!document.querySelector('dialog')) {
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
        overlay.addEventListener('close', () => {
            document.documentElement.classList.remove('lb-open');
        });
    }

    /* ---------- Header / menu ---------- */
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

    // Smooth scroll
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
