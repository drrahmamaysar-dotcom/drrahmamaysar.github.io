// نظام الذكاء الاصطناعي للاستشارات المتخصصة في ذوي الاحتياجات الخاصة

// متغيرات النظام
let isChatOpen = false;
let chatHistory = [];
let isTyping = false;

// قاعدة المعرفة المتخصصة
const knowledgeBase = {
    general: [
        {
            keywords: ['مرحبا', 'السلام', 'اهلا', 'Hello', 'Hi'],
            response: 'مرحباً بك! أنا مساعدك الذكي المتخصص في ذوي الاحتياجات الخاصة. كيف يمكنني مساعدتك اليوم؟'
        },
        {
            keywords: ['شكرا', 'ممتاز', 'جزاك', 'Thank you', 'thanks'],
            response: 'العفو! سعيد لمساعدتك. إذا كان لديك أي استفسارات أخرى، فأنا هنا دائماً.'
        },
        {
            keywords: ['مع السلامة', 'وداعا', 'Bye', 'goodbye'],
            response: 'مع السلامة! لا تتردد في التواصل معنا في أي وقت. تمنياتنا لك ولطفلك بالتوفيق.'
        }
    ],
    
    autism: [
        {
            keywords: ['توحد', 'autism', 'autistic'],
            response: 'اضطراب طيف التوحد هو حالة عصبية تؤثر على التفاعل الاجتماعي والتواصل والسلوك. الأطفال المصابون بالتوحد قد يظهرون:\n\n• صعوبات في التواصل الاجتماعي\n• اهتمامات محدودة ومكررة\n• حساسية للمؤثرات الحسية\n• صعوبة في فهم الإشارات الاجتماعية\n\nالتدخل المبكر والدعم المناسب يمكن أن يحدث فرقاً كبيراً في تطوير الطفل.'
        },
        {
            keywords: ['سلوك', 'behavior', 'مشكلة سلوكية'],
            response: 'التحديات السلوكية شائعة في ذوي الاحتياجات الخاصة. بعض الاستراتيجيات المفيدة:\n\n• تحديد أسباب السلوك (التواصل، الحساسية، الروتين)\n• استخدام تقنيات التهدئة المسبقة\n• توفير جدول زمني واضح ومتسق\n• التدريب على مهارات التواصل البديلة\n• استخدام التعزيز الإيجابي\n\nمن المهم استشارة أخصائي مختص لتقييم الحالة.'
        },
        {
            keywords: ['علاج', 'treatment', 'تدخل'],
            response: 'علاج ذوي الاحتياجات الخاصة يتطلب نهجاً متعدد التخصصات:\n\n• العلاج النفسي السلوكي\n• علاج النطق واللغة\n• العلاج المهني\n• العلاج الحركي\n• التدخل التعليمي المتخصص\n\nالعلاج المبكر هو المفتاح لتحقيق أفضل النتائج.'
        }
    ],
    
    speech: [
        {
            keywords: ['تأخير النطق', 'speech delay', 'لا يتكلم'],
            response: 'تأخير النطق مشكلة شائعة. الأسباب قد تشمل:\n\n• تأخر طبيعي في النمو\n• مشاكل في السمع\n• اضطرابات في العضلات المسؤولة عن النطق\n• اضطرابات في معالجة اللغة\n• التوحد أو مشاكل عصبية\n\nيُنصح بفحص السمع وتقييم شامل من أخصائي التخاطب.'
        },
        {
            keywords: ['تأتأة', 'stuttering', 'تلعثم'],
            response: 'التأتأة تؤثر على طلاقة الكلام. الأعراض تشمل:\n\n• تكرار الأصوات أو المقاطع\n• إطالة الأصوات\n• توقفات في الكلام\n• توتر عند التحدث\n\nالعلاج يشمل تقنيات التنفس وتمارين الطلاقة والتحدث البطيء.'
        }
    ],
    
    sensory: [
        {
            keywords: ['حساسية', 'sensory', 'إحساس'],
            response: 'اضطرابات المعالجة الحسية شائعة في ذوي الاحتياجات الخاصة:\n\n• حساسية مفرطة للصوت، الضوء، اللمس\n• نقص في الحساسية\n• صعوبة في تنظيم الاستجابة الحسية\n\nالاستراتيجيات:\n• تعديل البيئة المحيطة\n• استخدام تقنيات التحفيز المتدرج\n• توفير مساحات هادئة\n• العلاج المهني المتخصص'
        },
        {
            keywords: ['نشاط', 'exercise', 'حركة'],
            response: 'النشاط البدني مهم جداً لذوي الاحتياجات الخاصة:\n\n• يحسن التنسيق الحركي\n• يقلل السلوكيات المضطربة\n• يحسن النوم والمزاج\n• يزيد التركيز والانتباه\n\nأنشطة مفيدة: السباحة، المشي، الجمباز، اليوغا'
        }
    ],
    
    education: [
        {
            keywords: ['مدرسة', 'school', 'تعليم'],
            response: 'التعليم المناسب لذوي الاحتياجات الخاصة:\n\n• برامج التعليم الفردي\n• تعديل المنهج حسب الحاجة\n• استخدام وسائل بصرية وتفاعلية\n• تدريب المعلمين المتخصصين\n• الدعم النفسي والاجتماعي\n\nالتعاون بين المدرسة والأسرة أمر ضروري.'
        },
        {
            keywords: ['مهارات', 'skills', 'تطوير'],
            response: 'تطوير المهارات الأساسية:\n\n• المهارات الحياتية (الطعام، اللباس، النظافة)\n• المهارات الاجتماعية\n• مهارات التواصل\n• المهارات الأكاديمية\n• المهارات المهنية\n\nالتدريب المتدرج والممارسة المستمرة هما مفتاح النجاح.'
        }
    ],
    
    family: [
        {
            keywords: ['أسرة', 'family', 'ولي أمر'],
            response: 'دعم الأسرة ضروري:\n\n• قبول وتشجيع الطفل كما هو\n• عدم مقارنة الطفل بآخرين\n• التواصل المفتوح مع الأبناء\n• طلب المساعدة والدعم\n• الاهتمام بصحتهم النفسية\n\nالأسرة القوية هي أساس نجاح الطفل.'
        },
        {
            keywords: ['توتر', 'stress', 'ضغط'],
            response: 'التعامل مع الضغوط:\n\n• اقبل مشاعرك وتحدث عنها\n• تواصل مع عائلات أخرى في نفس الوضع\n• خذ فترات راحة منتظمة\n• ابحث عن الدعم المهني\n• احتفل بالانجازات الصغيرة\n\nصحتك النفسية مهمة لطفلك.'
        }
    ],
    
    practical: [
        {
            keywords: ['روتين', 'routine', 'جدول'],
            response: 'إنشاء روتين يومي مفيد:\n\n• أوقات ثابتة للنوم والاستيقاظ\n• جدول وجبات منتظم\n• أنشطة مفضلة في الأوقات المناسبة\n• فترات راحة وتخفيف الضغط\n• مرونة في التعامل مع التغييرات\n\nالروتين يعطي الأمان والثقة للطفل.'
        },
        {
            keywords: ['طعام', 'food', 'تغذية'],
            response: 'التغذية المناسبة:\n\n• نظام غذائي متوازن ومتنوع\n• تجنب الأطعمة المؤثرة على السلوك\n• تشجيع الطفل على المشاركة في تحضير الطعام\n• الصبر في تجربة أطعمة جديدة\n• استشارة أخصائي التغذية عند الحاجة\n\nبعض الأطفال قد يكون لديهم حساسيات غذائية.'
        }
    ]
};

