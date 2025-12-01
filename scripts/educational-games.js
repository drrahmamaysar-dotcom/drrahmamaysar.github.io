// نظام إدارة الألعاب التعليمية التفاعلية
class EducationalGames {
    constructor() {
        this.currentGame = null;
        this.currentLevel = 1;
        this.score = 0;
        this.maxLevel = 5;
        this.currentQuestion = null; // لحفظ السؤال الحالي
        this.usedHistoryQuestions = new Set(); // تتبع أسئلة التاريخ المستخدمة
        this.usedGeographyQuestions = new Set(); // تتبع أسئلة الجغرافيا المستخدمة
        this.gameData = {
            counting: {
                title: "العد والأشكال",
                questions: [
                            { shapes: ['🍎', '🍎', '🍎'], answer: 3 },
                            { shapes: ['🎈', '🎈', '🎈', '🎈'], answer: 4 },
                            { shapes: ['⭐', '⭐', '⭐', '⭐', '⭐'], answer: 5 },
                            { shapes: ['🌟', '🌟', '🌟', '🌟', '🌟', '🌟', '🌟', '🌟'], answer: 8 },
                            { shapes: ['🎯', '🎯', '🎯', '🎯', '🎯', '🎯', '🎯', '🎯', '🎯', '🎯', '🎯', '🎯'], answer: 12 }
                        ]
            },
            addition: {
                title: "جمع الأرقام",
                questions: [
                            { num1: '٢', num2: '١', options: ['٢', '٣', '٤'], correctAnswer: '٣' },
                            { num1: '٣', num2: '٢', options: ['٤', '٥', '٦'], correctAnswer: '٥' },
                            { num1: '٥', num2: '٣', options: ['٧', '٨', '٩'], correctAnswer: '٨' },
                            { num1: '٧', num2: '٤', options: ['١٠', '١١', '١٢'], correctAnswer: '١١' },
                            { num1: '٩', num2: '٦', options: ['١٤', '١٥', '١٦'], correctAnswer: '١٥' }
                        ]
            },
            subtraction: {
                title: "طرح الأرقام",
                questions: [
                            { num1: '٣', num2: '١', options: ['١', '٢', '٣'], correctAnswer: '٢' },
                            { num1: '٥', num2: '٢', options: ['٢', '٣', '٤'], correctAnswer: '٣' },
                            { num1: '٨', num2: '٣', options: ['٤', '٥', '٦'], correctAnswer: '٥' },
                            { num1: '١٠', num2: '٤', options: ['٥', '٦', '٧'], correctAnswer: '٦' },
                            { num1: '١٥', num2: '٦', options: ['٨', '٩', '١٠'], correctAnswer: '٩' }
                        ]
            },
            letters: {
                title: "تعلم الحروف",
                questions: [
                            { letter: 'أ', options: ['أ', 'ب', 'ت'], correctIndex: 0 },
                            { letter: 'ب', options: ['د', 'ب', 'ج'], correctIndex: 1 },
                            { letter: 'ت', options: ['ث', 'ت', 'ط'], correctIndex: 1 },
                            { letter: 'ث', options: ['ت', 'ث', 'ذ'], correctIndex: 1 },
                            { letter: 'ج', options: ['ح', 'ج', 'خ'], correctIndex: 1 }
                        ]
            },
            words: {
                title: "بناء الكلمات",
                questions: [
                            { letters: ['ب', 'ي', 'ت'], word: 'بيت', hint: 'مكان العيش' },
                            { letters: ['ل', 'ب', 'ن'], word: 'لبن', hint: 'مشروب أبيض مفيد' },
                            { letters: ['ك', 'ت', 'اب'], word: 'كتاب', hint: 'نتعلم منه' },
                            { letters: ['ش', 'ر', 'ب'], word: 'شرب', hint: 'نفعله للعطش' },
                            { letters: ['م', 'د', 'ر', 'س'], word: 'مدرس', hint: 'يعلم في المدرسة' }
                        ]
            },
            history: {
                title: "تاريخ مصر",
                questions: [
                            { question: "ما لون علم مصر؟", options: ["أحمر وأبيض", "أزرق وأبيض", "أخضر وأبيض"], correctIndex: 0 },
                            { question: "ما هو نهر مصر الكبير؟", options: ["النيل", "الفرات", "دجلة"], correctIndex: 0 },
                            { question: "أين تقع أهرامات الجيزة؟", options: ["الجيزة", "القاهرة", "الإسكندرية"], correctIndex: 0 },
                            { question: "ما اسم عاصمة مصر؟", options: ["القاهرة", "الإسكندرية", "الجيزة"], correctIndex: 0 },
                            { question: "ما لون الفراعنة في الصور القديمة؟", options: ["ذهبي", "فضي", "نحاسي"], correctIndex: 0 },
                            { question: "ما اسم أكبر مسجد في مصر؟", options: ["الجامع الأزهر", "مسجد الفتاح", "مسجد النور"], correctIndex: 0 },
                            { question: "ما لون أهرامات الجيزة؟", options: ["بني", "أبيض", "رمادي"], correctIndex: 0 },
                            { question: "ما اسم البحر الذي يحد مصر؟", options: ["البحر الأحمر", "البحر الأسود", "البحر الأبيض"], correctIndex: 0 },
                            { question: "ما لون أرض مصر؟", options: ["بني", "أخضر", "أزرق"], correctIndex: 0 },
                            { question: "ما اسم المبنى الكبير في القاهرة؟", options: ["برج القاهرة", "برج لندن", "برج إيفل"], correctIndex: 0 },
                            { question: "ما لون الماء في نهر النيل؟", options: ["أزرق وأخضر", "أصفر", "أحمر"], correctIndex: 0 },
                            { question: "ما اسم المدينة التي تقع على البحر؟", options: ["الإسكندرية", "الجيزة", "الأقصر"], correctIndex: 0 },
                            { question: "ما لون السماء؟", options: ["أزرق", "أخضر", "أحمر"], correctIndex: 0 },
                            { question: "ما اسم الشجر الذي يوجد على ضفاف النيل؟", options: ["النخيل", "البرتقال", "الموز"], correctIndex: 0 },
                            { question: "ما لون الشمس؟", options: ["أصفر", "أزرق", "أحمر"], correctIndex: 0 },
                            { question: "ما اسم الطائر المصري الكبير؟", options: ["البجع", "العصفور", "النسر"], correctIndex: 0 },
                            { question: "ما لون السلم في صور الفراعنة؟", options: ["ذهبي", "فضي", "برونزي"], correctIndex: 0 },
                            { question: "ما اسم الكتاب القديم في مصر؟", options: ["بردي", "ورق", "جلد"], correctIndex: 0 },
                            { question: "ما لون رمال الصحراء المصرية؟", options: ["بني", "أبيض", "أزرق"], correctIndex: 0 },
                            { question: "ما اسم البيت القديم في مصر؟", options: ["القباب", "العمارات", "البيوت"], correctIndex: 0 }
                        ]
            },
            geography: {
                title: "جغرافيا مصر",
                questions: [
                            { question: "ما هي عاصمة مصر؟", options: ["القاهرة", "الإسكندرية", "الجيزة"], correctIndex: 0 },
                            { question: "في أي قارة تقع مصر؟", options: ["آسيا", "أفريقيا", "أوروبا"], correctIndex: 1 },
                            { question: "أين تقع أهرامات الجيزة؟", options: ["القاهرة", "الإسكندرية", "الجيزة"], correctIndex: 2 },
                            { question: "ما هو أطول نهر في العالم؟", options: ["النيل", "الفرات", "دجلة"], correctIndex: 0 },
                            { question: "أين يقع متحف مصر؟", options: ["ميدان التحرير", "شبرا", "المحور"], correctIndex: 0 },
                            { question: "ما هو省会 مصر الكبرى؟", options: ["القاهرة", "الإسكندرية", "الجيزة"], correctIndex: 0 },
                            { question: "أين تقع محافظة أسوان؟", options: ["جنوب مصر", "شمال مصر", "وسط مصر"], correctIndex: 0 },
                            { question: "ما هو البحر الذي يحد مصر من الشرق؟", options: ["البحر الأحمر", "البحر المتوسط", "بحر قزوين"], correctIndex: 0 },
                            { question: "أين يقع برج القاهرة؟", options: ["المعادي", "ميدان التحرير", "المهندسين"], correctIndex: 1 },
                            { question: "ما هي ثاني أكبر مدينة في مصر؟", options: ["الإسكندرية", "الجيزة", "الأقصر"], correctIndex: 0 },
                            { question: "أين يقع الجامع الأزهر؟", options: ["الإسكندرية", "القاهرة", "الجيزة"], correctIndex: 1 },
                            { question: "ما هو نهر مصر الرئيسي؟", options: ["النيل", "الفرات", "دجلة"], correctIndex: 0 },
                            { question: "أين تقع منطقة الأهرامات؟", options: ["الجيزة", "القاهرة", "الإسكندرية"], correctIndex: 0 },
                            { question: "ما هي منطقة الصعيد؟", options: ["جنوب مصر", "شمال مصر", "الوادي الجديد"], correctIndex: 0 },
                            { question: "أين يقع معهد كليوباترا؟", options: ["الإسكندرية", "القاهرة", "الجيزة"], correctIndex: 0 },
                            { question: "ما هي أكبر محافظة في مصر؟", options: ["الوادي الجديد", "البحر الأحمر", "البحر الأحمر"], correctIndex: 0 },
                            { question: "أين يقع جامع الأزهر؟", options: ["القاهرة", "الإسكندرية", "الجيزة"], correctIndex: 0 },
                            { question: "ما هو نهر الدلتا؟", options: ["فرع من النيل", "الفرات", "دجلة"], correctIndex: 0 },
                            { question: "أين تقع مكتبة الإسكندرية؟", options: ["الإسكندرية", "القاهرة", "الجيزة"], correctIndex: 0 },
                            { question: "ما هي منطقة الشرق الأوسط؟", options: ["قناة السويس", "السين", "البرزج"], correctIndex: 0 }
                        ]
            }
        };

        this.init();
    }

