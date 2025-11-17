function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Intl.DateTimeFormat('ru-RU', options).format(date);
}

function validateInput(input) {
    return input && input.trim().length > 0;
}

function generateUniqueId() {
    return Date.now();
}

export { formatDate, validateInput, generateUniqueId };