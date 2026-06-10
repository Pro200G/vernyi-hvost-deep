// Упрощенная версия с публичным URL
const SHEET_ID = '16lElys9wkme8fOiFM3t60h0UJepLfK2krDh_FC1KjR8';

// Функция для отладки
function logError(context, error) {
    console.error(`Ошибка ${context}:`, error);
    const container = document.getElementById('news-list') || document.getElementById('services-list');
    if (container && container.innerHTML.includes('Загрузка')) {
        container.innerHTML = `<p style="color:red">⚠️ Ошибка загрузки: ${context}. Проверьте интернет и ID таблицы.</p>`;
    }
}

// Загрузка новостей
window.loadNewsFromSheets = async () => {
    try {
        console.log('Загружаем новости...');
        const url = `https://opensheet.elk.sh/${SHEET_ID}/Новости`;
        console.log('URL:', url);
        
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const news = await response.json();
        console.log('Получено новостей:', news.length);
        
        const container = document.getElementById('news-list');
        if (!container) return;
        
        if (news.length === 0) {
            container.innerHTML = '<p>Новостей пока нет</p>';
            return;
        }
        
        container.innerHTML = news.map(n => `
            <div class="news-item">
                <h3>${escapeHtml(n.title || 'Без заголовка')}</h3>
                <small>${n.date || ''}</small>
                <p>${escapeHtml(n.text || '')}</p>
            </div>
        `).join('');
    } catch(e) {
        logError('новости', e);
        document.getElementById('news-list').innerHTML = '<p>📋 Демо-новости: Скоро здесь появятся новости из Google Sheets</p>';
    }
};

// Загрузка услуг
window.loadServicesFromSheets = async () => {
    try {
        console.log('Загружаем услуги...');
        const url = `https://opensheet.elk.sh/${SHEET_ID}/Услуги`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const services = await response.json();
        console.log('Получено услуг:', services.length);
        
        const container = document.getElementById('services-list');
        if (!container) return;
        
        if (services.length === 0) {
            container.innerHTML = '<p>Услуг пока нет</p>';
            return;
        }
        
        container.innerHTML = services.map(s => `
            <div class="service-item">
                <h3>${escapeHtml(s.name || 'Без названия')}</h3>
                <p>${escapeHtml(s.desc || '')}</p>
                <strong>${escapeHtml(s.price || '')}</strong>
            </div>
        `).join('');
    } catch(e) {
        logError('услуги', e);
        document.getElementById('services-list').innerHTML = '<p>🐕 Демо-услуги: ОКД - 5000₽, Хендлинг - 4000₽</p>';
    }
};

function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

// Для главной страницы
window.loadHomepage = () => {
    const hero = document.querySelector('#hero p');
    const about = document.querySelector('#about .content');
    if (hero) hero.textContent = 'Профессиональная кинологическая помощь';
    if (about) about.textContent = 'Центр «Верный хвост» - опытные кинологи, индивидуальный подход';
};