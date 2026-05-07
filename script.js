/* ==========================================================================
   Table des matières :
   1.  Préchargeur
   2.  Menu Hamburger Mobile
   3.  Header au défilement
   4.  Année dynamique dans le Footer
   5.  Filtre du Portfolio
   6.  Liens de navigation actifs au défilement
   7.  Logique du formulaire de contact avec EmailJS
   8.  Gestion de la modale vidéo
   9.  Bouton retour en haut  ← NOUVEAU
   10. Effet typewriter (machine à écrire)  ← NOUVEAU
   11. Compteur de stats animé  ← NOUVEAU
   12. Reveal au défilement (animations)  ← NOUVEAU
   ========================================================================== */

/* Référence globale, assignée dans DOMContentLoaded */
let initGalleryInteractions = null;

/* Contenu statique de secours si GitHub est inaccessible */
const STATIC_PORTFOLIO_FALLBACK = `
  <div class="portfolio-item branding reveal-up">
    <img src="img/photo_2025-07-30_21-54-00.jpg" alt="AFRO CARIBBEAN NIGHT All White Affair">
    <div class="portfolio-overlay"><div class="overlay-inner"><span class="overlay-cat">Branding</span><h3>AFRO CARIBBEAN NIGHT All White Affair</h3></div></div>
  </div>
  <div class="portfolio-item branding reveal-up">
    <img src="img/uy.jpg" alt="Raphinha X FCB">
    <div class="portfolio-overlay"><div class="overlay-inner"><span class="overlay-cat">Branding</span><h3>Raphinha X FCB</h3></div></div>
  </div>
  <div class="portfolio-item branding reveal-up">
    <img src="img/ja.jpg" alt="Tyrese Haliburton Poster">
    <div class="portfolio-overlay"><div class="overlay-inner"><span class="overlay-cat">Branding</span><h3>Tyrese Haliburton Poster</h3></div></div>
  </div>
  <div class="portfolio-item branding reveal-up">
    <img src="img/ret.jpg" alt="NAIROBI Nights">
    <div class="portfolio-overlay"><div class="overlay-inner"><span class="overlay-cat">Branding</span><h3>NAIROBI Nights</h3></div></div>
  </div>
  <div class="portfolio-item motion reveal-up" data-video-src="https://www.youtube.com/embed/HYbnMT6ELJA?rel=0&modestbranding=1&autoplay=1">
    <img src="img/ze.jpg" alt="Vibes Spice Motion">
    <div class="portfolio-overlay"><div class="overlay-inner"><span class="overlay-cat">Motion Design</span><div class="play-btn-circle"><i class="fas fa-play"></i></div><h3>Vibes & Spice (Motion)</h3></div></div>
  </div>
  <div class="portfolio-item motion reveal-up" data-video-src="https://www.youtube.com/embed/biF75GFE1Lc?rel=0&modestbranding=1&autoplay=1">
    <img src="img/fd.jpg" alt="TIMAYA Live Motion">
    <div class="portfolio-overlay"><div class="overlay-inner"><span class="overlay-cat">Motion Design</span><div class="play-btn-circle"><i class="fas fa-play"></i></div><h3>TIMAYA Live LUDWIGSHAFEN (Motion)</h3></div></div>
  </div>`;

