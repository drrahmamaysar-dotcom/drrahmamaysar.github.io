// رسوم متحركة متقدمة وتأثيرات خاصة

// متغيرات الرسوم المتحركة
let animationObserver;
let reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// تهيئة الرسوم المتحركة المتقدمة
document.addEventListener('DOMContentLoaded', function() {
    initAdvancedAnimations();
    setupParallaxEffects();
    initScrollAnimations();
    setupIntersectionObserver();
});

// تهيئة الرسوم المتحركة المتقدمة
function initAdvancedAnimations() {
    // تفعيل الرسوم المتحركة فقط إذا لم يفضل المستخدم تقليل الحركة
    if (!reducedMotion) {
        initParticleEffects();
        initFloatingElements();
        initMorphingShapes();
        initPulsingElements();
    }
    
    // رسوم متحركة للأزرار
    initButtonAnimations();
    
    // رسوم متحركة للنصوص
    initTextAnimations();
    
    // رسوم متحركة للصور
    initImageAnimations();
}

// إعداد تأثير المنظور
function setupParallaxEffects() {
    if (reducedMotion) return;
    
    window.addEventListener('scroll', throttle(updateParallax, 16));
    
    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(element => {
        element.style.transform = 'translateZ(0)';
    });
}

// تحديث تأثير المنظور
function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
}

// إعداد مراقب التقاطع المتقدم
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
        rootMargin: '0px 0px -10% 0px'
    };
    
    animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                handleElementVisibility(entry.target, entry.intersectionRatio);
            }
        });
    }, observerOptions);
    
    // مراقبة العناصر
    const animatedElements = document.querySelectorAll(
        '.game-card, .training-card, .contact-item, .hero-text, .about-text'
    );
    
    animatedElements.forEach(element => {
        element.classList.add('animation-ready');
        animationObserver.observe(element);
    });
}

// معالجة ظهور العناصر
function handleElementVisibility(element, ratio) {
    const delay = Array.from(element.parentNode.children).indexOf(element) * 100;
    
    setTimeout(() => {
        element.classList.add('animation-triggered');
        
        // تطبيق رسوم متحركة مختلفة حسب نوع العنصر
        if (element.classList.contains('game-card')) {
            animateGameCard(element);
        } else if (element.classList.contains('training-card')) {
            animateTrainingCard(element);
        } else if (element.classList.contains('contact-item')) {
            animateContactItem(element);
        } else if (element.classList.contains('hero-text')) {
            animateHeroText(element);
        }
    }, delay);
}

// رسوم متحركة لبطاقات الألعاب
function animateGameCard(element) {
    element.style.animation = 'slideInUp 0.6s cubic-bezier(0.25, 0.8, 0.25, 1) forwards';
    
    // إضافة تأثير الإطار المتحرك
    setTimeout(() => {
        const animatedBorder = element.querySelector('.animated-border');
        if (animatedBorder) {
            animatedBorder.style.animation = 'borderRotate 2s linear infinite';
        }
    }, 800);
}

// رسوم متحركة لبطاقات التدريب
function animateTrainingCard(element) {
    element.style.animation = 'fadeInUp 0.8s ease-out forwards';
    
    // تأثير التدريج اللوني
    const icon = element.querySelector('.training-icon');
    if (icon) {
        icon.style.animation = 'scaleIn 0.5s ease-out 0.3s both, pulse 2s infinite 1s';
    }
}

// رسوم متحركة لعناصر التواصل
function animateContactItem(element) {
    element.style.animation = 'slideInRight 0.6s ease-out forwards';
    
    // تأثير النبض للأيقونة
    const icon = element.querySelector('.contact-icon');
    if (icon) {
        icon.style.animation = 'pulse 2s infinite 0.5s';
    }
}

// رسوم متحركة للنص الرئيسي
function animateHeroText(element) {
    const children = element.children;
    Array.from(children).forEach((child, index) => {
        child.style.animation = `slideInRight 0.8s ease-out ${index * 0.2}s both`;
    });
}

// تهيئة تأثيرات الجسيمات
function initParticleEffects() {
    createParticleSystem();
}

