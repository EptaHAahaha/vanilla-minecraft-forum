// This file handles interactions with local storage, including saving and retrieving questions and answers.

export function saveQuestion(question) {
    const questions = JSON.parse(localStorage.getItem('minecraftQuestions') || '[]');
    questions.push(question);
    localStorage.setItem('minecraftQuestions', JSON.stringify(questions));
}

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