// ES2022+
const STORAGE_KEYS = {
    homepage: 'verniy_homepage',
    news: 'verniy_news',
    services: 'verniy_services'
};

const defaultHomepage = {
    hero: 'Профессиональная кинологическая помощь',
    about: 'Центр «Верный хвост» работает с 2010 года. Дрессировка, коррекция поведения, зоопсихология.'
};

const defaultNews = [
    { id: 1, title: 'Открыт набор на весну', date: '2026-03-01', text: 'Старт курса послушания 10 марта' },
    { id: 2, title: 'Семинар по аджилити', date: '2026-02-20', text: 'Приглашаем активных собак' }
];

const defaultServices = [
    { id: 1, name: 'ОКД', price: '5000₽', desc: 'Общий курс дрессировки' },
    { id: 2, name: 'Коррекция страхов', price: '3500₽', desc: 'Индивидуально' }
];

function loadData(key, defaults) {
    const stored = localStorage.getItem(key);
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch(e) { return defaults; }
    }
    localStorage.setItem(key, JSON.stringify(defaults));
    return defaults;
}

window.loadHomepage = () => {
    const data = loadData(STORAGE_KEYS.homepage, defaultHomepage);
    const hero = document.querySelector('#hero p');
    const aboutDiv = document.querySelector('#about .content');
    if (hero) hero.textContent = data.hero;
    if (aboutDiv) aboutDiv.textContent = data.about;
};

window.loadNews = () => {
    const news = loadData(STORAGE_KEYS.news, defaultNews);
    const container = document.getElementById('news-list');
    if (!container) return;
    container.innerHTML = news.map(n => `
        <article>
            <h3>${escapeHtml(n.title)}</h3>
            <time>${n.date}</time>
            <p>${escapeHtml(n.text)}</p>
        </article>
    `).join('');
};

window.loadServices = () => {
    const services = loadData(STORAGE_KEYS.services, defaultServices);
    const container = document.getElementById('services-list');
    if (!container) return;
    container.innerHTML = services.map(s => `
        <div class="service">
            <h3>${escapeHtml(s.name)}</h3>
            <p>${escapeHtml(s.desc)} — ${escapeHtml(s.price)}</p>
        </div>
    `).join('');
};

function escapeHtml(str) {
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}