// ========================================
// Problems Module
// ========================================

let problemsData = [];
let currentProblemIndex = 0;
let solutionVisible = false;

// ========================================
// Initialize Problems
// ========================================
function initProblems(data) {
    problemsData = [...data];
    currentProblemIndex = 0;
    solutionVisible = false;

    // Set up event listeners
    setupProblemsEventListeners();

    // Display first problem
    displayProblem();
}

// ========================================
// Display Problem
// ========================================
function displayProblem() {
    if (!problemsData || problemsData.length === 0) {
        showError('No problems available.');
        return;
    }

    const problem = problemsData[currentProblemIndex];
    solutionVisible = false;

    // Update problem statement
    const statementEl = document.getElementById('problem-statement');
    statementEl.innerHTML = renderMarkdown(problem.problem);

    // Update solution
    const solutionTextEl = document.getElementById('problem-solution-text');
    solutionTextEl.innerHTML = renderMarkdown(problem.solution);

    // Hide solution initially
    document.getElementById('problem-solution').classList.add('hidden');

    // Update problem counter
    document.getElementById('problem-current').textContent = currentProblemIndex + 1;
    document.getElementById('problem-total').textContent = problemsData.length;
    document.getElementById('problem-number').textContent = currentProblemIndex + 1;

    // Reset show solution button
    const showBtn = document.getElementById('problem-show-solution-btn');
    showBtn.textContent = 'Show Solution';
    showBtn.classList.remove('hidden');

    // Update navigation buttons
    updateNavigationButtons();
}

// ========================================
// Toggle Solution
// ========================================
function toggleSolution() {
    const solutionEl = document.getElementById('problem-solution');
    const showBtn = document.getElementById('problem-show-solution-btn');

    solutionVisible = !solutionVisible;

    if (solutionVisible) {
        solutionEl.classList.remove('hidden');
        showBtn.textContent = 'Hide Solution';
    } else {
        solutionEl.classList.add('hidden');
        showBtn.textContent = 'Show Solution';
    }
}

// ========================================
// Next Problem
// ========================================
function nextProblem() {
    if (currentProblemIndex < problemsData.length - 1) {
        currentProblemIndex++;
        displayProblem();
    }
}

// ========================================
// Previous Problem
// ========================================
function previousProblem() {
    if (currentProblemIndex > 0) {
        currentProblemIndex--;
        displayProblem();
    }
}

// ========================================
// Update Navigation Buttons
// ========================================
function updateNavigationButtons() {
    const prevBtn = document.getElementById('problem-prev-btn');
    const nextBtn = document.getElementById('problem-next-btn');

    // Disable previous button on first problem
    prevBtn.disabled = (currentProblemIndex === 0);

    // Disable next button on last problem
    nextBtn.disabled = (currentProblemIndex === problemsData.length - 1);
}

// ========================================
// Event Listeners Setup
// ========================================
function setupProblemsEventListeners() {
    // Back button
    const backBtn = document.getElementById('problems-back-btn');
    if (backBtn) {
        backBtn.onclick = () => {
            resetHome();
        };
    }

    // Show/Hide solution button
    const showSolutionBtn = document.getElementById('problem-show-solution-btn');
    if (showSolutionBtn) {
        showSolutionBtn.onclick = toggleSolution;
    }

    // Previous button
    const prevBtn = document.getElementById('problem-prev-btn');
    if (prevBtn) {
        prevBtn.onclick = previousProblem;
    }

    // Next button
    const nextBtn = document.getElementById('problem-next-btn');
    if (nextBtn) {
        nextBtn.onclick = nextProblem;
    }

    // Keyboard navigation
    document.addEventListener('keydown', handleProblemsKeyboard);
}

// ========================================
// Keyboard Navigation
// ========================================
function handleProblemsKeyboard(e) {
    // Only handle if problems screen is active
    if (AppState.currentScreen !== 'problems-screen') {
        return;
    }

    switch (e.key) {
        case ' ':
        case 'Enter':
            e.preventDefault();
            toggleSolution();
            break;
        case 'ArrowRight':
        case 'ArrowDown':
            e.preventDefault();
            nextProblem();
            break;
        case 'ArrowLeft':
        case 'ArrowUp':
            e.preventDefault();
            previousProblem();
            break;
    }
}

// Export functions
window.initProblems = initProblems;
