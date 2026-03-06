document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            // Basic toggle for mobile - can be enhanced with a real mobile menu
            alert('Mobile menu functionality can be added here with a specialized overlay.');
        });
    }

    // 3. Counter Animation
    const counters = document.querySelectorAll('.counter');
    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.innerText;
            const count = 0;
            const speed = 200; // lower is faster

            const updateCount = () => {
                const current = +counter.innerText;
                const increment = target / speed;

                if (current < target) {
                    counter.innerText = Math.ceil(current + increment);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target + '+';
                }
            };
            updateCount();
        });
    };

    // Trigger counters when in view
    const statsSection = document.getElementById('stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
                observer.unobserve(statsSection);
            }
        }, { threshold: 0.5 });
        observer.observe(statsSection);
    }

    // 4. Product Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            productCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => { card.style.display = 'none'; }, 300);
                }
            });
        });
    });

    // 5. Scroll Reveal Animation (Simple version)
    const revealElements = document.querySelectorAll('.section-title, .about-text, .about-image, .product-card, .industry-card');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-up');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        revealObserver.observe(el);
    });

    // 6. Smooth Scrolling for Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 7. Product Modal
    const modal = document.getElementById('product-modal');
    if (modal) {
        const modalImg = document.getElementById('modal-img');
        const modalTitle = document.getElementById('modal-title');
        const modalDesc = document.getElementById('modal-desc');
        const modalTag = document.getElementById('modal-tag');
        const closeBtn = document.querySelector('.close-modal');

        // Open modal on click
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', () => {
                const img = card.querySelector('.product-img img');
                const title = card.querySelector('h3').innerText;
                const desc = card.querySelector('p').innerText;
                const tag = card.querySelector('.tag').innerText;

                if (img && img.tagName === 'IMG') {
                    modalImg.src = img.src;
                    modalImg.style.display = 'block';
                } else {
                    modalImg.style.display = 'none'; // Basic fallback for icon ones
                }

                modalTitle.innerText = title;
                modalDesc.innerText = desc;
                modalTag.innerText = tag;

                modal.style.display = 'block';
                setTimeout(() => {
                    modal.classList.add('show');
                }, 10);

                // Prevent scrolling while modal is open
                document.body.style.overflow = 'hidden';
            });
        });

        // Close modal functions
        const closeModal = () => {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto'; // Restore scroll
            }, 300);
        };

        // Close when clicking X
        closeBtn.addEventListener('click', closeModal);

        // Close when clicking outside of modal content
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                closeModal();
            }
        });
    }

    // 8. Hero Background Slideshow
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        const bgImages = [
            'img/bg_bmw_1772820065857.png',
            'img/bg_harley_1772820088597.png',
            'img/bg_ducati_1772820107758.png',
            'img/bg_mv_1772820140184.png'
        ];
        let currentBgIndex = 0;

        // Preload images to avoid flashing
        bgImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });

        setInterval(() => {
            currentBgIndex = (currentBgIndex + 1) % bgImages.length;
            heroSection.style.backgroundImage = `url('${bgImages[currentBgIndex]}')`;
        }, 5000);
    }

});