    init() {
        // تحديث عرض المستويات
        this.updateProgress();
        
        // إضافة مستمعي الأحداث
        this.addEventListeners();
    }

    generateDynamicMathQuestion(operation, level) {
        // تحديد نطاق الأرقام حسب المستوى
        let maxNum, num1, num2, answer;
        
        switch (level) {
            case 1:
                maxNum = 5;
                break;
            case 2:
                maxNum = 8;
                break;
            case 3:
                maxNum = 12;
                break;
            case 4:
                maxNum = 15;
                break;
            case 5:
                maxNum = 20;
                break;
            default:
                maxNum = 10;
        }

        // توليد رقم عشوائي أول
        num1 = Math.floor(Math.random() * maxNum) + 1;
        
        // توليد رقم ثاني للجمع أو رقم أصغر للطرح
        if (operation === 'addition') {
            num2 = Math.floor(Math.random() * maxNum) + 1;
            answer = num1 + num2;
        } else { // subtraction
            num2 = Math.floor(Math.random() * num1) + 1; // ضمان نتيجة موجبة
            answer = num1 - num2;
        }

        // تحويل الأرقام للعربية
        const arabicNum1 = this.toArabicNumerals(num1);
        const arabicNum2 = this.toArabicNumerals(num2);
        const arabicAnswer = this.toArabicNumerals(answer);

        // توليد خيارات خاطئة قريبة من الإجابة الصحيحة
        const wrongOptions = [];
        const range = Math.max(2, Math.floor(answer * 0.3)); // نطاق للخطأ
        
        // خيار أصغر
        let wrong1 = answer - Math.floor(Math.random() * range) - 1;
        if (wrong1 < 0) wrong1 = 0;
        wrongOptions.push(this.toArabicNumerals(wrong1));

        // خيار أكبر
        let wrong2 = answer + Math.floor(Math.random() * range) + 1;
        wrongOptions.push(this.toArabicNumerals(wrong2));

        // مزج الخيارات مع الإجابة الصحيحة
        const allOptions = [arabicAnswer, ...wrongOptions].sort(() => Math.random() - 0.5);

        return {
            num1: arabicNum1,
            num2: arabicNum2,
            options: allOptions,
            correctAnswer: arabicAnswer
        };
    }