// تهيئة نظام المحادثة
document.addEventListener('DOMContentLoaded', function() {
    initAIChat();
});

// تهيئة المحادثة الذكية
function initAIChat() {
    // إضافة اقتراحات سريعة
    addQuickSuggestions();
    
    // إضافة استقبال الصوت (اختياري)
    // initVoiceRecognition();
    
    console.log('تم تهيئة المحادثة الذكية');
}

// تبديل حالة المحادثة
function toggleChat() {
    const chatWindow = document.getElementById('aiChatWindow');
    
    if (isChatOpen) {
        chatWindow.classList.remove('active');
        isChatOpen = false;
    } else {
        chatWindow.classList.add('active');
        isChatOpen = true;
        
        // تركيز على حقل الإدخال
        setTimeout(() => {
            const input = document.getElementById('aiChatInput');
            if (input) input.focus();
        }, 300);
    }
}

// معالجة الضغط على مفاتيح الإدخال
function handleChatKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendAIMessage();
    }
}

// إرسال رسالة للذكاء الاصطناعي
function sendAIMessage() {
    const input = document.getElementById('aiChatInput');
    const message = input.value.trim();
    
    if (!message || isTyping) return;
    
    // إضافة رسالة المستخدم
    addMessage(message, 'user');
    
    // مسح حقل الإدخال
    input.value = '';
    
    // معالجة الرسالة
    processUserMessage(message);
}

