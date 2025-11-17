// This file contains JavaScript functions related to admin functionalities, such as logging in and managing questions.

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

    function checkAdminStatus() {
        if (localStorage.getItem('adminLoggedIn') === 'true') {
            adminLogin.style.display = 'none';
            logoutBtn.style.display = 'block';
            // Show admin functionalities
            document.querySelectorAll('.answer-form').forEach(form => form.style.display = 'block');
            document.querySelectorAll('.moderation-btns').forEach(btns => btns.style.display = 'block');
        } else {
            adminLogin.style.display = 'block';
            logoutBtn.style.display = 'none';
            // Hide admin functionalities
            document.querySelectorAll('.answer-form').forEach(form => form.style.display = 'none');
            document.querySelectorAll('.moderation-btns').forEach(btns => btns.style.display = 'none');
        }
    }
});