    toArabicNumerals(num) {
        const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
        return String(num).split('').map(digit => arabicNumerals[parseInt(digit)]).join('');
    }

    generateDynamicHistoryQuestion(level) {
        const questions = this.gameData.history.questions;
        
        // إنشاء قائمة الأسئلة غير المستخدمة
        const availableQuestions = questions.map((_, index) => index).filter(index => !this.usedHistoryQuestions.has(index));
        
        // إذا تم استخدام جميع الأسئلة، إعادة تعيين المجموعة
        if (availableQuestions.length === 0) {
            this.usedHistoryQuestions.clear();
            const resetAvailable = questions.map((_, index) => index);
            return this.getQuestionFromList(questions, resetAvailable, this.usedHistoryQuestions);
        }
        
        return this.getQuestionFromList(questions, availableQuestions, this.usedHistoryQuestions);
    }

    generateDynamicGeographyQuestion(level) {
        const questions = this.gameData.geography.questions;
        
        // إنشاء قائمة الأسئلة غير المستخدمة
        const availableQuestions = questions.map((_, index) => index).filter(index => !this.usedGeographyQuestions.has(index));
        
        // إذا تم استخدام جميع الأسئلة، إعادة تعيين المجموعة
        if (availableQuestions.length === 0) {
            this.usedGeographyQuestions.clear();
            const resetAvailable = questions.map((_, index) => index);
            return this.getQuestionFromList(questions, resetAvailable, this.usedGeographyQuestions);
        }
        
        return this.getQuestionFromList(questions, availableQuestions, this.usedGeographyQuestions);
    }