// معالجة رسالة المستخدم
function processUserMessage(message) {
    // إضافة مؤشر الكتابة
    showTypingIndicator();
    
    // تأخير محاكاة التفكير
    setTimeout(() => {
        hideTypingIndicator();
        
        const response = generateResponse(message);
        addMessage(response, 'ai');
        
        // إضافة اقتراحات سريعة
        if (response.includes('هل تحتاج') || response.includes('يمكنك')) {
            addQuickSuggestions();
        }
        
    }, Math.random() * 2000 + 1000); // 1-3 ثواني
}

// توليد رد الذكاء الاصطناعي
function generateResponse(message) {
    const normalizedMessage = message.toLowerCase().trim();
    
    // البحث في قاعدة المعرفة
    for (const category in knowledgeBase) {
        const responses = knowledgeBase[category];
        
        for (const item of responses) {
            for (const keyword of item.keywords) {
                if (normalizedMessage.includes(keyword.toLowerCase())) {
                    return item.response;
                }
            }
        }
    }
    
    // ردود عامة
    const generalResponses = [
        'أفهم استفسارك. للحصول على مساعدة أكثر تخصصاً، أنصحك بالتواصل مع الدكتورة رحمة ميسر مباشرة عبر واتساب.',
        'هذا موضوع مهم في مجال ذوي الاحتياجات الخاصة. هل تريد معلومات أكثر تفصيلاً عن أي جانب معين؟',
        'شكراً لك على سؤالك. أنصحك بمراجعة المختصين لتقييم حالة طفلك بشكل فردي.',
        'أفهم قلقك. المشاكل السلوكية شائعة ويمكن التعامل معها بالطرق المناسبة. هل تريد نصائح عملية؟',
        'هل تحتاج لمعلومات عن استراتيجيات معينة أو تحويل لطبيب مختص؟'
    ];
    
    return generalResponses[Math.floor(Math.random() * generalResponses.length)];
}

