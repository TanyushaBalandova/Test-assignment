const QUESTIONS = [
    { id: 1, image: "images/questions/q1.jpg", correctAnswer: "Тюмень" },
    { id: 2, image: "images/questions/q2.jpg", correctAnswer: "Каток" },
    { id: 3, image: "images/questions/q3.jpg", correctAnswer: "Каток" },
    { id: 4, image: "images/questions/q4.jpg", correctAnswer: "Зелень" },
    { id: 5, image: "images/questions/q5.jpg", correctAnswer: "Ашан" }
]

const savedAnswers = JSON.parse(localStorage.getItem('userAnswers')) || [];

// Получаем ссылку на тело таблицы
const resultsBody = document.getElementById('results-body');
const resetBtn = document.getElementById('reset-btn');

// Функция для раскрашивания гласных букв в красный цвет
function colorizeVowels(text) {
    const vowels = 'аеёиоуыэюяae';
    
    return text.split('').map(char => {
        if (vowels.includes(char.toLowerCase())) {
            return `<span class="vowel">${char}</span>`;
        }
        return char;
    }).join(''); 
}

// Функция для отрисовки таблицы
function renderResults() {
    resultsBody.innerHTML = '';

    QUESTIONS.forEach((question, index) => {
        const userAnswer = savedAnswers[index] || '';
        const correctAnswer = question.correctAnswer;
        
        // Убираем лишние пробелы
        const cleanUserAnswer = userAnswer.trim().toLowerCase().replace(/\s+/g, ' ');
        const cleanCorrectAnswer = correctAnswer.trim().toLowerCase().replace(/\s+/g, ' ');
        
        const isCorrect = cleanUserAnswer === cleanCorrectAnswer;

        // Создаем строку таблицы
        const tr = document.createElement('tr');

        // 1. Номер
        const tdNumber = document.createElement('td');
        tdNumber.textContent = index + 1;
        
        // 2. Картинка
        const tdImage = document.createElement('td');
        const img = document.createElement('img');
        img.src = question.image;
        img.alt = "Вопрос " + (index + 1);
        img.classList.add('table-img');
        tdImage.appendChild(img);

        // 3. Правильный ответ
        const tdCorrect = document.createElement('td');
        tdCorrect.innerHTML = colorizeVowels(correctAnswer);

        // 4. Ответ пользователя
        const tdUser = document.createElement('td');
        tdUser.innerHTML = colorizeVowels(userAnswer);

        // 5. Результат (Галочка или Крестик)
        const tdResult = document.createElement('td');
        const icon = document.createElement('span');
        icon.classList.add('result-icon');
        
        if (isCorrect) {
            icon.textContent = '✔';
            icon.classList.add('correct');
        } else {
            icon.textContent = '✘';
            icon.classList.add('incorrect');
        }
        tdResult.appendChild(icon);

        // Собираем строку
        tr.appendChild(tdNumber);
        tr.appendChild(tdImage);
        tr.appendChild(tdCorrect);
        tr.appendChild(tdUser);
        tr.appendChild(tdResult);

        resultsBody.appendChild(tr);
    });
}

// Кнопка перезапуска на странице ответов
resetBtn.addEventListener('click', () => {
    const isConfirmed = confirm("Вы уверены, что хотите начать заново? Все ответы будут удалены.");
    if (isConfirmed) {
        localStorage.removeItem('userAnswers');
        window.location.href = "index.html";
    }
});

// Функция для раскрашивания заголовков таблицы
function renderTableHeaders() {
    const thImg = document.getElementById('th-img');
    const thCorrect = document.getElementById('th-correct');
    const thUser = document.getElementById('th-user');
    const thResult = document.getElementById('th-result');
    if (thImg) thImg.innerHTML = colorizeVowels(thImg.textContent);
    if (thCorrect) thCorrect.innerHTML = colorizeVowels(thCorrect.textContent);
    if (thUser) thUser.innerHTML = colorizeVowels(thUser.textContent);
    if (thResult) thResult.innerHTML = colorizeVowels(thResult.textContent);
}

// Запускаем отрисовку при загрузке
document.addEventListener('DOMContentLoaded', () => {
    renderResults();
    renderTableHeaders();
});