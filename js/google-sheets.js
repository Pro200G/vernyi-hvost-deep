// js/google-sheets.js - ИСПРАВЛЕННАЯ ВЕРСИЯ

// Загрузка главной страницы
window.loadHomepage = () => {
    const hero = document.querySelector('#hero p');
    const aboutDiv = document.querySelector('#about .content');
    
    if (hero) hero.textContent = 'Профессиональная помощь и забота о ваших питомцах';
    if (aboutDiv) aboutDiv.innerHTML = 'Кинологический центр «Верный хвост» — это команда опытных специалистов, любящих своё дело. Мы помогаем собакам и их хозяевам найти общий язык с 2010 года.';
};

// Загрузка новостей
window.loadNewsFromSheets = () => {
    const container = document.getElementById('news-list');
    if (!container) return;
    
    const demoNews = [
        { title: '🏆 Победа на выставке', date: '15 марта 2026', text: 'Наша ученица Рокси заняла 1 место в своей категории!' },
        { title: '🐕 Набор на курс "Послушный пёс"', date: '10 марта 2026', text: 'Старт группы 1 апреля. Осталось 3 места.' },
        { title: '📚 Новый семинар по зоопсихологии', date: '5 марта 2026', text: 'Приглашаем владельцев 25 марта. Вход свободной.' }
    ];
    
    container.innerHTML = demoNews.map(n => `
        <div class="news-item">
            <h3>${escapeHtml(n.title)}</h3>
            <small>${n.date}</small>
            <p>${escapeHtml(n.text)}</p>
        </div>
    `).join('');
};

// Загрузка услуг
window.loadServicesFromSheets = () => {
    const container = document.getElementById('services-list');
    if (!container) return;
    
    const demoServices = [
        { name: '🐕 Общий курс дрессировки (ОКД)', desc: 'Базовые команды и социализация', price: '5000 ₽ / месяц' },
        { name: '🏅 Хендлинг', desc: 'Подготовка к выставкам', price: '4000 ₽ / занятие' },
        { name: '❤️ Коррекция поведения', desc: 'Работа со страхами и агрессией', price: '4500 ₽ / консультация' }
    ];
    
    container.innerHTML = demoServices.map(s => `
        <div class="service-item">
            <h3>${escapeHtml(s.name)}</h3>
            <p>${escapeHtml(s.desc)}</p>
            <strong>${escapeHtml(s.price)}</strong>
        </div>
    `).join('');
};

// Вспомогательная функция
function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

// ⭐ ВАЖНО: Добавляем недостающую функцию для обратной совместимости
window.loadHomepageFromSheets = window.loadHomepage;