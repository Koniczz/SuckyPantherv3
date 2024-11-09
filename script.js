document.addEventListener('DOMContentLoaded', function() {
    // Enhanced smooth scroll with easing
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const targetPosition = targetElement.offsetTop - 80;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 1000;
                let start = null;

                function animation(currentTime) {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const run = ease(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) requestAnimationFrame(animation);
                }

                function ease(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t + b;
                    t--;
                    return -c / 2 * (t * (t - 2) - 1) + b;
                }

                requestAnimationFrame(animation);
            }
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
    const addressText = document.querySelector('.address-text');

    if (copyBtn && addressText) {
        copyBtn.addEventListener('click', async function() {
            try {
                await navigator.clipboard.writeText(addressText.textContent);
                
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
});
