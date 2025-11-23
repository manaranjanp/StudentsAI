# 📚 Student Learning & Revision App

A responsive, browser-based student revision application for Classes 7-10, featuring interactive flashcards, quizzes, and problem-solving exercises.

## 🌟 Features

- **📖 Flashcards**: Interactive flip cards for quick review of key concepts
- **✅ Quizzes**: Multiple-choice questions with instant feedback and explanations
- **🧮 Problems**: Step-by-step problem solving with show/hide solutions
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **🎨 Modern UI**: Clean, elegant interface with smooth animations
- **⌨️ Keyboard Navigation**: Navigate using arrow keys and spacebar
- **📝 Markdown Support**: Rich text formatting for formulas and explanations

## 🚀 Quick Start

### GitHub Pages Deployment

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit - Student Learning App"
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select your branch (e.g., `main`)
   - Click "Save"

3. **Access Your App**:
   - Your app will be available at: `https://[username].github.io/[repository-name]/`

### Local Development

Simply open `index.html` in your web browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server
```

Then navigate to `http://localhost:8000`

## 📁 Project Structure

```
StudentsAI/
├── index.html              # Main HTML file
├── css/
│   └── styles.css         # All styles and responsive design
├── js/
│   ├── app.js            # Main app logic and navigation
│   ├── flashcards.js     # Flashcards module
│   ├── quiz.js           # Quiz module
│   └── problems.js       # Problems module
├── data/
│   ├── config.json       # Configuration (classes, subjects, chapters)
│   └── [class]/[subject]/[chapter]/
│       ├── flashcards.json
│       ├── quiz.json
│       └── problems.json
└── README.md
```

## 📝 Adding Content

### 1. Update Configuration

Edit `data/config.json` to add new classes, subjects, or chapters:

```json
{
  "classes": [
    {
      "id": "class9",
      "name": "Class 9",
      "subjects": [
        {
          "id": "physics",
          "name": "Physics",
          "chapters": [
            {
              "id": "chapter1",
              "name": "Chapter 1: Motion"
            }
          ]
        }
      ]
    }
  ]
}
```

### 2. Create Content Files

Create a folder structure: `data/class9/physics/chapter1/`

#### Flashcards Format (`flashcards.json`):

```json
[
  {
    "q": "What is velocity?",
    "a": "**Velocity** is the rate of change of displacement.\n\nFormula: v = d/t"
  }
]
```

#### Quiz Format (`quiz.json`):

```json
[
  {
    "question": "What is the SI unit of velocity?",
    "options": ["km/h", "m/s", "mph", "cm/s"],
    "correct": 1,
    "rationale": "The SI unit is meters per second (m/s)"
  }
]
```

#### Problems Format (`problems.json`):

```json
[
  {
    "problem": "A car travels 100 km in 2 hours. Calculate its speed.",
    "solution": "**Given:**\n- Distance = 100 km\n- Time = 2 hours\n\n**Solution:**\nSpeed = Distance/Time = 100/2 = **50 km/h**"
  }
]
```

### 3. Markdown Support

All content supports Markdown formatting:

- **Bold**: `**text**`
- *Italic*: `*text*`
- Lists: Use `-` or `1.`
- Formulas: `v = d/t`
- Line breaks: Use `\n` in JSON

## 🎮 How to Use

1. **Select Class**: Choose your class (7, 8, 9, or 10)
2. **Select Subject**: Pick a subject (Math, Science, etc.)
3. **Select Chapter**: Choose the chapter you want to study
4. **Choose Activity**: Pick from Flashcards, Quiz, or Problems

### Keyboard Shortcuts

#### Flashcards:
- `Space`/`Enter`: Flip card
- `→`/`↓`: Next card
- `←`/`↑`: Previous card

#### Problems:
- `Space`/`Enter`: Toggle solution
- `→`/`↓`: Next problem
- `←`/`↑`: Previous problem

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Custom properties, Grid, Flexbox, animations
- **Vanilla JavaScript**: ES6+ features
- **Marked.js**: Markdown parsing
- **GitHub Pages**: Hosting

## 📱 Responsive Breakpoints

- **Desktop**: > 768px
- **Tablet**: 481px - 768px
- **Mobile**: ≤ 480px

## 🎨 Customization

### Colors

Edit CSS variables in `css/styles.css`:

```css
:root {
    --primary-color: #4A90E2;
    --secondary-color: #50C878;
    --accent-color: #FF6B6B;
    /* ... more colors ... */
}
```

### Adding New Subjects

Add icons in `js/app.js`:

```javascript
const subjectIcons = {
    'math': '🔢',
    'science': '🔬',
    'your-subject': '📐'
};
```

## 🐛 Troubleshooting

**Content not loading?**
- Check browser console for errors
- Verify JSON file paths match the config
- Ensure JSON files are valid (use a JSON validator)

**GitHub Pages not working?**
- Wait a few minutes after enabling
- Check that `index.html` is in the root directory
- Verify branch settings in repository

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Add more content
- Improve UI/UX
- Fix bugs
- Add new features

## 📧 Support

For issues or questions, please open an issue on GitHub.

---

**Happy Learning! 🎓**
