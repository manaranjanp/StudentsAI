// ========================================
// Quiz Module
// ========================================

let quizData = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedOption = null;
let answered = false;

// ========================================
// Initialize Quiz
// ========================================
function initQuiz(data) {
    quizData = [...data];
    currentQuestionIndex = 0;
    score = 0;
    selectedOption = null;
    answered = false;

    // Optionally shuffle questions
    // shuffleQuestions();

    // Set up event listeners
    setupQuizEventListeners();

    // Hide complete screen, show question container
    document.getElementById('quiz-question-container').classList.remove('hidden');
    document.getElementById('quiz-complete').classList.add('hidden');

    // Display first question
    displayQuestion();
    updateScoreDisplay();
}

// ========================================
// Shuffle Questions
// ========================================
function shuffleQuestions() {
    for (let i = quizData.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [quizData[i], quizData[j]] = [quizData[j], quizData[i]];
    }
}

// ========================================
// Display Question
// ========================================
function displayQuestion() {
    if (!quizData || quizData.length === 0) {
        showError('No quiz questions available.');
        return;
    }

    const question = quizData[currentQuestionIndex];
    selectedOption = null;
    answered = false;

    // Update question text
    const questionEl = document.getElementById('quiz-question');
    questionEl.innerHTML = renderMarkdown(question.question);

    // Update question counter
    document.getElementById('quiz-current').textContent = currentQuestionIndex + 1;
    document.getElementById('quiz-questions-total').textContent = quizData.length;

    // Render options
    renderOptions(question.options);

    // Hide feedback
    document.getElementById('quiz-feedback').classList.add('hidden');

    // Show submit button, hide next button
    document.getElementById('quiz-submit-btn').classList.remove('hidden');
    document.getElementById('quiz-submit-btn').disabled = true;
}

// ========================================
// Render Options
// ========================================
function renderOptions(options) {
    const container = document.getElementById('quiz-options');
    container.innerHTML = '';

    options.forEach((option, index) => {
        const optionEl = document.createElement('div');
        optionEl.className = 'option';
        optionEl.textContent = option;
        optionEl.dataset.index = index;

        optionEl.addEventListener('click', () => selectOption(index));

        container.appendChild(optionEl);
    });
}

// ========================================
// Select Option
// ========================================
function selectOption(index) {
    if (answered) return;

    selectedOption = index;

    // Update visual selection
    document.querySelectorAll('.option').forEach((opt, i) => {
        opt.classList.remove('selected');
        if (i === index) {
            opt.classList.add('selected');
        }
    });

    // Enable submit button
    document.getElementById('quiz-submit-btn').disabled = false;
}

// ========================================
// Submit Answer
// ========================================
function submitAnswer() {
    if (selectedOption === null || answered) return;

    answered = true;
    const question = quizData[currentQuestionIndex];
    const correctIndex = question.correct;
    const isCorrect = selectedOption === correctIndex;

    // Update score
    if (isCorrect) {
        score++;
        updateScoreDisplay();
    }

    // Show feedback
    showFeedback(isCorrect, question.rationale, correctIndex);

    // Hide submit button
    document.getElementById('quiz-submit-btn').classList.add('hidden');
}

// ========================================
// Show Feedback
// ========================================
function showFeedback(isCorrect, rationale, correctIndex) {
    const feedbackEl = document.getElementById('quiz-feedback');
    const messageEl = document.getElementById('quiz-feedback-message');
    const rationaleEl = document.getElementById('quiz-rationale');

    // Update options styling
    document.querySelectorAll('.option').forEach((opt, index) => {
        opt.classList.add('disabled');
        if (index === correctIndex) {
            opt.classList.add('correct');
        } else if (index === selectedOption && !isCorrect) {
            opt.classList.add('incorrect');
        }
    });

    // Show feedback message
    if (isCorrect) {
        messageEl.textContent = '✓ Correct!';
        messageEl.className = 'feedback-message correct';
    } else {
        messageEl.textContent = '✗ Incorrect';
        messageEl.className = 'feedback-message incorrect';
    }

    // Show rationale
    rationaleEl.innerHTML = renderMarkdown(rationale);

    // Show feedback container
    feedbackEl.classList.remove('hidden');
}

// ========================================
// Next Question
// ========================================
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex >= quizData.length) {
        showQuizComplete();
    } else {
        displayQuestion();
    }
}

// ========================================
// Show Quiz Complete
// ========================================
function showQuizComplete() {
    document.getElementById('quiz-question-container').classList.add('hidden');
    document.getElementById('quiz-complete').classList.remove('hidden');

    // Update final score
    document.getElementById('final-score').textContent = score;
    document.getElementById('final-total').textContent = quizData.length;

    const percentage = Math.round((score / quizData.length) * 100);
    document.getElementById('final-percentage').textContent = percentage;
}

// ========================================
// Update Score Display
// ========================================
function updateScoreDisplay() {
    document.getElementById('quiz-score').textContent = score;
    document.getElementById('quiz-total').textContent = quizData.length;
}

// ========================================
// Restart Quiz
// ========================================
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    selectedOption = null;
    answered = false;

    // Optionally shuffle on restart
    shuffleQuestions();

    document.getElementById('quiz-question-container').classList.remove('hidden');
    document.getElementById('quiz-complete').classList.add('hidden');

    displayQuestion();
    updateScoreDisplay();
}

// ========================================
// Event Listeners Setup
// ========================================
function setupQuizEventListeners() {
    // Back button
    const backBtn = document.getElementById('quiz-back-btn');
    if (backBtn) {
        backBtn.onclick = () => {
            resetHome();
        };
    }

    // Submit button
    const submitBtn = document.getElementById('quiz-submit-btn');
    if (submitBtn) {
        submitBtn.onclick = submitAnswer;
    }

    // Next question button
    const nextBtn = document.getElementById('quiz-next-btn');
    if (nextBtn) {
        nextBtn.onclick = nextQuestion;
    }

    // Restart button
    const restartBtn = document.getElementById('quiz-restart-btn');
    if (restartBtn) {
        restartBtn.onclick = restartQuiz;
    }
}

// Export functions
window.initQuiz = initQuiz;
