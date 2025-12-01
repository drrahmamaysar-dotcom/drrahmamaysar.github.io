// ألعاب تفاعلية لذوي الاحتياجات الخاصة

// متغيرات عامة للألعاب
let currentGame = null;
let gameStats = {
    memory: { correct: 0, attempts: 0, time: 0 }
};

// تهيئة الألعاب عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    initGames();
});

// تهيئة الألعاب
function initGames() {
    // إنشاء الحاويات للألعاب
    createGameContainers();
    
    // تهيئة بيانات الألعاب
    initGameData();
    
    console.log('تم تهيئة الألعاب بنجاح');
}

// إنشاء حاويات الألعاب
function createGameContainers() {
    const gamesSection = document.querySelector('.games-section');
    if (!gamesSection) return;
    
    // إضافة حاوي الألعاب الرئيسي
    const gamesContainer = document.createElement('div');
    gamesContainer.className = 'games-container';
    gamesContainer.id = 'gamesContainer';
    gamesContainer.innerHTML = `
        <div class="games-header">
            <button class="btn-back" onclick="closeCurrentGame()">العودة للألعاب</button>
            <div class="game-title-display">
                <h3 id="gameTitle"></h3>
                <p id="gameDescription"></p>
            </div>
            <div class="game-stats" id="gameStats"></div>
        </div>
        <div class="games-content" id="gamesContent"></div>
    `;
    
    gamesSection.appendChild(gamesContainer);
}

// بيانات الألعاب
const gameData = {
    memory: {
        title: 'ألعاب الذاكرة والتركيز',
        description: 'طور ذاكرتك وقدرتك على التركيز من خلال ألعاب مطابقة البطاقات',
        cards: [
            { id: 1, content: '🐱', pair: 'cat' },
            { id: 2, content: '🐶', pair: 'dog' },
            { id: 3, content: '🐰', pair: 'rabbit' },
            { id: 4, content: '🐸', pair: 'frog' },
            { id: 5, content: '🦋', pair: 'butterfly' },
            { id: 6, content: '🌸', pair: 'flower' },
            { id: 7, content: '⭐', pair: 'star' },
            { id: 8, content: '🌈', pair: 'rainbow' }
        ]
    },

};// تشغيل لعبة الذاكرة
function startMemoryGame() {
    showGameContainer('memory');
    initMemoryGame();
}