document.addEventListener('DOMContentLoaded', function() {

    /* =================================================== */
    /* 1. PRÉCHARGEUR                                       */
    /* =================================================== */
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hidden');
            }, 1300);
        });
    }

    /* =================================================== */
    /* 2. MENU HAMBURGER MOBILE                            */
    /* =================================================== */
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    /* =================================================== */
    /* 3. HEADER AU DÉFILEMENT                             */
    /* =================================================== */
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* =================================================== */
    /* 4. ANNÉE DYNAMIQUE DANS LE FOOTER                   */
    /* =================================================== */
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    /* =================================================== */
    /* 5. FILTRE DU PORTFOLIO                              */
    /* =================================================== */
    const filterContainer = document.querySelector('.portfolio-filters');
    const galleryItems = document.querySelectorAll('.portfolio-item');

    if (filterContainer) {
        filterContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                filterContainer.querySelector('.active').classList.remove('active');
                e.target.classList.add('active');
                const filterValue = e.target.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    if (filterValue === '*' || item.classList.contains(filterValue.substring(1))) {
                        item.style.display = 'block';
                        item.style.animation = 'fadeUp 0.4s ease forwards';
                    } else {
                        item.style.display = 'none';
                    }
                });
            }
        });
    }

    /* =================================================== */
    /* 6. LIENS DE NAVIGATION ACTIFS AU DÉFILEMENT         */
    /* =================================================== */
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            let sectionId = current.getAttribute('id');
            const navLink = document.querySelector('.nav-menu a[href*=' + sectionId + ']');
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    });

    /* =================================================== */
    /* 7. FORMULAIRE DE CONTACT AVEC EMAILJS               */
    /* =================================================== */
    (function() {
        emailjs.init({ publicKey: "w01jIYDLYupLg0XXv" });
    })();

    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const submitBtn = contactForm.querySelector('[type="submit"]');
            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.disabled = true;

            emailjs.sendForm('service_ruxg9a6', 'template_iocmjcd', this)
                .then(function() {
                    alert('✅ Message envoyé avec succès !');
                    contactForm.reset();
                    submitBtn.innerHTML = 'Envoyer <i class="fas fa-paper-plane" style="margin-left:8px"></i>';
                    submitBtn.disabled = false;
                }, function(error) {
                    alert('❌ Une erreur est survenue. Veuillez réessayer.');
                    console.error('ERREUR EMAILJS :', error);
                    submitBtn.innerHTML = 'Envoyer <i class="fas fa-paper-plane" style="margin-left:8px"></i>';
                    submitBtn.disabled = false;
                });
        });
    }

    /* =================================================== */
    /* 8. GESTION DE LA MODALE VIDÉO                       */
    /* =================================================== */
    const modal         = document.querySelector('.modal');
    const modalOverlay  = document.querySelector('.modal-overlay');
    const modalContent  = document.querySelector('.modal-content');
    const closeModalBtn = document.querySelector('.close-modal');

    function openModal(embedSrc) {
        modalContent.innerHTML = `<iframe src="${embedSrc}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
        modal.classList.add('active');
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        modalOverlay.classList.remove('active');
        modalContent.innerHTML = '';
        document.body.style.overflow = '';
    }

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (modalOverlay)  modalOverlay.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

    /* =================================================== */
    /* 9. LIGHTBOX IMAGE                                   */
    /* =================================================== */
    const lightbox      = document.getElementById('lightbox');
    const lightboxImg   = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxCat   = document.getElementById('lightbox-cat');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev  = document.getElementById('lightbox-prev');
    const lightboxNext  = document.getElementById('lightbox-next');

    let currentLightboxIndex = 0;
    let photoItems = [];

    function openLightbox(index) {
        const item = photoItems[index];
        const img  = item.querySelector('img');
        const h3   = item.querySelector('.overlay-inner h3');
        const cat  = item.querySelector('.overlay-cat');

        lightboxImg.src             = img  ? img.src        : '';
        lightboxImg.alt             = img  ? img.alt        : '';
        lightboxTitle.textContent   = h3   ? h3.textContent : '';
        lightboxCat.textContent     = cat  ? cat.textContent: '';

        currentLightboxIndex = index;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';

        lightboxPrev.style.opacity = index === 0                   ? '0.3' : '1';
        lightboxNext.style.opacity = index === photoItems.length-1 ? '0.3' : '1';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        lightboxImg.src = '';
        document.body.style.overflow = '';
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); if (currentLightboxIndex > 0) openLightbox(currentLightboxIndex - 1); });
    lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); if (currentLightboxIndex < photoItems.length - 1) openLightbox(currentLightboxIndex + 1); });
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape')     closeLightbox();
        if (e.key === 'ArrowLeft')  { if (currentLightboxIndex > 0) openLightbox(currentLightboxIndex - 1); }
        if (e.key === 'ArrowRight') { if (currentLightboxIndex < photoItems.length - 1) openLightbox(currentLightboxIndex + 1); }
    });

    /* =================================================== */
    /* Attache les événements galerie (lightbox + vidéo)   */
    /* Appelé après chaque chargement/rechargement galerie */
    /* =================================================== */
    initGalleryInteractions = function() {
        // Lightbox : items branding (photos)
        photoItems = [...document.querySelectorAll('.portfolio-item.branding')];
        photoItems.forEach((item, i) => {
            item.addEventListener('click', () => openLightbox(i));
        });

        // Modale vidéo : items motion / video
        document.querySelectorAll('.portfolio-item.motion, .portfolio-item.video').forEach(trigger => {
            trigger.addEventListener('click', function () {
                const src = trigger.getAttribute('data-video-src');
                if (src) openModal(src);
            });
        });

        // Reveal-up : active les animations des nouveaux éléments
        if ('IntersectionObserver' in window) {
            const obs = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        obs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
            document.querySelectorAll('.reveal-up:not(.visible)').forEach(el => obs.observe(el));
        } else {
            document.querySelectorAll('.reveal-up').forEach(el => el.classList.add('visible'));
        }
    }

    // Premier appel (contenu statique de secours)
    initGalleryInteractions();

    /* =================================================== */
    /* 10. BOUTON RETOUR EN HAUT                           */
    /* =================================================== */
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* =================================================== */
    /* 10. EFFET TYPEWRITER (MACHINE À ÉCRIRE)  ← NOUVEAU  */
    /* =================================================== */
    const typedEl = document.getElementById('typed');
    if (typedEl) {
        const words = [
            'visuels percutants.',
            'identités de marque.',
            'animations captivantes.',
            'designs qui marquent.'
        ];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isPaused = false;

        function type() {
            if (isPaused) return;

            const currentWord = words[wordIndex];

            if (isDeleting) {
                typedEl.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedEl.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let delay = isDeleting ? 60 : 100;

            if (!isDeleting && charIndex === currentWord.length) {
                delay = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                delay = 400;
            }

            setTimeout(type, delay);
        }

        // Démarrage après le chargement du hero
        setTimeout(type, 1800);
    }

    /* =================================================== */
    /* 12. REVEAL AU DÉFILEMENT (ANIMATIONS)               */
    /* (Géré dynamiquement dans initGalleryInteractions)   */
    /* =================================================== */

});

/* =================================================================== */
/* 13. CHARGEMENT DYNAMIQUE DU PORTFOLIO depuis projects.json (GitHub) */
/* =================================================================== */
(async function loadPortfolioFromJSON() {
    const REPO   = 'emarketarea-art/Designerportofolio';
    const BRANCH = 'main';
    const url    = `https://raw.githubusercontent.com/${REPO}/${BRANCH}/projects.json?t=${Date.now()}`;

    const gallery = document.getElementById('portfolio-gallery');
    if (!gallery) return;

    // Affiche un indicateur de chargement
    gallery.innerHTML = `
        <div id="portfolio-loading" style="
            grid-column: 1 / -1;
            text-align: center;
            padding: 3rem;
            color: var(--text-muted, #aaa);
            font-size: 1rem;
            letter-spacing: 0.05em;
        ">
            <span style="opacity:.6">Chargement des projets…</span>
        </div>`;

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const projects = await res.json();

        if (!Array.isArray(projects) || projects.length === 0) {
            gallery.innerHTML = '<p style="grid-column:1/-1;text-align:center;opacity:.5">Aucun projet trouvé.</p>';
            return;
        }

        gallery.innerHTML = ''; // Vide le spinner

        projects.forEach(p => {
            const isMotion = p.type === 'video' || p.type === 'motion';
            const thumb    = p.thumb || p.img || '';
            const cat      = p.cat   || 'branding';

            const item = document.createElement('div');
            item.className = `portfolio-item ${cat}${isMotion ? ' motion' : ''} reveal-up`;
            if (isMotion && p.video) item.setAttribute('data-video-src', p.video);

            item.innerHTML = `
                <img src="${thumb}" alt="${p.title}" loading="lazy">
                <div class="portfolio-overlay">
                    <div class="overlay-inner">
                        <span class="overlay-cat">${cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
                        ${isMotion ? '<div class="play-btn-circle"><i class="fas fa-play"></i></div>' : ''}
                        <h3>${p.title}</h3>
                        ${p.desc ? `<p>${p.desc}</p>` : ''}
                    </div>
                </div>`;

            gallery.appendChild(item);
        });

        // Réattache lightbox, vidéo modal et animations sur les nouveaux éléments
        if (typeof initGalleryInteractions === 'function') {
            initGalleryInteractions();
        }

    } catch (err) {
        console.warn('Portfolio dynamique : erreur de chargement :', err.message);
        // En cas d'erreur, on remet le contenu statique de secours
        gallery.innerHTML = STATIC_PORTFOLIO_FALLBACK;
        if (typeof initGalleryInteractions === 'function') {
            initGalleryInteractions();
        }
    }
})();