// إضافة رسالة إلى المحادثة
function addMessage(text, sender) {
    const messagesContainer = document.getElementById('aiChatMessages');
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}-message message-appear`;
    
    messageElement.innerHTML = `
        <div class="message-content">${formatMessage(text)}</div>
    `;
    
    messagesContainer.appendChild(messageElement);
    
    // التمرير لأسفل
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // حفظ في التاريخ
    chatHistory.push({
        text: text,
        sender: sender,
        timestamp: new Date()
    });
}

// تنسيق الرسالة
function formatMessage(text) {
    return text
        .replace(/\n/g, '<br>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>');
}

// إضافة مؤشر الكتابة
function showTypingIndicator() {
    const messagesContainer = document.getElementById('aiChatMessages');
    const typingElement = document.createElement('div');
    typingElement.className = 'typing-indicator';
    typingElement.id = 'typingIndicator';
    typingElement.innerHTML = `
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
    `;
    
    messagesContainer.appendChild(typingElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    isTyping = true;
}

// إخفاء مؤشر الكتابة
function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
    isTyping = false;
}

// إضافة اقتراحات سريعة
function addQuickSuggestions() {
    const suggestions = [
        'ما هو التوحد؟',
        'كيف أعالج السلوكيات المضطربة؟',
        'متى يجب زيارة أخصائي التخاطب؟',
        'كيف أتعامل مع حساسية الطفل؟',
        'نصائح للتعامل مع الأسرة',
        'كيف أطور مهارات طفلي؟'
    ];
    
    // إزالة الاقتراحات السابقة
    const existingSuggestions = document.querySelector('.quick-suggestions');
    if (existingSuggestions) {
        existingSuggestions.remove();
    }
    
    const suggestionsContainer = document.createElement('div');
    suggestionsContainer.className = 'quick-suggestions';
    
    suggestions.forEach(suggestion => {
        const button = document.createElement('button');
        button.className = 'suggestion-btn';
        button.textContent = suggestion;
        button.onclick = () => {
            document.getElementById('aiChatInput').value = suggestion;
            sendAIMessage();
        };
        suggestionsContainer.appendChild(button);
    });
    
    const messagesContainer = document.getElementById('aiChatMessages');
    messagesContainer.appendChild(suggestionsContainer);
}

// إعادة تشغيل المحادثة
function restartChat() {
    const messagesContainer = document.getElementById('aiChatMessages');
    
    // مسح الرسائل
    messagesContainer.innerHTML = `
        <div class="message ai-message">
            <div class="message-content">
                مرحباً! أنا مساعدك الذكي المتخصص في ذوي الاحتياجات الخاصة. كيف يمكنني المساعدة اليوم؟
            </div>
        </div>
    `;
    
    // مسح التاريخ
    chatHistory = [];
    
    // إضافة اقتراحات جديدة
    addQuickSuggestions();
}

// تصدير المحادثة (ميزات إضافية)
function exportChat() {
    const chatData = {
        timestamp: new Date().toISOString(),
        history: chatHistory,
        statistics: {
            totalMessages: chatHistory.length,
            userMessages: chatHistory.filter(msg => msg.sender === 'user').length,
            aiMessages: chatHistory.filter(msg => msg.sender === 'ai').length
        }
    };
    
    const dataStr = JSON.stringify(chatData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `chat-history-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
}

// ميزات إضافية (اختيارية)

// تهيئة التعرف على الصوت
function initVoiceRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'ar-SA';
        
        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript;
            document.getElementById('aiChatInput').value = transcript;
            sendAIMessage();
        };
        
        // إضافة زر التسجيل
        const inputContainer = document.querySelector('.ai-chat-input');
        const voiceButton = document.createElement('button');
        voiceButton.className = 'voice-button';
        voiceButton.innerHTML = '🎤';
        voiceButton.onclick = () => recognition.start();
        inputContainer.appendChild(voiceButton);
    }
}

// تحليل مشاعر المستخدم
function analyzeSentiment(message) {
    const positiveWords = ['سعيد', 'رائع', 'ممتاز', 'جيد', 'حسن'];
    const negativeWords = ['حزين', 'قلق', 'صعب', 'مشكل', 'طوارئ'];
    
    const positive = positiveWords.some(word => message.includes(word));
    const negative = negativeWords.some(word => message.includes(word));
    
    if (positive && !negative) return 'positive';
    if (negative && !positive) return 'negative';
    return 'neutral';
}

// اقتراح مواعيد أو موارد
function suggestResources(message) {
    const suggestions = [];
    
    if (message.includes('موعد') || message.includes('حجز')) {
        suggestions.push({
            type: 'appointment',
            text: 'هل تريد حجز موعد مع الدكتورة؟',
            action: () => window.open('https://wa.me/201027986106?text=أريد حجز موعد', '_blank')
        });
    }
    
    if (message.includes('ملف') || message.includes('ورق')) {
        suggestions.push({
            type: 'resource',
            text: 'هل تحتاج لمصادر تعليمية؟',
            action: () => {
                // عرض قائمة بالموارد
                addMessage('يمكنني تزويدك بمصادر تعليمية متخصصة. ما نوع الموارد التي تحتاجها؟', 'ai');
            }
        });
    }
    
    return suggestions;
}

// تصدير الوظائف للاستخدام في ملفات أخرى
window.AIChat = {
    toggleChat,
    sendAIMessage,
    handleChatKeyPress,
    restartChat,
    exportChat
};