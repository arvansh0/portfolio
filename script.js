const videoElement = document.querySelector('.hero-video');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const progressContainer = document.querySelector('.video-progress');

// 8K Image Quality Enhancement Functions
function enhanceImageQuality() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Add high-quality attributes for 8K displays
        img.setAttribute('loading', 'lazy');
        img.setAttribute('decoding', 'async');
        
        // Enhanced hardware acceleration for 8K
        img.style.willChange = 'transform, filter';
        img.style.backfaceVisibility = 'hidden';
        img.style.transform = 'translateZ(0) scale3d(1, 1, 1)';
        img.style.transformStyle = 'preserve-3d';
        img.style.perspective = '1000px';
        
        // Force high-quality rendering
        img.style.imageRendering = 'high-quality';
        img.style.imageRendering = 'smooth';
        img.style.imageRendering = 'auto';
        
        // Enhanced WebKit rendering
        img.style.webkitImageRendering = 'high-quality';
        img.style.webkitImageRendering = 'smooth';
        img.style.webkitImageRendering = 'crisp-edges';
        
        // Better interpolation
        img.style.msInterpolationMode = 'bicubic';
        
        // Add subtle quality enhancement filters based on device pixel ratio
        const devicePixelRatio = window.devicePixelRatio || 1;
        if (devicePixelRatio >= 2) {
            img.style.filter = 'contrast(1.02) brightness(1.01) saturate(1.01)';
        }
        if (devicePixelRatio >= 3) {
            img.style.filter = 'contrast(1.03) brightness(1.015) saturate(1.015)';
        }
        if (devicePixelRatio >= 4) {
            img.style.filter = 'contrast(1.04) brightness(1.02) saturate(1.02)';
        }
        if (devicePixelRatio >= 5) {
            img.style.filter = 'contrast(1.05) brightness(1.025) saturate(1.025)';
        }
    });
}

// Optimized lazy loading for better performance
function lazyLoadImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const parent = img.closest('.project-image');
                
                // Add loading state
                if (parent) {
                    parent.classList.add('loading');
                }
                
                // Handle load completion
                img.onload = function() {
                    img.classList.add('loaded');
                    if (parent) {
                        parent.classList.remove('loading');
                    }
                };
                
                // Handle load error
                img.onerror = function() {
                    console.warn('Failed to load image:', img.src);
                    if (parent) {
                        parent.classList.remove('loading');
                    }
                };
                
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.1
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// WebP support detection
function supportsWebP() {
    return new Promise((resolve) => {
        const webP = new Image();
        webP.onload = webP.onerror = function () {
            resolve(webP.height === 2);
        };
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    });
}

// Mobile menu elements
const menuToggle = document.querySelector('.menu-toggle');
const navMobile = document.querySelector('.nav-mobile');
const body = document.body;

// Handle mobile menu with improved touch support
if (menuToggle && navMobile) {
    // Toggle menu
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        menuToggle.classList.toggle('active');
        navMobile.classList.toggle('active');
        body.classList.toggle('menu-open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && 
            !navMobile.contains(e.target) && 
            navMobile.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navMobile.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });

    // Close menu when clicking on links
    const mobileLinks = navMobile.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMobile.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });

    // Handle touch events for mobile menu
    navMobile.addEventListener('touchstart', (e) => {
        e.stopPropagation();
    }, { passive: true });

    navMobile.addEventListener('touchmove', (e) => {
        e.stopPropagation();
    }, { passive: true });

    // Handle touch events
    let touchStartY = 0;
    let touchEndY = 0;

    navMobile.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    });

    navMobile.addEventListener('touchmove', (e) => {
        touchEndY = e.touches[0].clientY;
        const scrollTop = navMobile.scrollTop;
        const scrollHeight = navMobile.scrollHeight;
        const clientHeight = navMobile.clientHeight;

        // Prevent overscroll
        if (scrollTop <= 0 && touchEndY > touchStartY) {
            e.preventDefault();
        }
        if (scrollTop + clientHeight >= scrollHeight && touchEndY < touchStartY) {
            e.preventDefault();
        }
    });
}

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navMobile.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navMobile.classList.remove('active');
        body.classList.remove('menu-open');
    }
});

// Optimized touch handling for mobile devices
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    let touchStartY;
    let touchStartX;
    
    card.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
        touchStartX = e.touches[0].clientX;
    }, { passive: true });
    
    card.addEventListener('touchmove', (e) => {
        if (!touchStartY || !touchStartX) return;
        
        const touchEndY = e.touches[0].clientY;
        const touchEndX = e.touches[0].clientX;
        const diffY = touchStartY - touchEndY;
        const diffX = touchStartX - touchEndX;
        
        // Only prevent default for horizontal swipes
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 10) {
            e.preventDefault();
        }
    }, { passive: false });
    
    card.addEventListener('touchend', () => {
        touchStartY = null;
        touchStartX = null;
    }, { passive: true });
});