// إظهار حاوي اللعبة
function showGameContainer(gameType) {
    // إخفاء جميع الألعاب
    document.querySelectorAll('.games-container').forEach(container => {
        container.classList.remove('active');
    });
    
    // إنشاء أو إظهار الحاوي المطلوب
    let container = document.getElementById(`gameContainer_${gameType}`);
    if (!container) {
        container = createGameContainer(gameType);
    }
    
    container.classList.add('active');
    currentGame = gameType;
    
    // التمرير إلى اللعبة
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// إنشاء حاوي اللعبة
function createGameContainer(gameType) {
    const container = document.createElement('div');
    container.className = 'games-container';
    container.id = `gameContainer_${gameType}`;
    
    const gameInfo = gameData[gameType];
    
    container.innerHTML = `
        <div class="games-header">
            <button class="btn-back" onclick="closeCurrentGame()">← العودة للألعاب</button>
            <div class="game-title-display">
                <h3>${gameInfo.title}</h3>
                <p>${gameInfo.description}</p>
            </div>
            <div class="game-stats">
                <div class="stat-item">
                    <span class="stat-label">النقاط</span>
                    <span class="stat-value" id="gameScore">0</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">الوقت</span>
                    <span class="stat-value" id="gameTime">00:00</span>
                </div>
            </div>
        </div>
        <div class="games-content" id="gameContent_${gameType}"></div>
    `;
    
    document.querySelector('.games-section').appendChild(container);
    return container;
}

// إغلاق اللعبة الحالية
function closeCurrentGame() {
    const activeContainer = document.querySelector('.games-container.active');
    if (activeContainer) {
        activeContainer.classList.remove('active');
    }
    currentGame = null;
    
    // التمرير إلى قسم الألعاب
    document.getElementById('games').scrollIntoView({ behavior: 'smooth' });
}

// لعبة الذاكرة
function initMemoryGame() {
    const content = document.getElementById('gameContent_memory');
    if (!content) return;
    
    // إنشاء البطاقات
    const cards = [...gameData.memory.cards, ...gameData.memory.cards]; // تكرار للازدواج
    shuffleArray(cards);
    
    content.innerHTML = `
        <div class="memory-game">
            <div class="memory-stats">
                <div class="stat-item">
                    <div class="stat-label">المحاولات</div>
                    <div class="stat-value" id="memoryAttempts">0</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">المطابقات</div>
                    <div class="stat-value" id="memoryMatches">0/${cards.length / 2}</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">الوقت</div>
                    <div class="stat-value" id="memoryTimer">00:00</div>
                </div>
            </div>
            <div class="memory-grid" id="memoryGrid"></div>
            <div class="game-controls">
                <button class="btn-game" onclick="resetMemoryGame()">إعادة التشغيل</button>
            </div>
        </div>
    `;
    
    // إنشاء البطاقات في الشبكة
    const grid = document.getElementById('memoryGrid');
    cards.forEach((card, index) => {
        const cardElement = createMemoryCard(card, index);
        grid.appendChild(cardElement);
    });
    
    // بدء المؤقت
    startGameTimer('memory');
}

// إنشاء بطاقة ذاكرة
function createMemoryCard(card, index) {
    const cardElement = document.createElement('div');
    cardElement.className = 'memory-card';
    cardElement.setAttribute('data-pair', card.pair);
    cardElement.setAttribute('data-index', index);
    
    cardElement.innerHTML = `
        <div class="memory-card-content">${card.content}</div>
    `;
    
    cardElement.addEventListener('click', () => flipMemoryCard(cardElement));
    
    return cardElement;
}

// قلب بطاقة الذاكرة
function flipMemoryCard(card) {
    if (card.classList.contains('flipped') || card.classList.contains('matched')) {
        return;
    }
    
    card.classList.add('flipped');
    gameStats.memory.attempts++;
    updateMemoryStats();
    
    // فحص المطابقة
    checkMemoryMatch(card);
}

// فحص مطابقة الذاكرة
function checkMemoryMatch(card) {
    const flippedCards = document.querySelectorAll('.memory-card.flipped:not(.matched)');
    
    if (flippedCards.length === 2) {
        const [card1, card2] = flippedCards;
        const pair1 = card1.getAttribute('data-pair');
        const pair2 = card2.getAttribute('data-pair');
        
        if (pair1 === pair2) {
            // مطابقة صحيحة
            setTimeout(() => {
                card1.classList.add('matched');
                card2.classList.add('matched');
                gameStats.memory.correct++;
                updateMemoryStats();
                
                if (gameStats.memory.correct === gameData.memory.cards.length) {
                    endMemoryGame();
                }
            }, 500);
        } else {
            // مطابقة خاطئة
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
            }, 1000);
        }
    }
}

// تحديث إحصائيات الذاكرة
function updateMemoryStats() {
    document.getElementById('memoryAttempts').textContent = gameStats.memory.attempts;
    document.getElementById('memoryMatches').textContent = `${gameStats.memory.correct}/${gameData.memory.cards.length}`;
}

// إعادة تشغيل لعبة الذاكرة
function resetMemoryGame() {
    gameStats.memory = { correct: 0, attempts: 0, time: 0 };
    initMemoryGame();
}

// إنهاء لعبة الذاكرة
function endMemoryGame() {
    showGameMessage('🎉 مبروك! لقد أكملت اللعبة بنجاح!', 'success');
    setTimeout(() => {
        closeCurrentGame();
    }, 3000);
}


// تحديث إحصائيات التعلم




// لعبة التحفيز الحسي



// لعبة التطابق


// إنشاء عنصر تطابق


// اختيار عنصر التطابق


// فحص التطابق


// تحديث إحصائيات التطابق


// عرض رسالة اللعبة
function showGameMessage(text, type) {
    // إزالة الرسائل السابقة
    const existingMessages = document.querySelectorAll('.game-message');
    existingMessages.forEach(msg => msg.remove());
    
    const message = document.createElement('div');
    message.className = `game-message ${type}`;
    message.textContent = text;
    
    const content = document.querySelector(`#gameContent_${currentGame}`);
    if (content) {
        content.insertBefore(message, content.firstChild);
    }
}

// بدء مؤقت اللعبة
function startGameTimer(gameType) {
    let startTime = Date.now();
    
    const updateTimer = () => {
        if (!currentGame || currentGame !== gameType) return;
        
        const elapsed = Date.now() - startTime;
        const minutes = Math.floor(elapsed / 60000);
        const seconds = Math.floor((elapsed % 60000) / 1000);
        
        const timerElement = document.getElementById(`${gameType}Timer`);
        if (timerElement) {
            timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        
        gameStats[gameType].time = elapsed;
        requestAnimationFrame(updateTimer);
    };
    
    updateTimer();
}

// خلط المصفوفة
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// تصدير الوظائف للاستخدام في ملفات أخرى
window.GameController = {
    startMemoryGame,
    closeCurrentGame,
    resetMemoryGame,
    resetMatchingGame
};