/*
   PhishNetra - Cybersecurity Portfolio Website
   Interactive Logic & Features
*/

document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation Scrolled Background and Active Links
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Toggle header background class
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active link tracking on scroll
        let currentSectionId = '';
        sections.forEach(sec => {
            const secTop = sec.offsetTop - 150;
            const secHeight = sec.clientHeight;
            if (window.scrollY >= secTop && window.scrollY < secTop + secHeight) {
                currentSectionId = sec.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // Mobile Hamburger Menu
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const navList = document.querySelector('nav ul');

    mobileToggle.addEventListener('click', () => {
        navList.classList.toggle('mobile-active');
        const icon = mobileToggle.querySelector('i');
        if (navList.classList.contains('mobile-active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('mobile-active');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // 2. Typing terminal text in Hero Section
    const taglineElement = document.querySelector('.tagline-text');
    const phrases = [
        "Real-Time Anti-Phishing Shield.",
        "Secure Your Browsing Experience.",
        "Zero-Trust Extension and Threat Classifier.",
        "AI-Powered Threat Analysis."
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            taglineElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            taglineElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 80;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end of sentence
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; // Pause before typing next
        }

        setTimeout(typeEffect, typeSpeed);
    }
    
    if (taglineElement) {
        typeEffect();
    }

    // 3. Cyber Canvas Particle Stream background
    const canvas = document.getElementById('cyber-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        // Binary falling characters and network nodes hybrid background
        const charArr = ['0', '1', 'Q', 'X', 'P', 'H', 'I', 'S', 'H'];
        const maxColumns = Math.floor(width / 24);
        const columnHeights = Array(maxColumns).fill(0);
        
        const nodes = [];
        const maxNodes = 40;
        for (let i = 0; i < maxNodes; i++) {
            nodes.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                radius: Math.random() * 1.5 + 1
            });
        }

        function drawCyberBg() {
            ctx.fillStyle = 'rgba(3, 6, 17, 0.1)';
            ctx.fillRect(0, 0, width, height);

            // Draw floating nodes & network connections
            ctx.strokeStyle = 'rgba(0, 240, 255, 0.05)';
            ctx.lineWidth = 0.5;
            for (let i = 0; i < maxNodes; i++) {
                const n1 = nodes[i];
                n1.x += n1.vx;
                n1.y += n1.vy;

                if (n1.x < 0 || n1.x > width) n1.vx *= -1;
                if (n1.y < 0 || n1.y > height) n1.vy *= -1;

                ctx.fillStyle = 'rgba(0, 240, 255, 0.2)';
                ctx.beginPath();
                ctx.arc(n1.x, n1.y, n1.radius, 0, Math.PI * 2);
                ctx.fill();

                for (let j = i + 1; j < maxNodes; j++) {
                    const n2 = nodes[j];
                    const dist = Math.hypot(n1.x - n2.x, n1.y - n2.y);
                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(n1.x, n1.y);
                        ctx.lineTo(n2.x, n2.y);
                        ctx.stroke();
                    }
                }
            }

            // Draw falling code stream bits in columns occasionally
            ctx.fillStyle = 'rgba(0, 240, 255, 0.15)';
            ctx.font = '10px monospace';
            columnHeights.forEach((y, index) => {
                if (Math.random() > 0.985) {
                    const text = charArr[Math.floor(Math.random() * charArr.length)];
                    const x = index * 24;
                    ctx.fillText(text, x, y);
                    columnHeights[index] = (y > height || Math.random() > 0.98) ? 0 : y + 12;
                }
            });

            requestAnimationFrame(drawCyberBg);
        }

        drawCyberBg();
    }

    // 4. Interactive URL Scanning Simulator
    const simulatorBtn = document.getElementById('simulate-scan-btn');
    const simulatorInput = document.getElementById('simulator-url');
    const extensionPopup = document.querySelector('.extension-popup');
    const statusTitle = document.querySelector('.status-title');
    const domainScanned = document.querySelector('.domain-scanned');
    const scoreVal = document.querySelector('.score-value');
    const progressSegments = document.querySelectorAll('.segment');
    const sslStatusVal = document.getElementById('ssl-status-val');
    const domainAgeVal = document.getElementById('domain-age-val');
    const riskSignalsList = document.querySelector('.risk-signals-list');

    // Quick tag scan listeners
    const quickTags = document.querySelectorAll('.quick-tag');
    quickTags.forEach(tag => {
        tag.addEventListener('click', () => {
            simulatorInput.value = tag.getAttribute('data-url');
            runScan(tag.getAttribute('data-url'));
        });
    });

    if (simulatorBtn) {
        simulatorBtn.addEventListener('click', () => {
            const urlValue = simulatorInput.value.trim();
            if (urlValue) {
                runScan(urlValue);
            }
        });

        simulatorInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const urlValue = simulatorInput.value.trim();
                if (urlValue) {
                    runScan(urlValue);
                }
            }
        });
    }

    function runScan(urlStr) {
        // Normalise protocol clean
        let displayDomain = urlStr.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0];
        domainScanned.textContent = displayDomain.toLowerCase();

        // 1. Scanning State Animation
        statusTitle.textContent = "SCANNING...";
        statusTitle.className = "status-title text-neon-blue";
        scoreVal.textContent = "--/100";
        sslStatusVal.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Checking`;
        sslStatusVal.className = "meta-item-value text-neon-blue";
        domainAgeVal.textContent = "Querying WHOIS...";
        domainAgeVal.className = "meta-item-value text-neon-blue";
        
        // Reset segments
        progressSegments.forEach(seg => {
            seg.className = "segment";
        });

        // Set scanning class on popup
        extensionPopup.className = "extension-popup border-neon-blue";

        riskSignalsList.innerHTML = `
            <li>Analyzing protocol headers...</li>
            <li>Checking reputation databases...</li>
        `;

        // 2. Delayed Result Processing
        setTimeout(() => {
            // Determine result structure
            let threatState = 'safe'; // 'safe', 'suspicious', 'dangerous'
            let score = 10;
            let sslSecure = true;
            let domainAge = '5 Years, 4 Months';
            let signals = [];

            // Helper check values
            const cleanUrl = urlStr.toLowerCase();
            const hasHttps = urlStr.startsWith('https://');
            const hasHttp = urlStr.startsWith('http://');

            // EXACT MATCHES FOR SCREENSHOTS
            if (cleanUrl.includes('secure-login-paytm-verification.free-offer.xyz')) {
                threatState = 'dangerous';
                score = 70;
                sslSecure = false;
                domainAge = 'age unavailable';
                signals = [
                    "Connection is not secure (HTTP instead of HTTPS).",
                    "URL length is greater than 25 characters."
                ];
            } else if (cleanUrl.includes('wrs51.winshipway.com')) {
                threatState = 'suspicious';
                score = 55;
                sslSecure = false;
                domainAge = '20 Years, 1 Month';
                signals = [
                    "Connection is not secure (HTTP instead of HTTPS).",
                    "URL length is greater than 25 characters."
                ];
            } else if (cleanUrl.includes('antigravity.google')) {
                threatState = 'safe';
                score = 15;
                sslSecure = true;
                domainAge = '9 Months';
                signals = [
                    "URL length is greater than 25 characters." // Keep matches exact to screenshot
                ];
            } else {
                // DYNAMIC PARSER ALGORITHM
                // SSL logic
                if (hasHttp || (!hasHttps && Math.random() > 0.4)) {
                    sslSecure = false;
                    signals.push("Connection is not secure (HTTP instead of HTTPS).");
                }

                // URL length logic
                if (displayDomain.length > 25) {
                    signals.push("URL length is greater than 25 characters.");
                }

                // Suspicious Keyword checks
                const suspiciousWords = ['login', 'paytm', 'verification', 'free', 'offer', 'verify', 'secure', 'bank', 'signin', 'account', 'update', 'claim', 'gift', 'paypal'];
                let foundWords = suspiciousWords.filter(word => cleanUrl.includes(word));
                if (foundWords.length > 0) {
                    signals.push(`Suspicious keyword detected in URL: "${foundWords[0]}".`);
                }

                // TLD checks
                const badTlds = ['.xyz', '.cc', '.top', '.tk', '.fit', '.free', '.offer', '.info', '.click', '.gq'];
                let matchingTld = badTlds.find(tld => displayDomain.endsWith(tld));
                if (matchingTld) {
                    signals.push(`Untrusted TLD (${matchingTld}) commonly used by threat actors.`);
                }

                // Dots check
                const dotCount = (displayDomain.match(/\./g) || []).length;
                if (dotCount > 3) {
                    signals.push("Excessive subdomains detected (potential URL spoofing).");
                }

                // IP Check
                const isIp = /^[0-9.]+$/.test(displayDomain.replace(/:[0-9]+$/, ''));
                if (isIp) {
                    signals.push("Raw IP address used instead of readable domain name.");
                }

                // Evaluate scores based on signal count
                if (signals.length >= 3) {
                    threatState = 'dangerous';
                    score = Math.floor(Math.random() * 20) + 70; // 70 to 90
                    domainAge = 'age unavailable';
                } else if (signals.length === 2) {
                    threatState = 'suspicious';
                    score = Math.floor(Math.random() * 15) + 50; // 50 to 65
                    domainAge = Math.random() > 0.5 ? '1 Year, 2 Months' : '20 Years, 1 Month';
                } else {
                    threatState = 'safe';
                    score = Math.floor(Math.random() * 15) + 5; // 5 to 20
                    domainAge = Math.random() > 0.5 ? '9 Months' : '6 Years, 8 Months';
                    if (signals.length === 0) {
                        // Safe and clean, no risks
                    }
                }
            }

            // 3. Render Output Results
            // Set state theme
            extensionPopup.className = `extension-popup ${threatState}`;

            if (threatState === 'safe') {
                statusTitle.textContent = "SAFE";
                statusTitle.className = "status-title text-neon-green";
            } else if (threatState === 'suspicious') {
                statusTitle.textContent = "SUSPICIOUS";
                statusTitle.className = "status-title text-neon-orange";
            } else {
                statusTitle.textContent = "DANGEROUS";
                statusTitle.className = "status-title text-neon-red";
            }

            // Score update
            scoreVal.textContent = `${score}/100`;

            // Segment illumination (10 segments total)
            const activeSegments = Math.round(score / 10);
            progressSegments.forEach((seg, i) => {
                if (i < activeSegments) {
                    seg.className = `segment ${threatState}-active`;
                } else {
                    seg.className = "segment";
                }
            });

            // SSL Lock render
            if (sslSecure) {
                sslStatusVal.innerHTML = `<i class="fas fa-lock"></i> Secure`;
                sslStatusVal.className = "meta-item-value text-neon-green";
            } else {
                sslStatusVal.innerHTML = `<i class="fas fa-lock-open"></i> Insecure`;
                sslStatusVal.className = "meta-item-value text-neon-red";
            }

            // WHOIS Domain Age render
            domainAgeVal.textContent = domainAge;
            domainAgeVal.className = "meta-item-value text-primary";

            // Risk Signals listing
            if (signals.length === 0) {
                riskSignalsList.innerHTML = `<li>No risk signals detected. The URL appears to be authentic.</li>`;
            } else {
                riskSignalsList.innerHTML = '';
                signals.forEach(sig => {
                    const li = document.createElement('li');
                    li.textContent = sig;
                    riskSignalsList.appendChild(li);
                });
            }
        }, 1200); // 1.2s delay to simulate analysis
    }

    // 5. Tabs Filter Logic in Screenshots Gallery
    const filterTabs = document.querySelectorAll('.filter-tab');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filterValue = tab.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // 6. Lightbox Modal Gallery Preview Control
    const lightboxModal = document.getElementById('gallery-lightbox');
    const lightboxImg = lightboxModal.querySelector('.lightbox-img');
    const lightboxTitle = lightboxModal.querySelector('.lightbox-title');
    const lightboxClose = lightboxModal.querySelector('.lightbox-close-btn');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('.gallery-img');
            const title = item.querySelector('.gallery-item-title').textContent;
            
            lightboxImg.src = img.src;
            lightboxTitle.textContent = title;
            
            lightboxModal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Disable page scrolling
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightboxModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Enable scrolling
        });

        // Click outside image closes lightbox
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                lightboxModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // 7. Clone Repository command clipboard copying
    const copyBtn = document.querySelector('.clone-copy-btn');
    const cloneCode = document.querySelector('.clone-code');

    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const tempInput = document.createElement('input');
            tempInput.value = cloneCode.textContent;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);

            // Change icon to tick
            const icon = copyBtn.querySelector('i');
            icon.className = 'fas fa-check text-neon-green';
            
            setTimeout(() => {
                icon.className = 'far fa-clone';
            }, 2000);
        });
    }

    // 8. Contact Form Handler (Deprecated in favor of direct mailto link in HTML)

    // 9. Video Mock Player Click Event
    const videoContainer = document.querySelector('.video-container');
    if (videoContainer) {
        videoContainer.addEventListener('click', () => {
            videoContainer.innerHTML = `
                <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/HUilP9kW_G8?autoplay=1" 
                    title="PhishNetra Demo Video" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen
                    style="position: absolute; top:0; left:0; width:100%; height:100%; border:none; border-radius: 12px;">
                </iframe>
            `;
        });
    }

    // 10. Scroll Reveal Animation triggers
    const revealElements = document.querySelectorAll('.reveal');
    
    function checkReveal() {
        const triggerBottom = window.innerHeight * 0.85;

        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', checkReveal);
    // Initial check on load
    checkReveal();
});
