document.addEventListener('DOMContentLoaded', () => {
    let currentSlide = 0;
    const totalSlides = 7; // Diperbarui menjadi 7 slide total
    let isScrolling = false;

    const sliderTrack = document.getElementById('sliderTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const navItems = document.querySelectorAll('.nav-item');
    
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    // Fungsi utama perpindahan slide
    function goToSlide(slideIndex) {
        if (slideIndex < 0) {
            currentSlide = 0;
        } else if (slideIndex >= totalSlides) {
            currentSlide = totalSlides - 1;
        } else {
            currentSlide = slideIndex;
        }

        // Geser track slider horizontal
        sliderTrack.style.transform = `translateX(-${currentSlide * 100}vw)`;

        // Update active class pada navbar
        navItems.forEach((item, index) => {
            if (index === currentSlide) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Visibilitas tombol panah pudar
        prevBtn.style.opacity = currentSlide === 0 ? '0.2' : '1';
        prevBtn.style.pointerEvents = currentSlide === 0 ? 'none' : 'auto';

        nextBtn.style.opacity = currentSlide === totalSlides - 1 ? '0.2' : '1';
        nextBtn.style.pointerEvents = currentSlide === totalSlides - 1 ? 'none' : 'auto';
    }

    // --- DETEKSI MOUSE WHEEL (SCROLL KE BAWAH -> GESER KANAN) ---
    window.addEventListener('wheel', (e) => {
        const scrollableArea = e.target.closest('.scrollable-content');
        if (scrollableArea) {
            const isAtTop = scrollableArea.scrollTop === 0;
            const isAtBottom = scrollableArea.scrollHeight - scrollableArea.scrollTop <= scrollableArea.clientHeight + 1;
            
            if (e.deltaY < 0 && !isAtTop) return;
            if (e.deltaY > 0 && !isAtBottom) return;
        }

        if (isScrolling) return;

        if (e.deltaY > 0) {
            if (currentSlide < totalSlides - 1) {
                isScrolling = true;
                goToSlide(currentSlide + 1);
                setTimeout(() => { isScrolling = false; }, 700);
            }
        } else if (e.deltaY < 0) {
            if (currentSlide > 0) {
                isScrolling = true;
                goToSlide(currentSlide - 1);
                setTimeout(() => { isScrolling = false; }, 700);
            }
        }
    }, { passive: true });

    // Klik Tombol Navigasi Panah Kiri / Kanan
    prevBtn.addEventListener('click', () => {
        goToSlide(currentSlide - 1);
    });

    nextBtn.addEventListener('click', () => {
        goToSlide(currentSlide + 1);
    });

    // Klik Menu Navigasi Atas
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const slideIndex = parseInt(item.getAttribute('data-slide'));
            goToSlide(slideIndex);

            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = mobileMenu.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Toggle Menu Mobile
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenu.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Navigasi Keyboard (Left & Right Arrow)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            goToSlide(currentSlide - 1);
        } else if (e.key === 'ArrowRight') {
            goToSlide(currentSlide + 1);
        }
    });

    // Inisialisasi awal
    goToSlide(0);
});