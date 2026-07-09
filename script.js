document.addEventListener('DOMContentLoaded', () => {
    // Header scroll effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(15, 15, 16, 0.98)';
            header.style.padding = '0.5rem 0';
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)';
        } else {
            header.style.backgroundColor = 'rgba(15, 15, 16, 0.95)';
            header.style.padding = '1rem 0';
            header.style.boxShadow = 'none';
        }
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('ph-list');
                icon.classList.add('ph-x');
            } else {
                icon.classList.remove('ph-x');
                icon.classList.add('ph-list');
            }
        });
    }

    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('ph-x');
                icon.classList.add('ph-list');
            }
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll reveal animation
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);
    
    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Image Comparison Slider
    const sliders = document.querySelectorAll('.image-comparison');
    
    sliders.forEach(slider => {
        const handle = slider.querySelector('.slider-handle');
        const imgAntes = slider.querySelector('.img-antes');
        let isDragging = false;
        
        const moveSlider = (e) => {
            if (!isDragging) return;
            
            let rect = slider.getBoundingClientRect();
            let x;
            
            if (e.type.includes('touch')) {
                x = e.touches[0].clientX - rect.left;
            } else {
                x = e.clientX - rect.left;
            }
            
            // Constrain x
            x = Math.max(0, Math.min(x, rect.width));
            
            // Calculate percentage
            let percentage = (x / rect.width) * 100;
            
            // Update handle and clip-path
            handle.style.left = percentage + '%';
            imgAntes.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
        };
        
        slider.addEventListener('mousedown', (e) => {
            isDragging = true;
            moveSlider(e);
        });
        slider.addEventListener('touchstart', (e) => {
            isDragging = true;
            moveSlider(e);
        });
        
        window.addEventListener('mouseup', () => isDragging = false);
        window.addEventListener('touchend', () => isDragging = false);
        
        window.addEventListener('mousemove', moveSlider);
        window.addEventListener('touchmove', moveSlider);
    });
});
