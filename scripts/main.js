// الوظائف الأساسية للموقع

document.addEventListener('DOMContentLoaded', function() {
    // تهيئة الموقع
    initWebsite();
    
    // إضافة مستمعي الأحداث
    setupEventListeners();
    
    // تشغيل الرسوم المتحركة
    initAnimations();
});

// تهيئة الموقع الأساسية
function initWebsite() {
    // ضبط التمرير السلس
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // ضبط اتجاه النص
    document.documentElement.lang = 'ar';
    document.documentElement.dir = 'rtl';
    
    // إضافة تأثيرات التمرير
    initScrollEffects();
    
    // تهيئة التنقل
    initNavigation();
    
    // تهيئة الأزرار
    initButtons();
    
    console.log('تم تحميل الموقع بنجاح');
}

// إعداد مستمعي الأحداث
function setupEventListeners() {
    // تتبع تمرير الصفحة
    window.addEventListener('scroll', handleScroll);
    
    // تتبع تغيير حجم النافذة
    window.addEventListener('resize', handleResize);
    
    // تتبع تحميل الصفحة
    window.addEventListener('load', handlePageLoad);
    
    // تتبع النقر على الروابط
    document.addEventListener('click', handleDocumentClick);
    
    // تتبع الضغط على مفاتيح معينة
    document.addEventListener('keydown', handleKeydown);
}

// تأثيرات التمرير
function initScrollEffects() {
    // إنشاء مراقب العناصر المرئية
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                
                // إضافة تأثير التأخير للعناصر المتتالية
                if (entry.target.classList.contains('stagger-animation')) {
                    const children = entry.target.children;
                    Array.from(children).forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('fade-in-up');
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);
    
    // مراقبة العناصر
    const elementsToObserve = document.querySelectorAll(
        '.game-card, .training-card, .contact-item, .achievement, .section-header'
    );
    
    elementsToObserve.forEach(el => {
        el.classList.add('stagger-animation');
        observer.observe(el);
    });
}

// تهيئة التنقل
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // حساب الإزاحة للشريط العلوي
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // تحديث الرابط النشط
                updateActiveNavLink(this);
            }
        });
    });
}

// تحديث الرابط النشط
function updateActiveNavLink(activeLink) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    activeLink.classList.add('active');
}

// تهيئة الأزرار
function initButtons() {
    // أزرار الحجز
    const bookingButtons = document.querySelectorAll('.btn-book, .btn-whatsapp');
    bookingButtons.forEach(button => {
        button.addEventListener('click', function() {
            trackButtonClick('booking', this.textContent.trim());
        });
    });
    
    // أزرار الألعاب
    const gameButtons = document.querySelectorAll('.btn-game');
    gameButtons.forEach(button => {
        button.addEventListener('click', function() {
            trackButtonClick('game', this.textContent.trim());
        });
    });
    
    // أزرار التدريب
    const trainingButtons = document.querySelectorAll('.btn-training');
    trainingButtons.forEach(button => {
        button.addEventListener('click', function() {
            trackButtonClick('training', this.textContent.trim());
        });
    });
}

// معالجة تمرير الصفحة
function handleScroll() {
    const scrollTop = window.pageYOffset;
    
    // تأثير الشريط العلوي
    const header = document.querySelector('.header');
    if (scrollTop > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // تحديث الروابط النشطة بناءً على الموضع
    updateActiveNavOnScroll();
    
    // تأثير العناصر الظاهرة
    updateScrollAnimations();
}

// تحديث الروابط النشطة بناءً على التمرير
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const scrollTop = window.pageYOffset;
    const headerHeight = document.querySelector('.header').offsetHeight;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 50;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// تحديث الرسوم المتحركة بناءً على التمرير
function updateScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in-up');
    
    animatedElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// معالجة تغيير حجم النافذة
function handleResize() {
    // إعادة حساب التخطيطات المعقدة
    updateLayoutCalculations();
}

// معالجة تحميل الصفحة
function handlePageLoad() {
    // إخفاء شاشة التحميل إذا وجدت
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
    
    // تشغيل الرسوم المتحركة الأولية
    animateOnLoad();
}

// معالجة النقرات العامة
function handleDocumentClick(e) {
    // إغلاق القوائم المنسدلة عند النقر خارجها
    const dropdowns = document.querySelectorAll('.dropdown.active');
    dropdowns.forEach(dropdown => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });
}

// معالجة الضغط على المفاتيح
function handleKeydown(e) {
    // مفتاح Escape للإغلاق
    if (e.key === 'Escape') {
        closeAllModals();
        closeAIChat();
    }
    
    // اختصارات لوحة المفاتيح
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case '1':
                e.preventDefault();
                scrollToSection('home');
                break;
            case '2':
                e.preventDefault();
                scrollToSection('games');
                break;
            case '3':
                e.preventDefault();
                scrollToSection('training');
                break;
            case '4':
                e.preventDefault();
                scrollToSection('about');
                break;
            case '5':
                e.preventDefault();
                scrollToSection('contact');
                break;
        }
    }
}