// Array of video sources (YouTube embeds) - Updated with all 9 videos
const videos = [
  "https://www.youtube.com/embed/kM0DGVF_2nI?autoplay=1&mute=1&loop=1&playlist=kM0DGVF_2nI&playsinline=1",
  "https://www.youtube.com/embed/DnGYoeJO5k4?autoplay=1&mute=1&loop=1&playlist=DnGYoeJO5k4&playsinline=1",
  "https://www.youtube.com/embed/Iad1P_zLVDg?autoplay=1&mute=1&loop=1&playlist=Iad1P_zLVDg&playsinline=1",
  "https://www.youtube.com/embed/eTMQNJWU6kM?autoplay=1&mute=1&loop=1&playlist=eTMQNJWU6kM&playsinline=1",
  "https://www.youtube.com/embed/TW02CC3zA2w?autoplay=1&mute=1&loop=1&playlist=TW02CC3zA2w&playsinline=1",
  "https://www.youtube.com/embed/ate-m6SQRLQ?autoplay=1&mute=1&loop=1&playlist=ate-m6SQRLQ&playsinline=1",
  "https://www.youtube.com/embed/b62NLxnyhQM?autoplay=1&mute=1&loop=1&playlist=b62NLxnyhQM&playsinline=1",
  "https://www.youtube.com/embed/TVGPoQFIXbg?autoplay=1&mute=1&loop=1&playlist=TVGPoQFIXbg&playsinline=1",
  "https://www.youtube.com/embed/8L_pmftnD5c?autoplay=1&mute=1&loop=1&playlist=8L_pmftnD5c&playsinline=1"
];

let currentIndex = 0;

// Create progress dots
if (progressContainer) {
  videos.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('progress-dot');
    if (index === currentIndex) dot.classList.add('active');
    dot.addEventListener('click', () => {
      currentIndex = index;
      updateVideo();
    });
    progressContainer.appendChild(dot);
  });
}

function updateVideo() {
  if (!videoElement) return;
  
  videoElement.classList.add('video-fade-out');
  setTimeout(() => {
    videoElement.src = videos[currentIndex];
    videoElement.classList.remove('video-fade-out');
    videoElement.classList.add('video-fade-in');

    // Update dots
    document.querySelectorAll('.progress-dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });

    // Remove fade-in after a short delay
    setTimeout(() => {
      videoElement.classList.remove('video-fade-in');
    }, 500);
  }, 300);
}

// Button listeners
if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + videos.length) % videos.length;
    updateVideo();
  });
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % videos.length;
    updateVideo();
  });
}

// Optional: auto-play next video on end
if (videoElement) {
  videoElement.addEventListener('ended', () => {
    currentIndex = (currentIndex + 1) % videos.length;
    updateVideo();
  });
}

document.addEventListener('DOMContentLoaded', () => {
    const allVideos = document.querySelectorAll('.hero-video');
    allVideos.forEach(video => {
        video.play().catch(err => {
            console.warn("Autoplay blocked. Video will play on interaction.", err);
        });
    });

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = window.innerWidth <= 768 ? 60 : 80; // Adjust based on header height
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // High-DPI image upgrade (non-intrusive; preserves layout and dimensions)
    const upgradeImageToHiDpi = (img) => {
        const originalSrc = img.getAttribute('src');
        if (!originalSrc) return;
        const lastDotIndex = originalSrc.lastIndexOf('.');
        if (lastDotIndex < 0) return;

        const basePath = originalSrc.slice(0, lastDotIndex);
        const extension = originalSrc.slice(lastDotIndex);

        const candidates = [
            { path: `${basePath}@4x${extension}`, dpr: '4x' },
            { path: `${basePath}@3x${extension}`, dpr: '3x' },
            { path: `${basePath}@2x${extension}`, dpr: '2x' },
            { path: `${basePath}-4k${extension}`, dpr: '3x' },
            { path: `${basePath}-2x${extension}`, dpr: '2x' }
        ];

        const tryCandidate = (index) => {
            if (index >= candidates.length) return;
            const candidate = candidates[index];
            const testImage = new Image();
            testImage.onload = () => {
                // Use srcset so layout remains identical; browser picks higher-res on HiDPI
                img.setAttribute('srcset', `${candidate.path} ${candidate.dpr}`);
            };
            testImage.onerror = () => tryCandidate(index + 1);
            // Cache-bust to avoid false negatives
            const bust = candidate.path.includes('?') ? '&' : '?';
            testImage.src = `${candidate.path}${bust}v=${Date.now()}`;
        };

        tryCandidate(0);
    };

    // Automatically attempt to upgrade all images on the page
    const allImages = document.querySelectorAll('img');
    allImages.forEach((img) => upgradeImageToHiDpi(img));
    
    // Initialize 8K image quality enhancements
    enhanceImageQuality();
    lazyLoadImages();
    
    // Check WebP support and add class
    supportsWebP().then(supported => {
        if (supported) {
            document.documentElement.classList.add('webp');
        }
    });
});
