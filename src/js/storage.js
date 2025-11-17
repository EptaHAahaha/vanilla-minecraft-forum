// This file handles interactions with local storage, including saving and retrieving questions, answers, and users.

export function saveQuestion(question) {
    const questions = JSON.parse(localStorage.getItem('minecraftQuestions') || '[]');
    questions.push(question);
    localStorage.setItem('minecraftQuestions', JSON.stringify(questions));
}

// Note: loadQuestions already returns the array, no changes needed for new fields as they are optional

export function loadQuestions() {
    return JSON.parse(localStorage.getItem('minecraftQuestions') || '[]');
}

export function deleteQuestion(questionId) {
    const questions = loadQuestions();
    const updatedQuestions = questions.filter(q => q.id !== questionId);
    localStorage.setItem('minecraftQuestions', JSON.stringify(updatedQuestions));
}

export function saveAnswer(questionId, answer) {
    const questions = loadQuestions();
    const question = questions.find(q => q.id === questionId);
    if (question) {
        question.answers.push(answer);
        localStorage.setItem('minecraftQuestions', JSON.stringify(questions));
    }
}

// User management functions
export function registerUser(username, password, role = 'user') {
    const users = JSON.parse(localStorage.getItem('forumUsers') || '[]');
    if (users.find(u => u.username === username)) {
        return false; // User already exists
    }
    users.push({ username, password, role, lastQuestionTime: null });
    localStorage.setItem('forumUsers', JSON.stringify(users));
    return true;
}

export function loginUser(username, password) {
    const users = JSON.parse(localStorage.getItem('forumUsers') || '[]');
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        return user;
    }
    return null;
}

export function logoutUser() {
    localStorage.removeItem('currentUser');
}

export function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
}

export function checkRateLimit(username) {
    const users = JSON.parse(localStorage.getItem('forumUsers') || '[]');
    const user = users.find(u => u.username === username);
    if (!user || !user.lastQuestionTime) return true; // No limit if first question
    const now = new Date().getTime();
    const lastTime = new Date(user.lastQuestionTime).getTime();
    const limitMs = 30 * 60 * 1000; // 30 minutes
    return (now - lastTime) >= limitMs;
}

export function updateLastQuestionTime(username) {
    const users = JSON.parse(localStorage.getItem('forumUsers') || '[]');
    const userIndex = users.findIndex(u => u.username === username);
    if (userIndex !== -1) {
        users[userIndex].lastQuestionTime = new Date().toISOString();
        localStorage.setItem('forumUsers', JSON.stringify(users));
    }
}

export function loadUsers() {
    return JSON.parse(localStorage.getItem('forumUsers') || '[]');
}

export function deleteUser(username) {
    const users = loadUsers();
    const updatedUsers = users.filter(u => u.username !== username);
    localStorage.setItem('forumUsers', JSON.stringify(updatedUsers));
}
