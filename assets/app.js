/* =========================================================
 * assets/app.js — EN/PL/ES flags, global lightbox (blur),
 * puppies slider, mobile menu, smooth scroll, reveal/tilt/parallax
 * ========================================================= */
(() => {
    'use strict';

    /* ----------------- Helpers ----------------- */
    const $  = (q, r=document) => r.querySelector(q);
    const $$ = (q, r=document) => Array.from(r.querySelectorAll(q));

    /* ----------------- Language ----------------- */
    const LANGS = ['en','pl','es'];
    const sanitizeLang = l => LANGS.includes(l) ? l : 'en';

    const pathLangFromURL =
        location.pathname.startsWith('/pl/') ? 'pl' :
            location.pathname.startsWith('/es/') ? 'es' :
                location.pathname.startsWith('/en/') ? 'en' : null;

    let savedLang = null;
    try { savedLang = localStorage.getItem('lang') || null; } catch(_){}

    let currentLang = sanitizeLang(pathLangFromURL || savedLang || 'en');

    function switchTo(lang){
        lang = sanitizeLang(lang);
        try { localStorage.setItem('lang', lang); } catch(_){}
        // Usuń wiodący prefix językowy z bieżącej ścieżki i zbuduj nową
        let base = location.pathname.replace(/^\/(en|pl|es)(?=\/|$)/,'');
        const last = base.split('/').pop() || '';
        const isFile = /\.[a-z0-9]+$/i.test(last);
        if (!base) base = '/';
        if (!isFile && !base.endsWith('/')) base += '/';
        const cleanQuery = location.search.replace(/([?&])lang=(en|pl|es)\b/gi,'$1').replace(/[?&]$/,'');
        location.href = `/${lang}${base}` + cleanQuery + location.hash;
    }

    /* ----------------- Flags (desktop + mobile mounts) ----------------- */
    (function initFlags(){
        const mounts = ['langFlags','langFlagsMobile'].map(id => document.getElementById(id)).filter(Boolean);
        if (!mounts.length) return;

        const flagSVG = (code) => {
            if (code === 'pl')
                return '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect width="3" height="2" fill="#fff"/><rect y="1" width="3" height="1" fill="#DC143C"/></svg>';
            if (code === 'es')
                return '<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect width="3" height="2" fill="#AA151B"/><rect y="0.5" width="3" height="1" fill="#F1BF00"/></svg>';
            // en -> UK styl
            return '<svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect width="60" height="40" fill="#012169"/><path d="M0,0 60,40 M60,0 0,40" stroke="#FFF" stroke-width="8"/><path d="M0,0 60,40 M60,0 0,40" stroke="#C8102E" stroke-width="4"/><rect x="26" width="8" height="40" fill="#FFF"/><rect y="16" width="60" height="8" fill="#FFF"/><rect x="27.5" width="5" height="40" fill="#C8102E"/><rect y="17.5" width="60" height="5" fill="#C8102E"/></svg>';
        };

        const makeButtons = () => LANGS
            .map(l => `<button type="button" class="flag-btn" data-lang="${l}" aria-label="${l.toUpperCase()}">${flagSVG(l)}</button>`)
            .join('');

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
                switchTo(lang);
            });
        });
    })();

    /* ----------------- Global lightbox with blur ----------------- */
    (function initLightbox(){
        let overlay = document.querySelector('dialog.lb');
        if (!overlay) {
            overlay = document.createElement('dialog');
            overlay.className = 'lb';
            const img = document.createElement('img');
            overlay.appendChild(img);
            document.body.appendChild(overlay);
        }
        const imgEl = overlay.querySelector('img');

        const open = (src) => {
            imgEl.src = src;
            overlay.showModal();
            document.documentElement.classList.add('lb-open');
        };
        const close = () => {
            overlay.close();
            document.documentElement.classList.remove('lb-open');
        };

        overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
        overlay.addEventListener('cancel', (e) => { e.preventDefault(); close(); });

        // <a href="...jpg|png|..."> (bez .no-lightbox) -> lightbox
        document.addEventListener('click', (e) => {
            const a = e.target.closest('a');
            if (!a) return;
            const href = a.getAttribute('href') || '';
            if (/\.(avif|webp|jpe?g|png|gif|bmp|svg)(\?.*)?$/i.test(href) && !a.classList.contains('no-lightbox')) {
                e.preventDefault();
                open(a.querySelector('img')?.dataset?.full || href);
            }
        });
        // Sam <img> (bez linka) też otwiera
        document.addEventListener('click', (e) => {
            const img = e.target.closest('img');
            if (!img || img.closest('a') || img.closest('.no-lightbox')) return;
            open(img.dataset?.full || img.currentSrc || img.src);
        });

        // globalnie do użytku w sliderze
        window.openLightbox = open;
    })();

    /* ----------------- Puppies text labels ----------------- */
    const STR_BY_LANG = {
        en: { male:'male', female:'female', available:'Available', reserved:'Reserved', sold:'Sold' },
        pl: { male:'pies', female:'suka',   available:'Dostępny/a', reserved:'Zarezerwowany/a', sold:'Sprzedany/a' },
        es: { male:'macho',female:'hembra', available:'Disponible', reserved:'Reservado/a',     sold:'Vendido/a' }
    };
    const strFor = () => (STR_BY_LANG[currentLang] || STR_BY_LANG.en);
    const textStatus = (s) => ({ available: strFor().available, reserved: strFor().reserved, sold: strFor().sold }[s] || s);
    const textSex    = (sexPL) => (currentLang === 'pl' ? sexPL : (sexPL === 'pies' ? strFor().male : strFor().female));

    /* ----------------- Puppies data ----------------- */
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

    /* ----------------- Puppies renderer/slider ----------------- */
    function renderPuppies(){
        const grid = document.getElementById('puppiesGrid');
        if (!grid) return;

        const onlyAvail = document.getElementById('onlyAvailable')?.checked;
        const list = puppiesData.filter(p => !onlyAvail || p.status === 'available');

        grid.innerHTML = list.map(p => {
            const sexLabel = textSex(p.sex);
            const imgs = (p.imgs || []).filter(Boolean);
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
      <div class="puppy-name">${p.name || ''} <span style="color:var(--muted);font-weight:600">• ${sexLabel}</span></div>
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
            const imgEl  = $('.puppy-img', slider);
            const linkEl = $('.puppy-link', slider);
            if (imgEl)  imgEl.src  = srcs[newIdx];
            if (linkEl) linkEl.href = srcs[newIdx];
            slider.dataset.current = String(newIdx);
            $$('.puppy-dot', slider).forEach((d,i)=> d.classList.toggle('active', i===newIdx));
        };

        const sliders = $$('.puppy-slider', grid);
        sliders.forEach(slider => {
            const prev  = $('.puppy-prev', slider);
            const next  = $('.puppy-next', slider);
            const area  = $('.puppy-link', slider);
            const imgEl = $('.puppy-img', slider);
            const show  = (i) => showSlide(slider, i);

            prev?.addEventListener('click', (e)=>{ e.preventDefault(); show(Number(slider.dataset.current||0)-1); });
            next?.addEventListener('click', (e)=>{ e.preventDefault(); show(Number(slider.dataset.current||0)+1); });

            $$('.puppy-dot', slider).forEach(dot=>{
                dot.addEventListener('click', (e)=>{ e.preventDefault(); show(Number(dot.dataset.idx||0)); });
            });

            // Drag/swipe
            let startX = 0, dx = 0, dragging = false, suppressClick = false;
            const THRESH = 40;

            const onPointerDown = (e) => {
                e.preventDefault();
                dragging = true; dx = 0;
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
                dx = 0; try { area?.releasePointerCapture?.(e.pointerId ?? 0); } catch(_){}
            };

            area?.addEventListener('pointerdown', onPointerDown, { passive:false });
            area?.addEventListener('pointermove', onPointerMove,  { passive:false });
            area?.addEventListener('pointerup',   onPointerUp,    { passive:false });
            area?.addEventListener('pointercancel', onPointerUp,  { passive:false });
            area?.addEventListener('pointerleave',  (e)=>{ if (dragging) onPointerUp(e); }, { passive:false });

            // Click -> lightbox
            area?.addEventListener('click', (e) => {
                if (suppressClick) { e.preventDefault(); e.stopPropagation(); return; }
                const href = area.getAttribute('href') || '';
                if (/\.(avif|webp|jpe?g|png|gif|bmp|svg)(\?.*)?$/i.test(href)) {
                    e.preventDefault();
                    window.openLightbox?.(href);
                }
            }, true);

            // Wheel/trackpad
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

            // Keyboard
            area?.addEventListener('keydown', (e)=>{
                if (e.key === 'ArrowLeft')  { e.preventDefault(); show(Number(slider.dataset.current||0)-1); }
                if (e.key === 'ArrowRight') { e.preventDefault(); show(Number(slider.dataset.current||0)+1); }
            });

            show(Number(slider.dataset.current||0));
        });
    }

    document.getElementById('onlyAvailable')?.addEventListener('change', renderPuppies);
    renderPuppies();

    /* ----------------- Header height & mobile menu ----------------- */
    const setHeaderH = () => {
        const h = $('header');
        const hh = h ? Math.round(h.getBoundingClientRect().height) : 72;
        document.documentElement.style.setProperty('--header-h', hh + 'px');
        document.body.style.paddingTop = hh + 'px';
    };
    setHeaderH();
    window.addEventListener('resize', setHeaderH, { passive:true });

    const mobileMenu   = $('#mobileMenu');
    const mobileToggle = $('#mobileToggle');
    if (mobileToggle && mobileMenu) {
        const iconBurger = $('.icon-burger', mobileToggle);
        const iconClose  = $('.icon-close',  mobileToggle);
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
                setIcons(false);
            }
        });
    }

    /* ----------------- Smooth scroll for internal anchors ----------------- */
    $$('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            const href = a.getAttribute('href');
            if (!href || href === '#' || href === '#!') return;
            const el = $(href);
            if (el) { e.preventDefault(); el.scrollIntoView({behavior:'smooth'}); }
            if (mobileMenu && mobileMenu.classList.contains('open')) {
                mobileMenu.classList.remove('open');
                mobileToggle?.setAttribute('aria-expanded','false');
                document.body.style.overflow = '';
                const b = $('.icon-burger', mobileToggle);
                const c = $('.icon-close',  mobileToggle);
                if (b && c) { b.style.display='inline-flex'; c.style.display='none'; }
            }
        });
    });

    /* ----------------- Reveal / Parallax / Tilt niceties ----------------- */
    const header = $('header');
    const onScrollHeader = () => { header?.classList.toggle('scrolled', window.scrollY > 6); };
    onScrollHeader();
    window.addEventListener('scroll', onScrollHeader, { passive:true });

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealTargets = ['.h1','.lead','.hero-card','.section-title','.card','.feature','.op','.panel','.gallery a'];
    const toReveal = $$(revealTargets.join(','));
    toReveal.forEach((el,i)=>{ el.classList.add('reveal'); el.style.setProperty('--d', `${Math.min(i*40, 320)}ms`); });
    if (!prefersReduced && 'IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries, obs)=>{
            entries.forEach(en => { if (en.isIntersecting){ en.target.classList.add('reveal-in'); obs.unobserve(en.target); } });
        }, { rootMargin:'0px 0px -10% 0px', threshold:0.08 });
        toReveal.forEach(el=> io.observe(el));
    } else {
        toReveal.forEach(el=> el.classList.add('reveal-in'));
    }

    (function parallaxHero(){
        const root = $('.parallax-hero');
        if (!root || prefersReduced) return;
        let ticking = false;
        const speed = 0.18;
        const update = () => {
            const rect = root.getBoundingClientRect();
            const vh = innerHeight || document.documentElement.clientHeight;
            const visibleCenter = rect.top + rect.height*0.5 - vh*0.5;
            const y = Math.max(-60, Math.min(60, -visibleCenter*speed));
            root.style.setProperty('--parallax-y', `${y}px`);
            ticking = false;
        };
        const onScroll = ()=>{ if(!ticking){ ticking=true; requestAnimationFrame(update);} };
        update();
        window.addEventListener('scroll', onScroll, { passive:true });
        window.addEventListener('resize', update, { passive:true });
    })();

    (function tiltCards(){
        if (prefersReduced) return;
        $$('.card:not(.puppy-card), .feature').forEach(el=>{
            el.addEventListener('mousemove', (e)=>{
                const r = el.getBoundingClientRect();
                const px = (e.clientX - r.left)/r.width - 0.5;
                const py = (e.clientY - r.top)/r.height - 0.5;
                el.style.transform = `rotateX(${(-py*4)}deg) rotateY(${(px*4)}deg) translateY(-2px)`;
            });
            el.addEventListener('mouseleave', ()=>{ el.style.transform=''; });
        });
    })();

    (function ctaRipple(){
        const makeRipple = (btn, x, y) => {
            const r = document.createElement('span');
            r.className = 'ripple';
            const rect = btn.getBoundingClientRect();
            r.style.left = `${x - rect.left}px`;
            r.style.top  = `${y - rect.top}px`;
            btn.appendChild(r);
            r.addEventListener('animationend', ()=> r.remove());
        };
        $$('.cta').forEach(btn=>{
            btn.style.position='relative'; btn.style.overflow='hidden';
            if (!prefersReduced) {
                btn.addEventListener('mousemove', (e)=>{
                    const r = btn.getBoundingClientRect();
                    const mx = e.clientX - r.left - r.width/2;
                    const my = e.clientY - r.top  - r.height/2;
                    btn.style.transform = `translate(${mx*0.06}px, ${my*0.08}px)`;
                });
                btn.addEventListener('mouseleave', ()=>{ btn.style.transform=''; });
            }
            btn.addEventListener('click', (e)=> makeRipple(btn, e.clientX, e.clientY));
        });
    })();

})();