// التمرير إلى قسم محدد
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = section.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// تهيئة الرسوم المتحركة
function initAnimations() {
    // اللوجو المتحرك
    animateLogo();
    
    // الدوائر الدوارة
    initRotatingElements();
    
    // تأثيرات التفاعل
    initInteractionEffects();
}

// رسم اللوجو تدريجياً
function animateLogo() {
    const logoElements = document.querySelectorAll('.animated-logo *');
    logoElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.3}s`;
        element.style.animation = 'drawLogo 3s ease-in-out forwards';
    });
}

// تهيئة العناصر الدوارة
function initRotatingElements() {
    const rotatingElements = document.querySelectorAll('.rotating-circle, .rotating-circle-delayed');
    rotatingElements.forEach(element => {
        element.style.animation = 'rotate 8s linear infinite';
    });
}

// تهيئة تأثيرات التفاعل
function initInteractionEffects() {
    const hoverElements = document.querySelectorAll('.game-card, .training-card, .contact-item');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.classList.add('hover-lift');
        });
        
        element.addEventListener('mouseleave', function() {
            this.classList.remove('hover-lift');
        });
    });
}

// الرسوم المتحركة عند التحميل
function animateOnLoad() {
    // العناصر الرئيسية
    const heroElements = document.querySelectorAll('.hero-text > *');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('slide-in-right');
        }, index * 200);
    });
    
    // صورة الدكتورة
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        setTimeout(() => {
            heroImage.classList.add('slide-in-left');
        }, 500);
    }
}

// تحديث حسابات التخطيط
function updateLayoutCalculations() {
    // تحديث أي حسابات معقدة تحتاج إعادة حساب
    const gridElements = document.querySelectorAll('.games-grid, .training-grid');
    gridElements.forEach(grid => {
        grid.style.minHeight = 'auto';
    });
}

// إغلاق جميع النوافذ المنبثقة
function closeAllModals() {
    const modals = document.querySelectorAll('.modal.active');
    modals.forEach(modal => {
        modal.classList.remove('active');
    });
}

// إغلاق المحادثة الذكية
function closeAIChat() {
    const chatWindow = document.getElementById('aiChatWindow');
    if (chatWindow && chatWindow.classList.contains('active')) {
        chatWindow.classList.remove('active');
    }
}

// تتبع النقرات على الأزرار (للتحليلات)
function trackButtonClick(category, buttonText) {
    console.log(`زر نُقر: ${category} - ${buttonText}`);
    
    // يمكن إضافة تحليلات Google أو أدوات أخرى هنا
    if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
            event_category: category,
            event_label: buttonText
        });
    }
}

// التحقق من دعم المتصفح للميزات
function checkBrowserSupport() {
    const features = {
        intersectionObserver: 'IntersectionObserver' in window,
        cssAnimations: CSS.supports('animation', 'test'),
        cssTransforms: CSS.supports('transform', 'scale(1)'),
        localStorage: typeof Storage !== 'undefined'
    };
    
    console.log('دعم المتصفح:', features);
    return features;
}

// تحميل محتوى إضافي
function loadAdditionalContent() {
    // تحميل الموارد الإضافية بشكل غير متزامن
    const resources = [
        'scripts/games.js',
        'scripts/ai-chat.js',
        'scripts/animations.js'
    ];
    
    resources.forEach(resource => {
        const script = document.createElement('script');
        script.src = resource;
        script.async = true;
        document.head.appendChild(script);
    });
}

// تحسين الأداء
function optimizePerformance() {
    // تأجيل تحميل المحتوى غير الضروري
    setTimeout(loadAdditionalContent, 1000);
    
    // ضغط الصور
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
    });
}

// التحقق من إمكانية الوصول
function checkAccessibility() {
    // فحص الصور التوضيحية
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.alt) {
            console.warn('صورة بدون نص بديل:', img);
        }
    });
    
    // فحص الروابط
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        if (!link.textContent.trim() && !link.ariaLabel) {
            console.warn('رابط بدون نص واضح:', link);
        }
    });
}

// تشغيل التحسينات عند تحميل الصفحة
window.addEventListener('load', function() {
    optimizePerformance();
    checkAccessibility();
    checkBrowserSupport();
});

// تصدير الوظائف للاستخدام في ملفات أخرى
window.SiteUtils = {
    scrollToSection,
    closeAllModals,
    closeAIChat,
    trackButtonClick,
    checkBrowserSupport
};