    getQuestionFromList(questions, availableQuestions, usedQuestionsSet) {
        // اختيار سؤال عشوائي من الأسئلة المتاحة
        const randomIndex = Math.floor(Math.random() * availableQuestions.length);
        const questionIndex = availableQuestions[randomIndex];
        
        // إضافة السؤال إلى قائمة الأسئلة المستخدمة
        usedQuestionsSet.add(questionIndex);
        
        const question = questions[questionIndex];
        
        // خلط الخيارات عشوائياً
        const shuffledOptions = [...question.options].sort(() => Math.random() - 0.5);
        const correctIndex = shuffledOptions.indexOf(question.options[question.correctIndex]);
        
        return {
            question: question.question,
            options: shuffledOptions,
            correctIndex: correctIndex
        };
    }

    addEventListeners() {
        // إغلاق النافذة المنبثقة بالضغط خارجها
        document.getElementById('resultModal').addEventListener('click', (e) => {
            if (e.target.id === 'resultModal') {
                this.hideResultModal();
            }
        });

        // منع إغلاق النافذة المنبثقة بالضغط على محتواها
        document.querySelector('.modal-content').addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    updateProgress() {
        // تحديث شريط التقدم لكل لعبة
        Object.keys(this.gameData).forEach(gameType => {
            const progressElement = document.querySelector(`[data-progress="${gameType}"]`);
            if (progressElement) {
                const savedLevel = localStorage.getItem(`${gameType}Level`) || 1;
                const progress = (savedLevel / this.maxLevel) * 100;
                progressElement.style.width = `${progress}%`;

                // تحديث عرض المستوى الحالي
                const gameCard = document.querySelector(`[data-game="${gameType}"]`);
                if (gameCard) {
                    const levelDisplay = gameCard.querySelector('.current-level');
                    if (levelDisplay) {
                        levelDisplay.textContent = savedLevel;
                    }
                }
            }
        });
    }

    startGame(gameType, level = 1) {
        this.currentGame = gameType;
        this.currentLevel = level;
        this.score = parseInt(localStorage.getItem(`${gameType}Score`)) || 0;
        this.currentQuestion = null; // مسح السؤال السابق
        
        // إخفاء البطاقات وإظهار منطقة اللعبة
        document.querySelector('.games-sections').style.display = 'none';
        document.getElementById('gameArea').classList.remove('hidden');
        
        // تحديث معلومات اللعبة
        document.getElementById('gameTitle').textContent = this.gameData[gameType].title;
        document.getElementById('currentLevelNum').textContent = level;
        document.getElementById('currentScore').textContent = this.score;
        
        // بدء اللعبة
        this.loadQuestion();
    }

    loadQuestion() {
        const gameData = this.gameData[this.currentGame];
        const questionIndex = this.currentLevel - 1;
        
        if (questionIndex >= gameData.questions.length) {
            this.completeLevel();
            return;
        }

        let question = gameData.questions[questionIndex];
        
        // توليد أسئلة رياضية ديناميكية للجمع والطرح
        if (this.currentGame === 'addition' || this.currentGame === 'subtraction') {
            question = this.generateDynamicMathQuestion(this.currentGame, this.currentLevel);
            this.currentQuestion = question; // حفظ السؤال الديناميكي
        } 
        // توليد أسئلة عشوائية للتاريخ والجغرافيا
        else if (this.currentGame === 'history' || this.currentGame === 'geography') {
            question = this.currentGame === 'history' ? 
                this.generateDynamicHistoryQuestion(this.currentLevel) :
                this.generateDynamicGeographyQuestion(this.currentLevel);
            this.currentQuestion = question; // حفظ السؤال العشوائي
        } else {
            this.currentQuestion = question; // حفظ السؤال العادي أيضاً
        }
        
        let gameContent = '';

        // بناء محتوى اللعبة حسب نوعها
        switch (this.currentGame) {
            case 'counting':
                gameContent = this.buildCountingGame(question);
                break;
            case 'addition':
            case 'subtraction':
                gameContent = this.buildMathGame(question);
                break;
            case 'letters':
                gameContent = this.buildLetterGame(question);
                break;
            case 'words':
                gameContent = this.buildWordGame(question);
                break;
            case 'history':
            case 'geography':
                gameContent = this.buildQuizGame(question);
                break;
        }

        document.getElementById('gameContent').innerHTML = gameContent;
        
        // إضافة مستمعي الأحداث حسب نوع اللعبة
        this.addGameEventListeners();
    }

    buildCountingGame(question) {
        const shapesHTML = question.shapes.map(shape => 
            `<div class="shape" style="animation-delay: ${Math.random() * 0.6}s">${shape}</div>`
        ).join('');

        return `
            <div class="question-container">
                <div class="question-text">كم عدد هذه الأشكال؟</div>
                <div class="shapes-container">
                    ${shapesHTML}
                </div>
                <div class="options-grid">
                    <button class="option-button" data-answer="${question.answer}">${question.answer}</button>
                    <button class="option-button" data-answer="${question.answer + 1}">${question.answer + 1}</button>
                    <button class="option-button" data-answer="${question.answer + 2}">${question.answer + 2}</button>
                </div>
            </div>
        `;
    }

    buildMathGame(question) {
        const operation = this.currentGame === 'addition' ? '+' : '-';
        const shuffledOptions = [...question.options].sort(() => Math.random() - 0.5);

        return `
            <div class="question-container">
                <div class="question-text">${question.num1} ${operation} ${question.num2} = ?</div>
                <div class="options-grid">
                    ${shuffledOptions.map(option => 
                        `<button class="option-button" data-answer="${option}">${option}</button>`
                    ).join('')}
                </div>
            </div>
        `;
    }

    buildLetterGame(question) {
        const shuffledOptions = [...question.options].sort(() => Math.random() - 0.5);

        return `
            <div class="question-container">
                <div class="question-text">اختر الحرف: ${question.letter}</div>
                <div class="options-grid">
                    ${shuffledOptions.map(option => 
                        `<button class="option-button" data-letter="${option}">${option}</button>`
                    ).join('')}
                </div>
            </div>
        `;
    }

    buildWordGame(question) {
        const shuffledLetters = [...question.letters].sort(() => Math.random() - 0.5);
        const slots = question.word.length;

        return `
            <div class="question-container">
                <div class="question-text">استخدم الحروف لبناء كلمة: "${question.hint}"</div>
                <div class="word-builder" data-word="${question.word}">
                    ${Array(slots).fill('<div class="letter-slot"></div>').join('')}
                </div>
                <div class="available-letters">
                    ${shuffledLetters.map(letter => 
                        `<button class="available-letter" data-letter="${letter}">${letter}</button>`
                    ).join('')}
                </div>
                <button class="game-button culture-button" onclick="game.checkWord()">تحقق من الكلمة</button>
            </div>
        `;
    }

    buildQuizGame(question) {
        return `
            <div class="question-container">
                <div class="question-text">${question.question}</div>
                <div class="options-grid">
                    ${question.options.map(option => 
                        `<button class="option-button" data-answer="${option}">${option}</button>`
                    ).join('')}
                </div>
            </div>
        `;
    }

    addGameEventListeners() {
        const gameContent = document.getElementById('gameContent');
        
        // إضافة مستمعي الأحداث للأزرار حسب نوع اللعبة
        if (this.currentGame === 'words') {
            // لعبة بناء الكلمات
            const availableLetters = gameContent.querySelectorAll('.available-letter');
            const slots = gameContent.querySelectorAll('.letter-slot');
            let selectedLetters = [];

            availableLetters.forEach(letterBtn => {
                letterBtn.addEventListener('click', () => {
                    const letter = letterBtn.dataset.letter;
                    const emptySlot = Array.from(slots).find(slot => !slot.textContent);
                    
                    if (emptySlot) {
                        emptySlot.textContent = letter;
                        selectedLetters.push(letter);
                        letterBtn.style.opacity = '0.5';
                        letterBtn.disabled = true;
                    }
                });
            });

            return;
        }

        // باقي الألعاب
        const buttons = gameContent.querySelectorAll('.option-button');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleAnswer(e.target);
            });
        });
    }

    handleAnswer(selectedButton) {
        const gameData = this.gameData[this.currentGame];
        const question = this.currentQuestion || gameData.questions[this.currentLevel - 1];
        let isCorrect = false;

        // التحقق من الإجابة حسب نوع اللعبة
        switch (this.currentGame) {
            case 'counting':
                isCorrect = parseInt(selectedButton.dataset.answer) === question.answer;
                break;
            case 'addition':
            case 'subtraction':
                isCorrect = selectedButton.dataset.answer === question.correctAnswer;
                break;
            case 'letters':
                isCorrect = selectedButton.dataset.letter === question.letter;
                break;
            case 'history':
            case 'geography':
                isCorrect = selectedButton.dataset.answer === question.options[question.correctIndex];
                break;
        }

        this.showAnswerResult(selectedButton, isCorrect);
        
        if (isCorrect) {
            this.score += 10;
            this.updateScore();
            setTimeout(() => {
                this.completeLevel();
            }, 1500);
        } else {
            setTimeout(() => {
                this.resetQuestion();
            }, 1500);
        }
    }

    checkWord() {
        const wordBuilder = document.querySelector('.word-builder');
        const slots = Array.from(wordBuilder.querySelectorAll('.letter-slot'));
        const targetWord = wordBuilder.dataset.word;
        let userWord = '';

        // قراءة الحروف المدخلة
        slots.forEach(slot => {
            if (slot.textContent.trim()) {
                userWord += slot.textContent;
            }
        });

        const isCorrect = userWord === targetWord;

        if (isCorrect) {
            slots.forEach(slot => {
                slot.classList.add('filled');
            });
            this.score += 15;
            this.updateScore();
            this.showEncouragementMessage("ممتاز! كلمة صحيحة", true);
            setTimeout(() => {
                this.completeLevel();
            }, 1500);
        } else {
            // إعادة تعيين الحقول للإعادة المحاولة
            setTimeout(() => {
                slots.forEach(slot => {
                    slot.textContent = '';
                    slot.classList.remove('filled');
                });
                
                // إعادة تفعيل الحروف
                const availableLetters = document.querySelectorAll('.available-letter');
                availableLetters.forEach(letter => {
                    letter.style.opacity = '1';
                    letter.disabled = false;
                });
            }, 1000);
            this.showEncouragementMessage("حاول مرة أخرى!", false);
        }
    }

    showAnswerResult(button, isCorrect) {
        // إزالة الحالات من جميع الأزرار
        const allButtons = document.querySelectorAll('.option-button');
        allButtons.forEach(btn => {
            btn.classList.remove('correct', 'wrong');
            btn.disabled = true;
        });

        // إضافة حالة للنتيجة
        if (isCorrect) {
            button.classList.add('correct');
            this.showEncouragementMessage("ممتاز! إجابة صحيحة", true);
        } else {
            button.classList.add('wrong');
            this.showEncouragementMessage("حاول مرة أخرى!", false);
        }
    }

    showEncouragementMessage(message, isSuccess) {
        // إزالة أي رسالة موجودة
        const existingMessage = document.querySelector('.encouragement-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // إضافة رسالة جديدة
        const messageDiv = document.createElement('div');
        messageDiv.className = `encouragement-message ${isSuccess ? 'success' : 'encouragement'}`;
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: ${isSuccess ? 'var(--success)' : 'var(--encouragement)'};
            color: white;
            padding: 16px 32px;
            border-radius: 24px;
            font-size: 18px;
            font-weight: 500;
            z-index: 1000;
            animation: slideDown 0.3s ease-out;
        `;
        messageDiv.textContent = message;

        document.body.appendChild(messageDiv);

        // إزالة الرسالة بعد ثانيتين
        setTimeout(() => {
            messageDiv.style.animation = 'slideUp 0.3s ease-out';
            setTimeout(() => {
                messageDiv.remove();
            }, 300);
        }, 2000);
    }

    updateScore() {
        document.getElementById('currentScore').textContent = this.score;
        localStorage.setItem(`${this.currentGame}Score`, this.score.toString());
    }

    completeLevel() {
        // حفظ التقدم
        const nextLevel = this.currentLevel + 1;
        if (nextLevel <= this.maxLevel) {
            localStorage.setItem(`${this.currentGame}Level`, nextLevel.toString());
        }

        // عرض نافذة النتيجة
        this.showResultModal();
    }

    showResultModal() {
        const modal = document.getElementById('resultModal');
        const isLastLevel = this.currentLevel >= this.maxLevel;

        document.getElementById('finalScore').textContent = this.score;
        document.getElementById('nextLevelBtn').style.display = isLastLevel ? 'none' : 'block';
        document.getElementById('encouragementMessage').textContent = isLastLevel ? 
            "تهانينا! لقد أكملت جميع المستويات!" : 
            "أحسنت، أنت تتقدم!";

        modal.style.display = 'block';
    }

    hideResultModal() {
        document.getElementById('resultModal').style.display = 'none';
    }

    nextLevel() {
        this.hideResultModal();
        if (this.currentLevel < this.maxLevel) {
            this.currentLevel++;
            document.getElementById('currentLevelNum').textContent = this.currentLevel;
            this.currentQuestion = null; // مسح السؤال السابق
            this.loadQuestion();
        }
    }

    backToMenu() {
        // إخفاء منطقة اللعبة وإظهار البطاقات
        document.getElementById('gameArea').classList.add('hidden');
        document.querySelector('.games-sections').style.display = 'block';
        
        // تحديث التقدم
        this.updateProgress();
        
        // إعادة تعيين المتغيرات
        this.currentGame = null;
        this.currentLevel = 1;
        this.score = 0;
        this.currentQuestion = null; // مسح السؤال الحالي
        this.usedHistoryQuestions.clear(); // مسح تتبع أسئلة التاريخ
        this.usedGeographyQuestions.clear(); // مسح تتبع أسئلة الجغرافيا
    }

    resetQuestion() {
        // إعادة توليد السؤال ديناميكياً
        this.loadQuestion();
    }
}

// إضافة الأنيميشن للرسائل
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            transform: translateX(-50%) translateY(-100%);
            opacity: 0;
        }
        to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideUp {
        from {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
        to {
            transform: translateX(-50%) translateY(-100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// متغيرات عامة
let game;

// دوال عامة للاستخدام في HTML
function startGame(gameType, level) {
    game.startGame(gameType, level);
}

function nextLevel() {
    game.nextLevel();
}

function backToMenu() {
    game.backToMenu();
}

function checkWord() {
    game.checkWord();
}

// تهيئة اللعبة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    game = new EducationalGames();
});