// إنشاء نظام الجسيمات
function createParticleSystem() {
    const canvas = document.createElement('canvas');
    canvas.className = 'particle-canvas';
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.3;
    `;
    
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    // إعداد الكانفاس
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // إنشاء الجسيمات
    for (let i = 0; i < 50; i++) {
        particles.push(createParticle());
    }
    
    // تحديث ورسم الجسيمات
    function animate() {
        if (reducedMotion) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((particle, index) => {
            updateParticle(particle);
            drawParticle(ctx, particle);
            
            // إعادة إنشاء الجسيمات التيخرج من الشاشة
            if (particle.y > canvas.height + 50) {
                particles[index] = createParticle();
            }
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// إنشاء جسيم واحد
function createParticle() {
    return {
        x: Math.random() * window.innerWidth,
        y: -10,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.1,
        color: Math.random() > 0.5 ? '#47B5FF' : '#FFC72C'
    };
}

// تحديث الجسيم
function updateParticle(particle) {
    particle.y += particle.speed;
}

// رسم الجسيم
function drawParticle(ctx, particle) {
    ctx.save();
    ctx.globalAlpha = particle.opacity;
    ctx.fillStyle = particle.color;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
}

// تهيئة العناصر العائمة
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.float-animation');
    
    floatingElements.forEach((element, index) => {
        element.style.animation = `float ${3 + Math.random() * 2}s ease-in-out ${index * 0.5}s infinite`;
    });
}

// تهيئة الأشكال المتغيرة
function initMorphingShapes() {
    const morphElements = document.querySelectorAll('.morph-shape');
    
    morphElements.forEach(element => {
        element.style.animation = `morphShape 4s ease-in-out infinite`;
    });
}

// تهيئة العناصر النابضة
function initPulsingElements() {
    const pulseElements = document.querySelectorAll('.pulse-element');
    
    pulseElements.forEach((element, index) => {
        element.style.animation = `pulseCustom ${2 + Math.random()}s ease-in-out ${index * 0.3}s infinite`;
    });
}

// تهيئة رسوم متحركة الأزرار
function initButtonAnimations() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-game');
    
    buttons.forEach(button => {
        // تأثير الموجة عند النقر
        button.addEventListener('click', function(e) {
            createRippleEffect(this, e);
        });
        
        // تأثير الظل عند المرور
        button.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 10px 30px rgba(71, 181, 255, 0.3)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
}

// إنشاء تأثير الموجة
function createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// تهيئة رسوم متحركة النصوص
function initTextAnimations() {
    const textElements = document.querySelectorAll('.text-animate');
    
    textElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        
        // تقسيم النص إلى أحرف
        Array.from(text).forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.animation = `textReveal 0.5s ease-out ${index * 0.05}s forwards`;
            element.appendChild(span);
        });
    });
}

// تهيئة رسوم متحركة الصور
function initImageAnimations() {
    const images = document.querySelectorAll('.image-animate');
    
    images.forEach(image => {
        image.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotateY(10deg)';
        });
        
        image.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotateY(0deg)';
        });
    });
}

// تهيئة الرسوم المتحركة عند التمرير
function initScrollAnimations() {
    const scrollElements = document.querySelectorAll('.scroll-animate');
    
    window.addEventListener('scroll', throttle(() => {
        scrollElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('scroll-animated');
            }
        });
    }, 100));
}

// دالة التقييد للحديث
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
    };
}

// دالة التأخير
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// CSS animations مضافة ديناميكياً
function addCustomAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(-30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes scaleIn {
            from {
                opacity: 0;
                transform: scale(0.8);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        @keyframes float {
            0%, 100% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(-10px);
            }
        }
        
        @keyframes morphShape {
            0%, 100% {
                border-radius: 50%;
                transform: rotate(0deg);
            }
            25% {
                border-radius: 20%;
                transform: rotate(90deg);
            }
            50% {
                border-radius: 50%;
                transform: rotate(180deg);
            }
            75% {
                border-radius: 20%;
                transform: rotate(270deg);
            }
        }
        
        @keyframes pulseCustom {
            0%, 100% {
                transform: scale(1);
                box-shadow: 0 0 0 0 rgba(71, 181, 255, 0.4);
            }
            50% {
                transform: scale(1.05);
                box-shadow: 0 0 0 10px rgba(71, 181, 255, 0);
            }
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes textReveal {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes borderRotate {
            0% {
                border-image: linear-gradient(0deg, #47B5FF, #FFC72C, #47B5FF) 1;
            }
            100% {
                border-image: linear-gradient(360deg, #47B5FF, #FFC72C, #47B5FF) 1;
            }
        }
        
        @keyframes particleFloat {
            from {
                transform: translateY(0px) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            to {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    
    document.head.appendChild(style);
}

// تفعيل الرسوم المتحركة المخصصة
addCustomAnimations();

// مراقبة تغيير إعدادات إمكانية الوصول
window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
    reducedMotion = e.matches;
    
    if (reducedMotion) {
        // إيقاف جميع الرسوم المتحركة
        document.documentElement.style.setProperty('--animation-duration', '0.01s');
    } else {
        document.documentElement.style.removeProperty('--animation-duration');
    }
});

// تصدير الوظائف للاستخدام في ملفات أخرى
window.AnimationController = {
    initAdvancedAnimations,
    setupParallaxEffects,
    createParticleSystem,
    createRippleEffect,
    throttle,
    debounce
};