// app.js
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
            'about_lead':'Nazywamy się Manuel i Jolanta i  prowadzimy z pasją hodowlę „Psiakowo”. Działamy zgodnie z przepisami, zapewniając przejrzystość i najwyższe standardy opieki.',
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
            'gallery_mother':'Matka Xoia',
            'gallery_father':'Tata Max',
            'gallery_puppies':'Szczeniaki',
            'puppies_only_available':'Pokaż tylko dostępne',
            'status_available':'Dostępny/a',
            'status_reserved':'Zarezerwowany/a',
            'status_sold':'Sprzedany/a',
            'bank_title':'Dane do przelewu',
            'bank_rec_b':'Odbiorca','bank_title_b':'Tytuł','bank_bank_b':'Bank','bank_acct_b':'Numer rachunku','bank_addr_b':'Adres',
            'map_title':'Mapa dojazdu','map_text':'Aby otworzyć mapę w Google, kliknij:','map_btn':'Mapa dojazdu',
            aboutbreed_title: 'O rasie: mastif pirenejski',
            aboutbreed_intro: 'Mastif pirenejski to duży, spokojny pies stróżujący z Hiszpanii (Aragonia). Łączy łagodne usposobienie w domu z czujnością wobec obcych. To rasa rodzinna, ale wymaga konsekwencji, przestrzeni i mądrej socjalizacji.',

            breed_origin_pill: 'Pochodzenie i standard',
            breed_origin_h: 'Hiszpania • FCI 92',
            breed_origin_b1: 'Rola:',
            breed_origin_v1: 'historyczny stróż stad podczas transhumancji',
            breed_origin_b2: 'Wzorzec:',
            breed_origin_v2: 'FCI Grupa 2, sekcja 2.2 (bez próby pracy)',
            breed_origin_b3: 'Wielkość:',
            breed_origin_v3: 'duży molos; preferowane osobniki większe',

            breed_temper_pill: 'Charakter w skrócie',
            breed_temper_h: 'Spokojny, oddany, czujny',
            breed_temper_li1: 'bardzo przywiązany do rodziny, cierpliwy z dziećmi',
            breed_temper_li2: 'z natury stróż — ocenia sytuacje bez paniki',
            breed_temper_li3: 'potrzebuje jasnych zasad i spokojnego przewodnika',

            breed_req_pill: 'Na co dzień',
            breed_req_h: 'Wymagania',
            breed_req_li1: 'dom z ogrodem / bezpieczny teren',
            breed_req_li2: 'spacery w umiarkowanym tempie (nie biegacz)',
            breed_req_li3: 'wczesna socjalizacja + łagodna, konsekwentna nauka',

            breed_health_pill: 'Zdrowie',
            breed_health_h: 'Na co zwracać uwagę',
            breed_health_li1: 'waga i stawy (kontrola masy, podłoże antypoślizgowe u maluchów)',
            breed_health_li2: 'badania rodziców pod kątem dysplazji (HD/ED)',
            breed_health_li3: 'żywienie dopasowane do ras dużych (wolny wzrost)',

            breed_groom_pill: 'Pielęgnacja',
            breed_groom_h: 'Prosto i regularnie',
            breed_groom_li1: 'szczotkowanie 1–2× w tygodniu; w linieniu częściej',
            breed_groom_li2: 'kontrola uszu, pazurów i zębów',
            breed_groom_li3: 'kąpiele wg potrzeby, delikatne kosmetyki',

            breed_for_pill: 'Czy to pies dla Ciebie?',
            breed_for_h: 'Tak, jeśli…',
            breed_for_yes1: 'lubisz spokój, konsekwencję i jasne zasady',
            breed_for_yes2: 'masz przestrzeń i czas dla dużego psa',
            breed_for_yes3: 'szukasz rodzinnego stróża, nie sportowca',
            breed_notfor_h: 'Nie, jeśli…',
            breed_notfor_no1: 'chcesz psa „na maraton” lub dużo skakać/agility',
            breed_notfor_no2: 'nie lubisz pracy nad spokojnymi nawykami',

            breed_faq_h: 'Najczęstsze pytania',
            breed_faq_q1: 'Czy nadaje się do mieszkania?',
            breed_faq_a1: 'Możliwie tylko przy dużym metrażu i regularnych wyjściach, ale najlepiej czuje się w domu z ogrodem.',
            breed_faq_q2: 'Jak znosi samotność?',
            breed_faq_a2: 'Nie jest psem „kanapowo-zależnym”, jednak jak każdy pies nie powinien zostawać samotny codziennie na długie godziny. Warto uczyć spokojnego odpoczynku.',
            breed_faq_q3: 'Relacje z dziećmi i innymi zwierzętami?',
            breed_faq_a3: 'Zwykle cierpliwy i delikatny, jeśli ma prawidłową socjalizację oraz zasady kontaktu – zawsze pod nadzorem dorosłych.',
            breed_specs_pill:'Wymiary i parametry',
            breed_specs_h:'Wzrost / masa / życie',
            breed_specs_height:'Wysokość w kłębie',
            breed_specs_height_v:'psy min. 77 cm, suki min. 72 cm',
            breed_specs_weight:'Masa (orient.)',
            breed_specs_weight_v:'60–90+ kg',
            breed_specs_lifespan:'Długość życia',
            breed_specs_lifespan_v:'10–12 lat',

            breed_specs_daily_pill:'Na co dzień',
            breed_specs_daily_h:'Aktywność i pielęgnacja',
            breed_specs_activity:'Aktywność',
            breed_specs_activity_v:'umiarkowana (spokojne spacery)',
            breed_specs_shedding:'Linienie',
            breed_specs_shedding_v:'sezonowe, obfite — szczotkowanie',
            breed_specs_groom:'Pielęgnacja',
            breed_specs_groom_v:'kontrola uszu/pazurów/zębów',

            breed_specs_id_pill:'Identyfikacja',
            breed_specs_id_h:'Szata i klasyfikacja',
            breed_specs_coat:'Szata / kolory',
            breed_specs_coat_v:'biała z łatami; maska',
            breed_specs_group:'FCI',
            breed_specs_group_v:'Gr. 2, sekcja 2.2; standard 92',
            breed_specs_note_b:'Uwaga',
            breed_specs_note:'Wartości orientacyjne (linie różnią się)',
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
            'about_lead':'Our names are Manuel and Jolanta and we’ve been running the “Psiakowo” kennel with passion. We operate transparently and to the highest welfare standards.',
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
            'gallery_mother':'Dam Xoia',
            'gallery_father':'Father Max',
            'gallery_puppies':'Puppies',
            'puppies_only_available':'Show available only',
            'status_available':'Available',
            'status_reserved':'Reserved',
            'status_sold':'Sold',
            'bank_rec_b':'Recipient','bank_title_b':'Title','bank_bank_b':'Bank','bank_acct_b':'Account number','bank_addr_b':'Address',
            'map_title':'Directions map','map_text':'To open the map in Google, click:','map_btn':'Directions',
            // ---- ABOUT THE BREED (EN) ----
            aboutbreed_title: 'About the breed: Pyrenean Mastiff',
            aboutbreed_intro: 'The Pyrenean Mastiff is a large, calm livestock guardian from Aragon, Spain. Gentle and devoted at home, yet vigilant with strangers. A true family dog that needs consistency, space and thoughtful socialisation.',

            breed_origin_pill: 'Origin & standard',
            breed_origin_h: 'Spain • FCI 92',
            breed_origin_b1: 'Role:',
            breed_origin_v1: 'historical transhumance livestock guardian',
            breed_origin_b2: 'Standard:',
            breed_origin_v2: 'FCI Group 2, section 2.2 (no working trial)',
            breed_origin_b3: 'Size:',
            breed_origin_v3: 'giant molosser; larger dogs preferred',

            breed_temper_pill: 'Temperament at a glance',
            breed_temper_h: 'Calm, devoted, vigilant',
            breed_temper_li1: 'very attached to family; patient with children',
            breed_temper_li2: 'natural guardian — assesses situations without panic',
            breed_temper_li3: 'needs clear rules and a steady handler',

            breed_req_pill: 'Daily life',
            breed_req_h: 'Requirements',
            breed_req_li1: 'house with a garden / secure grounds',
            breed_req_li2: 'moderate walks (not a jogger)',
            breed_req_li3: 'early socialisation + gentle, consistent training',

            breed_health_pill: 'Health',
            breed_health_h: 'What to watch for',
            breed_health_li1: 'weight and joints (controlled growth, non-slip floors for puppies)',
            breed_health_li2: 'parents screened for hip/elbow dysplasia (HD/ED)',
            breed_health_li3: 'large-breed nutrition (slow growth)',

            breed_groom_pill: 'Grooming',
            breed_groom_h: 'Simple and regular',
            breed_groom_li1: 'brushing 1–2× per week; more during shedding',
            breed_groom_li2: 'check ears, nails and teeth',
            breed_groom_li3: 'baths as needed with gentle products',

            breed_for_pill: 'Is it for you?',
            breed_for_h: 'Yes, if…',
            breed_for_yes1: 'you value calm, consistency and clear rules',
            breed_for_yes2: 'you have space and time for a giant breed',
            breed_for_yes3: 'you want a family guardian, not a sports dog',
            breed_notfor_h: 'Not, if…',
            breed_notfor_no1: 'you want a marathon or agility partner',
            breed_notfor_no2: 'you dislike building calm routines',

            breed_faq_h: 'FAQ',
            breed_faq_q1: 'Is it suitable for an apartment?',
            breed_faq_a1: 'Only with generous space and daily outings; ideally, a house with a garden.',
            breed_faq_q2: 'How does it handle being alone?',
            breed_faq_a2: 'Not overly clingy, but like any dog shouldn’t be left alone for long hours daily. Teach calm downtime.',
            breed_faq_q3: 'With children and other animals?',
            breed_faq_a3: 'Usually patient and gentle given proper socialisation and clear rules — always under adult supervision.',
            breed_specs_pill:'Dimensions & specs',
            breed_specs_h:'Height / weight / lifespan',
            breed_specs_height:'Height at withers',
            breed_specs_height_v:'males min. 77 cm, females min. 72 cm',
            breed_specs_weight:'Weight (approx.)',
            breed_specs_weight_v:'60–90+ kg',
            breed_specs_lifespan:'Life expectancy',
            breed_specs_lifespan_v:'10–12 years',

            breed_specs_daily_pill:'Daily life',
            breed_specs_daily_h:'Activity & grooming',
            breed_specs_activity:'Activity',
            breed_specs_activity_v:'moderate (calm walks)',
            breed_specs_shedding:'Shedding',
            breed_specs_shedding_v:'seasonal, heavy — brushing',
            breed_specs_groom:'Grooming',
            breed_specs_groom_v:'check ears/nails/teeth',

            breed_specs_id_pill:'Identification',
            breed_specs_id_h:'Coat & classification',
            breed_specs_coat:'Coat / colours',
            breed_specs_coat_v:'white with patches; mask',
            breed_specs_group:'FCI',
            breed_specs_group_v:'Grp. 2, sec. 2.2; standard 92',
            breed_specs_note_b:'Note',
            breed_specs_note:'Approximate values (lines vary)',

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

    /* ===================== Puppies data + renderer ===================== */
    const puppiesData = [
        { id:'B1', name:'Black', sex:'pies', status:'available', imgs:[
                'assets/szczeniaki/Black1.jpg',
                'assets/szczeniaki/Black2.jpg'
            ]},
        { id:'B2', name:'Blue', sex:'pies', status:'reserved', imgs:[
                'assets/szczeniaki/Blue1.jpg',
                'assets/szczeniaki/Blue2.jpg'
            ]},
        { id:'G1', name:'Green', sex:'suka', status:'available', imgs:[
                'assets/szczeniaki/Green1.jpg',
                'assets/szczeniaki/Green2.jpg'
            ]},
        { id:'LB1', name:'Light Blue', sex:'suka', status:'available', imgs:[
                'assets/szczeniaki/LightBlue1.jpg',
                'assets/szczeniaki/LightBlue2.jpg'
            ]},
        { id:'O1', name:'Orange', sex:'suka', status:'available', imgs:[
                'assets/szczeniaki/Orange1.jpg',
                'assets/szczeniaki/Orange2.jpg'
            ]},
        { id:'P1', name:'Pink', sex:'suka', status:'available', imgs:[
                'assets/szczeniaki/Pink1.jpg',
                'assets/szczeniaki/Pink2.jpg'
            ]},
        { id:'P1', name:'Red', sex:'suka', status:'available', imgs:[
                'assets/szczeniaki/Red1.jpg',
                'assets/szczeniaki/Red2.jpg'
            ]},
        { id:'Y1', name:'Yellow', sex:'suka', status:'available', imgs:[
                'assets/szczeniaki/Yellow1.jpg',
                'assets/szczeniaki/Yellow2.jpg'
            ]}
    ];

    let currentLang;

    const t = (key) => (dict?.[currentLang]?.[key]) ?? key;

    function renderPuppies(){
        const grid = document.getElementById('puppiesGrid');
        if(!grid) return;

        const onlyAvail = document.getElementById('onlyAvailable')?.checked;
        const list = (Array.isArray(puppiesData) ? puppiesData : []).filter(p => !onlyAvail || p.status === 'available');

        const statusText  = (s) => ({
            available: t('status_available'),
            reserved : t('status_reserved'),
            sold     : t('status_sold')
        }[s] || s);

        grid.innerHTML = list.map(p => {
            const sexLabel = p.sex === 'pies'
                ? (typeof currentLang !== 'undefined' && currentLang === 'en' ? 'male'   : 'pies')
                : (typeof currentLang !== 'undefined' && currentLang === 'en' ? 'female' : 'suka');

            const imgs = Array.isArray(p.imgs) ? p.imgs.filter(Boolean) : (p.img ? [p.img] : []);
            const hasMany = imgs.length > 1;
            const src0 = imgs[0] || '';
            const srcsAttr = imgs.join('|');
            const dots = imgs.map((_,i)=>`<button class="puppy-dot${i===0?' active':''}" data-idx="${i}" aria-label="slide ${i+1}"></button>`).join('');

            return `
  <article class="card puppy-card" data-id="${p.id || ''}" data-status="${p.status || ''}">
    <div class="puppy-slider" data-srcs="${srcsAttr}" data-current="0">
      <a class="puppy-link" href="${src0}">
        <img class="puppy-img" loading="lazy" src="${src0}" alt="Szczeniak ${p.name || ''} — ${sexLabel}">
      </a>
      <button class="puppy-prev" aria-label="Prev" ${hasMany?'':'hidden'}>‹</button>
      <button class="puppy-next" aria-label="Next" ${hasMany?'':'hidden'}>›</button>
      <div class="puppy-dots" ${hasMany?'':'hidden'}>${dots}</div>
    </div>
    <div class="p">
      <div class="puppy-meta">
        <div class="puppy-name">${p.name || ''} <span style="color:var(--muted); font-weight:600">• ${sexLabel}</span></div>
        <span class="status-pill status-${p.status}">${statusText(p.status)}</span>
      </div>
    </div>
  </article>
`;
        }).join('');

        // helper do zmiany slajdu
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

            slider.querySelectorAll('.puppy-dot').forEach((d,i)=>{
                d.classList.toggle('active', i===newIdx);
            });
        };

        // lightbox „open” (jeśli masz openLightbox) + fallback
        const overlay = document.querySelector('dialog');
        const lbImg = overlay?.querySelector('img');
        const openLB = (src) => {
            if (typeof openLightbox === 'function') {
                openLightbox(src);
            } else if (overlay && lbImg) {
                lbImg.src = src;
                overlay.showModal();
            } else {
                // ostateczny fallback: otwórz obrazek w nowej karcie
                window.open(src, '_blank', 'noopener');
            }
        };

        // podpięcie zachowań do każdej karuzeli
        const sliders = grid.querySelectorAll('.puppy-slider');
        sliders.forEach(slider => {
            const srcs = (slider.dataset.srcs || '').split('|').filter(Boolean);
            if (!srcs.length) return;

            const prev = slider.querySelector('.puppy-prev');
            const next = slider.querySelector('.puppy-next');
            const area = slider.querySelector('.puppy-link');
            const imgEl = slider.querySelector('.puppy-img');
            const show = (i) => showSlide(slider, i);

            // przyciski
            prev?.addEventListener('click', (e)=>{ e.preventDefault(); show(Number(slider.dataset.current||0)-1); });
            next?.addEventListener('click', (e)=>{ e.preventDefault(); show(Number(slider.dataset.current||0)+1); });

            // kropki
            slider.querySelectorAll('.puppy-dot').forEach(dot=>{
                dot.addEventListener('click', (e)=>{
                    e.preventDefault();
                    show(Number(dot.dataset.idx||0));
                });
            });

            // === DRAG: pointer events (mysz + dotyk) ===
            let startX = 0, dx = 0, dragging = false, suppressClick = false;
            const THRESH = 40; // próg zmiany slajdu

            const onPointerDown = (e) => {
                e.preventDefault(); // ważne: blokuje natywny drag/klik
                dragging = true;
                dx = 0;
                startX = e.clientX ?? (e.touches?.[0]?.clientX) ?? 0;
                slider.classList.add('dragging');
                area?.setPointerCapture?.(e.pointerId ?? 0);
                if (imgEl) imgEl.draggable = false;
            };

            const onPointerMove = (e) => {
                if (!dragging) return;
                const x = e.clientX ?? (e.touches?.[0]?.clientX) ?? startX;
                dx = x - startX;
            };

            const onPointerUp = (e) => {
                if (!dragging) return;
                dragging = false;
                slider.classList.remove('dragging');

                if (Math.abs(dx) > THRESH) {
                    const dir = dx < 0 ? +1 : -1; // w lewo -> następny; w prawo -> poprzedni
                    show(Number(slider.dataset.current||0) + dir);
                    suppressClick = true; // nie otwieraj lightboxa po dragu
                    setTimeout(()=> suppressClick = false, 120);
                }

                dx = 0;
                try { area?.releasePointerCapture?.(e.pointerId ?? 0); } catch(_){}
            };

            area?.addEventListener('pointerdown', onPointerDown, { passive:false });
            area?.addEventListener('pointermove', onPointerMove,  { passive:false });
            area?.addEventListener('pointerup',   onPointerUp,    { passive:false });
            area?.addEventListener('pointercancel', onPointerUp,  { passive:false });
            area?.addEventListener('pointerleave',  (e)=>{ if (dragging) onPointerUp(e); }, { passive:false });

            // jeśli to był drag, zablokuj klik (lightbox)
            area?.addEventListener('click', (e) => {
                if (suppressClick) { e.preventDefault(); e.stopPropagation(); }
                else {
                    // zwykły klik — otwórz lightbox
                    const href = area.getAttribute('href') || '';
                    if (/\.(avif|webp|jpe?g|png|gif|bmp|webm|svg)(\?.*)?$/i.test(href)) {
                        e.preventDefault();
                        openLB(href);
                    }
                }
            }, true);

            // === Wheel / trackpad ===
            let wheelLock = false;
            const onWheel = (e) => {
                if (document.documentElement.classList.contains('lb-open')) return;
                if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
                if (wheelLock) return;

                const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
                if (Math.abs(delta) < 10) return;

                e.preventDefault();
                wheelLock = true;
                const dir = delta > 0 ? +1 : -1;
                show(Number(slider.dataset.current||0) + dir);
                setTimeout(()=> wheelLock = false, 220);
            };
            slider.addEventListener('wheel', onWheel, { passive:false });

            // klawiatura
            area?.addEventListener('keydown', (e)=>{
                if (e.key === 'ArrowLeft')  { e.preventDefault(); show(Number(slider.dataset.current||0)-1); }
                if (e.key === 'ArrowRight') { e.preventDefault(); show(Number(slider.dataset.current||0)+1); }
            });

            // start
            show(Number(slider.dataset.current||0));
        });

        // UWAGA: żeby drag był gładki na mobile i nie kolidował z pionowym scrollowaniem,
        // dodaj w CSS:
        // .puppy-slider { touch-action: pan-y; }
        // .puppy-slider, .puppy-slider img { user-select:none; -webkit-user-drag:none; }
    }


    /* ===================== Language apply ===================== */
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

        try { localStorage.setItem('lang', lang); } catch(e){}

        currentLang = lang;   // ustaw bieżący język
        renderPuppies();      // odśwież karty szczeniąt (etykiety/statusy)
    }

    // initial language
    let saved = null;
    try { saved = localStorage.getItem('lang'); } catch(e){}
    const defaultLang = ((navigator.language || '').toLowerCase().startsWith('pl')) ? 'pl' : 'en';
    currentLang = saved || defaultLang;
    applyLang(currentLang);

    const toggleLang = ()=>{
        const next = (currentLang === 'pl') ? 'en' : 'pl';
        applyLang(next);
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

    const openLightbox = (src) => {
        lbImg.src = src;
        document.documentElement.classList.add('lb-open');
        overlay.showModal();
    };


    overlay.addEventListener('close', () => {
        document.documentElement.classList.remove('lb-open');
    });

    // LIGHTBOX dla wszystkich obrazów na stronie
    (function bindLightboxForAllImages(){
        // 1) Klik na <a> z obrazkiem (preferowane źródło: href)
        document.querySelectorAll('a:has(img):not(.no-lightbox)').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href') || '';
                const isImg = /\.(avif|webp|jpe?g|png|gif|bmp|webm|svg)(\?.*)?$/i.test(href);
                if (!isImg) return; // normalny link – nie wchodzimy
                e.preventDefault();
                const img = link.querySelector('img');
                const full = img?.dataset?.full || href; // preferuj data-full, jak masz miniatury
                openLightbox(full);
            });
        });

        // 2) Klik na sam <img> bez linka (weź źródło z data-full albo src)
        document.querySelectorAll('img:not(a img)').forEach(img => {
            if (img.closest('.no-lightbox')) return;
            img.style.cursor = 'default';
            img.setAttribute('role', 'button');
            img.setAttribute('tabindex', '0');
            img.addEventListener('click', () => {
                const full = img.dataset?.full || img.currentSrc || img.src;
                openLightbox(full);
            });
            img.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const full = img.dataset?.full || img.currentSrc || img.src;
                    openLightbox(full);
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

    // 3) Parallax background on hero section (true parallax)
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
        if (!prefersReduced) {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const mx = e.clientX - rect.left - rect.width / 2;
                const my = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${mx * 0.06}px, ${my * 0.08}px)`;
            });
            btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
        }
        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';
        btn.addEventListener('click', (e) => makeRipple(btn, e.clientX, e.clientY));
    });

    // 5) Subtle tilt on cards/features
    const tiltables = document.querySelectorAll('.card:not(.puppy-card), .feature');

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

    /* ===================== Puppies: filter + first render ===================== */
    document.getElementById('onlyAvailable')?.addEventListener('change', renderPuppies);
    renderPuppies();
});
