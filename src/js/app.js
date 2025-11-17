// This file handles user interactions, including login, registration, and question posting.

import { registerUser, loginUser, logoutUser, getCurrentUser, checkRateLimit, updateLastQuestionTime, saveQuestion, loadQuestions } from './storage.js';

document.addEventListener('DOMContentLoaded', function() {
    const userLoginForm = document.getElementById('userLoginForm');
    const userRegisterForm = document.getElementById('userRegisterForm');
    const questionForm = document.getElementById('questionForm');
    const userLogoutBtn = document.getElementById('userLogoutBtn');
    const questionsList = document.getElementById('questionsList');

    let activeTab = 'questions'; // Default tab

    // Check user status on page load
    checkUserStatus();
    loadAndDisplayQuestions();

    // User login
    window.userLogin = function() {
        const username = document.getElementById('userUsername').value;
        const password = document.getElementById('userPassword').value;
        const user = loginUser(username, password);
        if (user) {
            checkUserStatus();
            alert('Вход выполнен успешно!');
        } else {
            alert('Неверный логин или пароль!');
        }
    };

    // User registration
    window.userRegister = function() {
        const username = document.getElementById('regUsername').value;
        const password = document.getElementById('regPassword').value;
        if (registerUser(username, password)) {
            alert('Регистрация успешна! Теперь войдите в систему.');
        } else {
            alert('Пользователь с таким именем уже существует!');
        }
    };

    // User logout
    window.userLogout = function() {
        logoutUser();
        checkUserStatus();
        alert('Вы вышли из системы.');
    };

    // Switch tab
    window.switchTab = function(tab) {
        activeTab = tab;
        document.getElementById('questionsTab').classList.toggle('active', tab === 'questions');
        document.getElementById('complaintsTab').classList.toggle('active', tab === 'complaints');
        loadAndDisplayQuestions();
    };

    // Post question
    window.postQuestion = async function() {
        const user = getCurrentUser();
        if (!user) {
            alert('Сначала войдите в систему!');
            return;
        }
        if (!checkRateLimit(user.username)) {
            alert('Вы можете публиковать только один пост в 30 минут!');
            return;
        }
        const title = document.getElementById('questionTitle').value;
        const text = document.getElementById('questionText').value;
        const category = document.querySelector('input[name="category"]:checked').value;
        const fileInput = document.getElementById('fileInput');
        const files = fileInput.files;

        if (!title || !text) {
            alert('Заполните все поля!');
            return;
        }

        const attachments = [];
        for (let file of files) {
            const dataUrl = await readFileAsDataURL(file);
            attachments.push({ name: file.name, type: file.type, data: dataUrl });
        }

        const question = {
            id: Date.now(),
            category,
            title,
            text,
            author: user.username,
            answers: [],
            attachments,
            timestamp: new Date().toISOString()
        };
        saveQuestion(question);
        updateLastQuestionTime(user.username);
        document.getElementById('questionTitle').value = '';
        document.getElementById('questionText').value = '';
        fileInput.value = '';
        loadAndDisplayQuestions();
        alert('Пост опубликован!');
    };

    function readFileAsDataURL(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    function checkUserStatus() {
        const user = getCurrentUser();
        if (user) {
            userLoginForm.style.display = 'none';
            userRegisterForm.style.display = 'none';
            questionForm.style.display = 'block';
            userLogoutBtn.style.display = 'block';
        } else {
            userLoginForm.style.display = 'block';
            userRegisterForm.style.display = 'block';
            questionForm.style.display = 'none';
            userLogoutBtn.style.display = 'none';
        }
    }

    function loadAndDisplayQuestions() {
        const questions = loadQuestions().filter(q => q.category === activeTab);
        questionsList.innerHTML = '';
        questions.forEach(q => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'question';
            questionDiv.dataset.id = q.id;
            const attachmentsHtml = q.attachments ? q.attachments.map(att => {
                if (att.type.startsWith('image/')) {
                    return `<img src="${att.data}" alt="${att.name}" class="attachment-image">`;
                } else {
                    return `<a href="${att.data}" download="${att.name}" class="attachment-link">${att.name}</a>`;
                }
            }).join('') : '';
            questionDiv.innerHTML = `
                <h3>${q.title}</h3>
                <p>${q.text}</p>
                ${attachmentsHtml ? `<div class="attachments">${attachmentsHtml}</div>` : ''}
                <small>Автор: ${q.author}, Время: ${new Date(q.timestamp).toLocaleString()}</small>
                <div class="answers">
                    ${q.answers.map(a => `<div class="answer"><p>${a.text}</p><small>Админ, ${new Date(a.timestamp).toLocaleString()}</small></div>`).join('')}
                </div>
            `;
            questionsList.appendChild(questionDiv);
        });
    }
});
