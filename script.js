document.addEventListener('DOMContentLoaded', function() {
    // Enhanced smooth scroll with easing
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            let offset = 0;
            
            // Add offset for header if not scrolling to top
            if (targetId !== '#top') {
                offset = 120; // Adjust this value based on your header height
            }
            
            const targetElement = targetId === '#top' ? document.body : document.querySelector(targetId);
            const targetPosition = targetId === '#top' ? 0 : targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });

    // Enhanced button interactions
    document.querySelectorAll('.buy-btn, .connect-btn').forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });

        button.addEventListener('mousedown', () => {
            button.style.transform = 'translateY(1px)';
        });
    });

    // Copy button functionality
    const copyBtn = document.querySelector('.copy-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', async function() {
            try {
                await navigator.clipboard.writeText('EA6zg6e9RcqWDgUpkhRu2YZn7LamGTNntivL7h5qpump');
                
                // Store original content
                const originalContent = this.innerHTML;
                
                // Change button appearance
                this.innerHTML = '<i class="fas fa-check"></i><span class="copy-text">Copied!</span>';
                copyBtn.style.background = 'linear-gradient(45deg, #00ff88, #7000ff)';
                
                // Reset button after 2 seconds
                setTimeout(() => {
                    this.innerHTML = originalContent;
                    copyBtn.style.background = '';
                }, 2000);
                
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
        });
    }

    // Modal handling
    const modals = {
        about: {
            button: document.querySelector('a[href="#about"]'),
            modal: document.getElementById('about-modal')
        },
        meme: {
            button: document.querySelector('a[href="#meme"]'),
            modal: document.getElementById('meme-modal')
        },
        roadmap: {
            button: document.querySelector('a[href="#roadmap"]'),
            modal: document.getElementById('roadmap-modal')
        }
    };

    // Set up click handlers for each modal
    Object.values(modals).forEach(({ button, modal }) => {
        if (button && modal) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                // Close any open modals first
                Object.values(modals).forEach(m => {
                    m.modal.classList.remove('active');
                });
                
                // Open the clicked modal
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';

                // Animate the cards inside the modal
                const cards = modal.querySelectorAll('[data-delay]');
                cards.forEach(card => {
                    setTimeout(() => {
                        card.classList.add('animate');
                    }, parseInt(card.dataset.delay));
                });
            });
        }
    });

    // Close modal when clicking outside or on close button
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        // Close button handler
        const closeBtn = modal.querySelector('.close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
                
                // Reset animations
                const cards = modal.querySelectorAll('[data-delay]');
                cards.forEach(card => card.classList.remove('animate'));
            });
        }

        // Click outside modal handler
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
                
                // Reset animations
                const cards = modal.querySelectorAll('[data-delay]');
                cards.forEach(card => card.classList.remove('animate'));
            }
        });
    });

    // Intersection Observer for step boxes
    const stepBoxObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe step boxes
    document.querySelectorAll('.step-box').forEach(box => {
        stepBoxObserver.observe(box);
    });

    // Handle meme thumbnail clicks
    const imageViewer = document.getElementById('image-viewer');
    document.querySelectorAll('.meme-thumbnail').forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            const enlargedImage = imageViewer.querySelector('.enlarged-image');
            enlargedImage.src = thumbnail.src;
            enlargedImage.alt = thumbnail.alt;
            imageViewer.classList.add('active');
        });
    });

    // Close image viewer
    if (imageViewer) {
        imageViewer.addEventListener('click', (e) => {
            if (e.target === imageViewer) {
                imageViewer.classList.remove('active');
            }
        });
    }

    // Escape key handling
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay, #image-viewer').forEach(modal => {
                modal.classList.remove('active');
            });
            document.body.style.overflow = '';
        }
    });

    // 5. Optimize scroll handling with throttling
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // Apply throttling to scroll handlers
    document.addEventListener('scroll', throttle(() => {
        // Your scroll handling code
    }, 50));

    // 6. Use requestAnimationFrame for animations
    let ticking = false;
    document.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                // Your animation code
                ticking = false;
            });
            ticking = true;
        }
    });

    // Add this to your existing script.js
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Add this to your existing script.js
    function toggleModalOpen(isOpen) {
        document.body.classList.toggle('modal-open', isOpen);
    }

    // Add this to your modal open/close handlers
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('show', () => toggleModalOpen(true));
        modal.addEventListener('hide', () => toggleModalOpen(false));
    });
});
