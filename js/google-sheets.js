// ES2022+ — загрузка из Google Sheets
const SHEET_ID = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRnh99phAE83EJBntxu94-AiAR4_fGjK9BBBGSKAycQDhqgMpdy-Yhfa-c2f-ec2_JkkswbkGtyysRv/pubhtml'; // Замените на реальный ID

// Конвертируем CSV из Google Sheets в JSON
async function fetchSheet(sheetName) {
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;
    const response = await fetch(url);
    const csvText = await response.text();
    
    // Парсим CSV
    const rows = csvText.split('\n').filter(row => row.trim());
    const headers = rows[0].split(',').map(h => h.replace(/"/g, '').trim());
    
    return rows.slice(1).map(row => {
        const values = row.split(',').map(v => v.replace(/"/g, '').trim());
        const obj = {};
        headers.forEach((h, i) => { obj[h] = values[i] || ''; });
        return obj;
    });
}

// Загружаем все данные
window.loadHomepageFromSheets = async () => {
    try {
        const data = await fetchSheet('Главная');
        if (data.length > 0) {
            const hero = document.querySelector('#hero p');
            const aboutDiv = document.querySelector('#about .content');
            if (hero) hero.textContent = data[0].hero;
            if (aboutDiv) aboutDiv.textContent = data[0].about;
        }
    } catch(e) {
        console.error('Ошибка загрузки:', e);
        document.querySelector('#hero p').textContent = 'Не удалось загрузить данные';
    }
};

window.loadNewsFromSheets = async () => {
    try {
        const news = await fetchSheet('Новости');
        const container = document.getElementById('news-list');
        if (!container) return;
        
        container.innerHTML = news.map(n => `
            <article>
                <h3>${escapeHtml(n.title)}</h3>
                <time>${n.date}</time>
                <p>${escapeHtml(n.text)}</p>
            </article>
        `).join('');
    } catch(e) {
        console.error(e);
    }
};

window.loadServicesFromSheets = async () => {
    try {
        const services = await fetchSheet('Услуги');
        const container = document.getElementById('services-list');
        if (!container) return;
        
        container.innerHTML = services.map(s => `
            <div class="service">
                <h3>${escapeHtml(s.name)}</h3>
                <p>${escapeHtml(s.desc)} — ${escapeHtml(s.price)}</p>
            </div>
        `).join('');
    } catch(e) {
        console.error(e);
    }
};

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}