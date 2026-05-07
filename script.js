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
    const modal = document.querySelector('.modal');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalContent = document.querySelector('.modal-content');
    const closeModalBtn = document.querySelector('.close-modal');
    const videoTriggers = document.querySelectorAll('.portfolio-item.motion, .portfolio-item.video');

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

    videoTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const embedPath = trigger.getAttribute('data-video-src');
            if (embedPath) openModal(embedPath);
        });
    });

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    /* =================================================== */
    /* 9. LIGHTBOX IMAGE                                   */
    /* =================================================== */
    const lightbox       = document.getElementById('lightbox');
    const lightboxImg    = document.getElementById('lightbox-img');
    const lightboxTitle  = document.getElementById('lightbox-title');
    const lightboxCat    = document.getElementById('lightbox-cat');
    const lightboxClose  = document.getElementById('lightbox-close');
    const lightboxPrev   = document.getElementById('lightbox-prev');
    const lightboxNext   = document.getElementById('lightbox-next');

    // Collecte tous les items photo (branding, non-vidéo)
    const photoItems = [...document.querySelectorAll('.portfolio-item.branding')];
    let currentLightboxIndex = 0;

    function openLightbox(index) {
        const item = photoItems[index];
        const img  = item.querySelector('img');
        const h3   = item.querySelector('.overlay-inner h3');
        const cat  = item.querySelector('.overlay-cat');

        lightboxImg.src         = img ? img.src : '';
        lightboxImg.alt         = img ? img.alt : '';
        lightboxTitle.textContent = h3 ? h3.textContent : '';
        lightboxCat.textContent   = cat ? cat.textContent : '';

        currentLightboxIndex = index;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Mise à jour des flèches
        lightboxPrev.style.opacity = index === 0 ? '0.3' : '1';
        lightboxNext.style.opacity = index === photoItems.length - 1 ? '0.3' : '1';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        lightboxImg.src = '';
        document.body.style.overflow = '';
    }

    function showPrev() {
        if (currentLightboxIndex > 0) openLightbox(currentLightboxIndex - 1);
    }

    function showNext() {
        if (currentLightboxIndex < photoItems.length - 1) openLightbox(currentLightboxIndex + 1);
    }

    photoItems.forEach((item, i) => {
        item.addEventListener('click', () => openLightbox(i));
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });
    lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape')      closeLightbox();
        if (e.key === 'ArrowLeft')   showPrev();
        if (e.key === 'ArrowRight')  showNext();
    });

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
    /* =================================================== */
    const revealEls = document.querySelectorAll('.reveal-up');
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        revealEls.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback pour les vieux navigateurs
        revealEls.forEach(el => el.classList.add('visible'));
    }

});
