// ========================================
// Global App State
// ========================================
const AppState = {
    config: null,
    selectedClass: null,
    selectedSubject: null,
    selectedChapter: null,
    currentScreen: 'home-screen'
};

// ========================================
// Utility Functions
// ========================================
function showScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    // Show the selected screen
    const screen = document.getElementById(screenId);
    if (screen) {
        screen.classList.add('active');
        AppState.currentScreen = screenId;
    }
}

function showError(message) {
    const errorScreen = document.getElementById('error-screen');
    const errorMessage = document.getElementById('error-message');

    errorMessage.textContent = message;
    errorScreen.classList.remove('hidden');
    showScreen('error-screen');
}

function hideError() {
    const errorScreen = document.getElementById('error-screen');
    errorScreen.classList.add('hidden');
}

function renderMarkdown(text) {
    if (typeof marked !== 'undefined') {
        return marked.parse(text);
    }
    return text.replace(/\n/g, '<br>');
}

async function loadJSON(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to load ${url}: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error loading JSON:', error);
        throw error;
    }
}

function resetHome() {
    AppState.selectedClass = null;
    AppState.selectedSubject = null;
    AppState.selectedChapter = null;

    document.getElementById('subject-selection-container').classList.add('hidden');
    document.getElementById('chapter-selection-container').classList.add('hidden');
    document.getElementById('activity-selection-container').classList.add('hidden');

    showScreen('home-screen');
}

// ========================================
// Config & Data Loading
// ========================================
async function loadConfig() {
    try {
        AppState.config = await loadJSON('data/config.json');
        renderClassSelection();
    } catch (error) {
        showError('Failed to load application configuration. Please check if config.json exists.');
    }
}

function renderClassSelection() {
    const container = document.getElementById('class-selection');
    container.innerHTML = '';

    if (!AppState.config || !AppState.config.classes) {
        showError('No classes found in configuration.');
        return;
    }

    AppState.config.classes.forEach(classData => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-icon">📖</div>
            <h3>${classData.name}</h3>
            <p>Select to view subjects</p>
        `;
        card.addEventListener('click', () => selectClass(classData));
        container.appendChild(card);
    });
}

function selectClass(classData) {
    AppState.selectedClass = classData;
    AppState.selectedSubject = null;
    AppState.selectedChapter = null;

    renderSubjectSelection();

    document.getElementById('subject-selection-container').classList.remove('hidden');
    document.getElementById('chapter-selection-container').classList.add('hidden');
    document.getElementById('activity-selection-container').classList.add('hidden');
}

function renderSubjectSelection() {
    const container = document.getElementById('subject-selection');
    container.innerHTML = '';

    if (!AppState.selectedClass || !AppState.selectedClass.subjects) {
        return;
    }

    const subjectIcons = {
        'math': '🔢',
        'science': '🔬',
        'english': '📚',
        'history': '📜',
        'geography': '🌍'
    };

    AppState.selectedClass.subjects.forEach(subject => {
        const card = document.createElement('div');
        card.className = 'card';
        const icon = subjectIcons[subject.id] || '📘';
        card.innerHTML = `
            <div class="card-icon">${icon}</div>
            <h3>${subject.name}</h3>
            <p>${subject.chapters.length} chapter(s) available</p>
        `;
        card.addEventListener('click', () => selectSubject(subject));
        container.appendChild(card);
    });
}

function selectSubject(subject) {
    AppState.selectedSubject = subject;
    AppState.selectedChapter = null;

    renderChapterSelection();

    document.getElementById('chapter-selection-container').classList.remove('hidden');
    document.getElementById('activity-selection-container').classList.add('hidden');
}

function renderChapterSelection() {
    const container = document.getElementById('chapter-selection');
    container.innerHTML = '';

    if (!AppState.selectedSubject || !AppState.selectedSubject.chapters) {
        return;
    }

    AppState.selectedSubject.chapters.forEach(chapter => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-icon">📑</div>
            <h3>${chapter.name}</h3>
            <p>Click to view activities</p>
        `;
        card.addEventListener('click', () => selectChapter(chapter));
        container.appendChild(card);
    });
}

async function selectChapter(chapter) {
    AppState.selectedChapter = chapter;

    await renderActivitySelection();

    document.getElementById('activity-selection-container').classList.remove('hidden');
}

async function renderActivitySelection() {
    const container = document.getElementById('activity-selection');
    container.innerHTML = '';

    const basePath = `data/${AppState.selectedClass.id}/${AppState.selectedSubject.id}/${AppState.selectedChapter.id}`;

    const activities = [
        {
            id: 'flashcards',
            name: 'Flashcards',
            icon: '🎴',
            description: 'Review key concepts with interactive flashcards',
            file: `${basePath}/flashcards.json`,
            class: 'flashcards'
        },
        {
            id: 'quiz',
            name: 'Quiz',
            icon: '✅',
            description: 'Test your knowledge with multiple-choice questions',
            file: `${basePath}/quiz.json`,
            class: 'quiz'
        },
        {
            id: 'problems',
            name: 'Problems',
            icon: '🧮',
            description: 'Practice with step-by-step problem solving',
            file: `${basePath}/problems.json`,
            class: 'problems'
        }
    ];

    for (const activity of activities) {
        try {
            // Try to fetch the file to see if it exists
            const response = await fetch(activity.file);
            if (response.ok) {
                const card = document.createElement('div');
                card.className = `activity-card ${activity.class}`;
                card.innerHTML = `
                    <div class="activity-icon">${activity.icon}</div>
                    <h3>${activity.name}</h3>
                    <p>${activity.description}</p>
                `;
                card.addEventListener('click', () => startActivity(activity.id, activity.file));
                container.appendChild(card);
            }
        } catch (error) {
            // File doesn't exist, skip this activity
            console.log(`${activity.name} not available for this chapter`);
        }
    }

    if (container.children.length === 0) {
        container.innerHTML = '<p class="text-center">No activities available for this chapter yet.</p>';
    }
}

async function startActivity(activityType, filePath) {
    try {
        const data = await loadJSON(filePath);

        if (!data || data.length === 0) {
            showError('No content available for this activity.');
            return;
        }

        switch (activityType) {
            case 'flashcards':
                if (typeof initFlashcards === 'function') {
                    initFlashcards(data);
                    showScreen('flashcards-screen');
                }
                break;
            case 'quiz':
                if (typeof initQuiz === 'function') {
                    initQuiz(data);
                    showScreen('quiz-screen');
                }
                break;
            case 'problems':
                if (typeof initProblems === 'function') {
                    initProblems(data);
                    showScreen('problems-screen');
                }
                break;
            default:
                showError('Unknown activity type.');
        }
    } catch (error) {
        showError(`Failed to load activity: ${error.message}`);
    }
}

// ========================================
// Event Listeners
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Load configuration
    loadConfig();

    // Error screen back button
    const errorBackBtn = document.getElementById('error-back-btn');
    if (errorBackBtn) {
        errorBackBtn.addEventListener('click', () => {
            hideError();
            resetHome();
        });
    }

    // Configure marked.js if available
    if (typeof marked !== 'undefined') {
        marked.setOptions({
            breaks: true,
            gfm: true
        });
    }
});

// Export functions for use in other modules
window.AppState = AppState;
window.showScreen = showScreen;
window.showError = showError;
window.renderMarkdown = renderMarkdown;
window.resetHome = resetHome;
