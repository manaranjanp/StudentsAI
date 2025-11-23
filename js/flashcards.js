// ========================================
// Flashcards Module
// ========================================

let flashcardsData = [];
let currentCardIndex = 0;
let isFlipped = false;

// ========================================
// Initialize Flashcards
// ========================================
function initFlashcards(data) {
    flashcardsData = [...data];
    currentCardIndex = 0;
    isFlipped = false;

    // Shuffle cards on initialization
    shuffleCards();

    // Set up event listeners
    setupFlashcardEventListeners();

    // Display first card
    displayCard();
}

// ========================================
// Shuffle Cards
// ========================================
function shuffleCards() {
    for (let i = flashcardsData.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [flashcardsData[i], flashcardsData[j]] = [flashcardsData[j], flashcardsData[i]];
    }
}

// ========================================
// Display Card
// ========================================
function displayCard() {
    if (!flashcardsData || flashcardsData.length === 0) {
        showError('No flashcards available.');
        return;
    }

    const card = flashcardsData[currentCardIndex];
    const flashcard = document.getElementById('flashcard');
    const questionEl = document.getElementById('flashcard-question');
    const answerEl = document.getElementById('flashcard-answer');

    // Reset flip state
    flashcard.classList.remove('flipped');
    isFlipped = false;

    // Render question and answer with Markdown support
    questionEl.innerHTML = renderMarkdown(card.q);
    answerEl.innerHTML = renderMarkdown(card.a);

    // Update counter
    document.getElementById('flashcard-current').textContent = currentCardIndex + 1;
    document.getElementById('flashcard-total').textContent = flashcardsData.length;
}

// ========================================
// Flip Card
// ========================================
function flipCard() {
    const flashcard = document.getElementById('flashcard');
    flashcard.classList.toggle('flipped');
    isFlipped = !isFlipped;
}

// ========================================
// Next Card
// ========================================
function nextCard() {
    currentCardIndex = (currentCardIndex + 1) % flashcardsData.length;
    displayCard();
}

// ========================================
// Previous Card (for future use)
// ========================================
function previousCard() {
    currentCardIndex = (currentCardIndex - 1 + flashcardsData.length) % flashcardsData.length;
    displayCard();
}

// ========================================
// Event Listeners Setup
// ========================================
function setupFlashcardEventListeners() {
    // Back button
    const backBtn = document.getElementById('flashcard-back-btn');
    if (backBtn) {
        backBtn.onclick = () => {
            resetHome();
        };
    }

    // Flip button
    const flipBtn = document.getElementById('flashcard-flip-btn');
    if (flipBtn) {
        flipBtn.onclick = flipCard;
    }

    // Next button
    const nextBtn = document.getElementById('flashcard-next-btn');
    if (nextBtn) {
        nextBtn.onclick = nextCard;
    }

    // Shuffle button
    const shuffleBtn = document.getElementById('flashcard-shuffle-btn');
    if (shuffleBtn) {
        shuffleBtn.onclick = () => {
            shuffleCards();
            currentCardIndex = 0;
            displayCard();
        };
    }

    // Click on card to flip
    const flashcard = document.getElementById('flashcard');
    if (flashcard) {
        flashcard.onclick = flipCard;
    }

    // Keyboard navigation
    document.addEventListener('keydown', handleFlashcardKeyboard);
}

// ========================================
// Keyboard Navigation
// ========================================
function handleFlashcardKeyboard(e) {
    // Only handle if flashcards screen is active
    if (AppState.currentScreen !== 'flashcards-screen') {
        return;
    }

    switch (e.key) {
        case ' ':
        case 'Enter':
            e.preventDefault();
            flipCard();
            break;
        case 'ArrowRight':
        case 'ArrowDown':
            e.preventDefault();
            nextCard();
            break;
        case 'ArrowLeft':
        case 'ArrowUp':
            e.preventDefault();
            previousCard();
            break;
    }
}

// Export functions
window.initFlashcards = initFlashcards;
