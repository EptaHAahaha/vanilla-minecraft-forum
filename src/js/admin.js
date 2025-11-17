// This file contains JavaScript functions related to admin functionalities, such as logging in and managing questions.

import { saveAnswer, deleteQuestion, loadUsers, deleteUser } from './storage.js';

document.addEventListener('DOMContentLoaded', function() {
    const adminLogin = document.getElementById('adminLogin');
    const logoutBtn = document.getElementById('logoutBtn');

    // Check admin status on page load
    checkAdminStatus();

    window.adminLogin = function() {
        const username = document.getElementById('adminUsername').value;
        const password = document.getElementById('adminPassword').value;
        const admins = JSON.parse(localStorage.getItem('admins') || '[]');
        const admin = admins.find(a => a.username === username && a.password === password);
        if (admin) {
            localStorage.setItem('adminLoggedIn', 'true');
            checkAdminStatus();
            alert('Вход выполнен успешно!');
        } else {
            alert('Неверный логин или пароль!');
        }
    };

    window.adminLogout = function() {
        localStorage.removeItem('adminLoggedIn');
        checkAdminStatus();
        alert('Вы вышли из системы.');
    };

    window.answerQuestion = function(questionId) {
        if (!localStorage.getItem('adminLoggedIn')) {
            alert('Только администраторы могут отвечать!');
            return;
        }
        const answerText = document.querySelector(`#answerText${questionId}`).value;
        if (!answerText) {
            alert('Введите ответ!');
            return;
        }
        const answer = {
            text: answerText,
            timestamp: new Date().toISOString()
        };
        saveAnswer(questionId, answer);
        document.querySelector(`#answerText${questionId}`).value = '';
        // Reload to show new answer and refresh tabs
        location.reload();
    };

    window.deleteQuestion = function(questionId) {
        if (!localStorage.getItem('adminLoggedIn')) {
            alert('Только администраторы могут удалять посты!');
            return;
        }
        if (confirm('Вы уверены, что хотите удалить этот пост?')) {
            deleteQuestion(questionId);
            location.reload();
        }
    };

    window.deleteUser = function(username) {
        if (!localStorage.getItem('adminLoggedIn')) {
            alert('Только администраторы могут удалять пользователей!');
            return;
        }
        if (confirm(`Вы уверены, что хотите удалить пользователя ${username}?`)) {
            deleteUser(username);
            alert('Пользователь удален.');
        }
    };

    function checkAdminStatus() {
        if (localStorage.getItem('adminLoggedIn') === 'true') {
            adminLogin.style.display = 'none';
            logoutBtn.style.display = 'block';
            // Show admin functionalities
            addAdminControls();
        } else {
            adminLogin.style.display = 'block';
            logoutBtn.style.display = 'none';
            // Hide admin functionalities
            removeAdminControls();
        }
    }

    function addAdminControls() {
        const questions = document.querySelectorAll('.question');
        questions.forEach(q => {
            const questionId = q.dataset.id;
            if (!q.querySelector('.answer-form')) {
                const answerForm = document.createElement('div');
                answerForm.className = 'answer-form';
                answerForm.innerHTML = `
                    <textarea id="answerText${questionId}" placeholder="Ваш ответ"></textarea>
                    <button onclick="answerQuestion(${questionId})">Ответить</button>
                `;
                q.appendChild(answerForm);
            }
            if (!q.querySelector('.moderation-btns')) {
                const modBtns = document.createElement('div');
                modBtns.className = 'moderation-btns';
                modBtns.innerHTML = `
                    <button onclick="deleteQuestion(${questionId})">Удалить вопрос</button>
                `;
                q.appendChild(modBtns);
            }
        });
    }

    function removeAdminControls() {
        document.querySelectorAll('.answer-form').forEach(form => form.remove());
        document.querySelectorAll('.moderation-btns').forEach(btns => btns.remove());
    }
});
