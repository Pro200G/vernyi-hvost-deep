function saveHomepage() {
    const hero = document.getElementById('heroText').value;
    const about = document.getElementById('aboutText').value;
    const data = { hero, about };
    localStorage.setItem(STORAGE_KEYS.homepage, JSON.stringify(data));
    alert('Главная сохранена');
}

function addNews() {
    const title = prompt('Заголовок');
    const text = prompt('Текст');
    if (!title || !text) return;
    const news = loadData(STORAGE_KEYS.news, defaultNews);
    const newId = Math.max(0, ...news.map(n=>n.id)) + 1;
    news.push({ id: newId, title, text, date: new Date().toISOString().slice(0,10) });
    localStorage.setItem(STORAGE_KEYS.news, JSON.stringify(news));
    alert('Новость добавлена');
}

// При загрузке админки заполняем поля
document.addEventListener('DOMContentLoaded', () => {
    const homepage = loadData(STORAGE_KEYS.homepage, defaultHomepage);
    document.getElementById('heroText').value = homepage.hero;
    document.getElementById('aboutText').value = homepage.about;
});