const QUESTIONS = [
    {
        id: 1,
        image: "images/questions/q1.jpg", 
        correctAnswer: "Тюмень",
        taskText: "Напечатай: Тюмень"
    },
    {
        id: 2,
        image: "images/questions/q2.jpg", 
        correctAnswer: "Каток",
        taskText: "Напечатай: Каток"
    },
    {
        id: 3,
        image: "images/questions/q3.jpg",
        correctAnswer: "Каток",
        taskText: "Напечатай: Каток"
    },
    {
        id: 4,
        image: "images/questions/q4.jpg",
        correctAnswer: "Зелень",
        taskText: "Напечатай: Зелень"
    },
    {
        id: 5,
        image: "images/questions/q5.jpg",
        correctAnswer: "Ашан",
        taskText: "Напечатай: Ашан"
    }
];

let currentQuestionIndex = 0;
let userAnswers = [];

const sidebarElement = document.getElementById('sidebar');
const imageElement = document.getElementById('question-image');
const taskTextElement = document.getElementById('task-text');
const answerInputElement = document.getElementById('answer-input');
const checkBtnElement = document.getElementById('check-btn');
const checkIconElement = document.getElementById('check-icon');
const resetBtnElement = document.getElementById('reset-btn');

// Функция для отрисовки левой панели 
function renderSidebar() {
    sidebarElement.innerHTML = '';
    
    QUESTIONS.forEach((question, index) => {
        const btn = document.createElement('button');
        btn.classList.add('nav-btn');
        btn.textContent = index + 1;
        
        if (index === currentQuestionIndex) {
            btn.classList.add('active');
        }
        
        if (index > currentQuestionIndex) {
            btn.disabled = true;
        }
        
        btn.addEventListener('click', () => {
            if (!btn.disabled) {
                currentQuestionIndex = index;
                renderApp();
            }
        });

        sidebarElement.appendChild(btn);
    });
}

// Функция для смены иконки галочки
function updateCheckIcon() {
    const hasText = answerInputElement.value.trim().length > 0;
    
    if (hasText) {
        checkIconElement.src = 'images/svg/check-active.svg'; 
    } else {
        checkIconElement.src = 'images/svg/check-btn.svg'; 
    }
}

// Функция для отрисовки текущего вопроса
function renderQuestion() {
    const currentQuestion = QUESTIONS[currentQuestionIndex];
    
    imageElement.src = currentQuestion.image;
    taskTextElement.textContent = currentQuestion.taskText;
    
    if (userAnswers[currentQuestionIndex]) {
        answerInputElement.value = userAnswers[currentQuestionIndex];
    } else {
        answerInputElement.value = '';
    }
    
    updateCheckIcon();
}

// Главная функция отрисовки
function renderApp() {
    renderSidebar();
    renderQuestion();
}

// Функция обработки нажатия на галочку
function handleCheckAnswer() {
    const userAnswer = answerInputElement.value;
    const trimmedAnswer = userAnswer.trim();
    
    if (trimmedAnswer === '') {
        return; 
    }

    userAnswers[currentQuestionIndex] = trimmedAnswer;

    if (currentQuestionIndex < QUESTIONS.length - 1) {
        currentQuestionIndex++;
        renderApp();
    } else {
        // Сохраняем ответы в localStorage и переходим на страницу ответов
        localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
        window.location.href = "answers.html"; 
    }
}

// Функция перезапуска
function handleReset() {
    const isConfirmed = confirm("Вы уверены, что хотите начать заново? Все ответы будут удалены.");
    if (isConfirmed) {
        initApp(); 
    }
}

// Инициализация приложения
function initApp() {
    currentQuestionIndex = 0;
    userAnswers = new Array(QUESTIONS.length).fill(''); 
    renderApp();
}

answerInputElement.addEventListener('input', updateCheckIcon);
checkBtnElement.addEventListener('click', handleCheckAnswer);
resetBtnElement.addEventListener('click', handleReset);

// Запуск при загрузке страницы
document.addEventListener('DOMContentLoaded', initApp);