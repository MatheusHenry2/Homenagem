// --- Quiz Data ---
const quizData = [
    { q: 'Onde a gente se viu pela primeira vez?', options: ['No cinema', 'Na praça', 'No bar no centro de Limeira', 'No shopping'], correct: 2 },
    { q: 'Onde a gente se beijou pela primeira vez?', options: ['No parque', 'No restaurante', 'Em seu carro', 'Na praia'], correct: 2 },
    { q: 'Onde eu falei "eu te amo" pela primeira vez?', options: ['No bar do centro', 'No Dom Pedro', 'Em casa', 'Na escola'], correct: 1 },
    { q: 'Qual a coisa que eu mais gosto em você?', options: ['Seu senso de humor', 'Seu estilo', 'Sua inteligência', 'Seu carinho'], correct: 3 },
    { q: 'Qual foi o primeiro filme que assistimos juntos?', options: ['Titanic', 'Batman', 'A Era do Gelo', 'Matrix'], correct: 1 },
    { q: 'Que hábito seu me faz sorrir todo dia?', options: ['Quando você diz bom-dia', 'Quando você me faz cafuné', 'Quando você cozinha para mim', 'Quando você sorri pra mim'], correct: 1 }
];
let qi = 0;

// referências do DOM
const quizSection = document.getElementById('quiz-section');
const questionEl = document.getElementById('quiz-question');
const optsCont = document.getElementById('quiz-options');
const progEl = document.getElementById('quiz-progress');

const sliderSection = document.getElementById('slider-section');
const imgEl = document.getElementById('swipe-image');
const btnNext = document.getElementById('btn-next');
const btnPrev = document.getElementById('btn-prev');
const heartCard = document.getElementById('heart-card');
const hearts = document.getElementById('heart-container');

const images = [
    'assets/imagens/foto1.jpeg',
    'assets/imagens/foto2.jpeg',
    'assets/imagens/foto3.jpeg',
    'assets/imagens/foto4.jpeg',
    'assets/imagens/foto5.jpeg',
    'assets/imagens/foto6.jpeg'
];
let currentIndex = 0;

// carrega pergunta
function loadQuestion() {
    const d = quizData[qi];
    questionEl.innerText = d.q;
    optsCont.innerHTML = '';
    d.options.forEach((opt, i) => {
        const b = document.createElement('button');
        b.className = 'quiz-btn';
        b.innerText = opt;
        b.onclick = () => selectOption(i === d.correct);
        optsCont.appendChild(b);
    });
    progEl.innerText = `Pergunta ${qi+1} de ${quizData.length}`;
}
loadQuestion();

// trata resposta
function selectOption(isCorrect) {
    if (!isCorrect) {
        alert('❌ Ops! Resposta errada. Tente de novo com carinho! ❌');
        return;
    }
    animateBigHeart();
    setTimeout(() => {
        qi++;
        if (qi < quizData.length) {
            loadQuestion();
        } else {
            // fim do quiz: esconde o quiz e mostra o slider
            quizSection.style.display = 'none';
            sliderSection.style.display = 'block';
            currentIndex = 0;
            updateImage(0);
        }
    }, 600);
}

// atualiza imagem
function updateImage(dir = 0) {
    if (dir) {
        imgEl.style.transform = `translateX(${dir*80}px) rotate(${dir*5}deg)`;
        setTimeout(() => imgEl.style.transform = '', 300);
    }
    imgEl.src = images[currentIndex];
    imgEl.style.opacity = 1;
}

// exibe cartão final
function showHeartCard() {
    imgEl.style.opacity = 0;
    setTimeout(() => {
        imgEl.classList.add('hidden');
        heartCard.classList.remove('hidden');
        heartCard.classList.add('visible');
        spawnHeartsAt(window.innerWidth / 2, window.innerHeight / 2, 15);
    }, 500);
}

// animação de coração grande
function animateBigHeart() {
    const h = document.createElement('div');
    h.className = 'big-heart';
    h.innerText = '❤️';
    document.body.appendChild(h);
    h.addEventListener('animationend', () => h.remove());
}

// pequenos corações pipocando
function spawnHeartsAt(x, y, count = 5) {
    for (let i = 0; i < count; i++) {
        const h = document.createElement('div');
        h.className = 'heart';
        h.innerText = '❤️';
        h.style.left = x + (Math.random() * 40 - 20) + 'px';
        h.style.top = y + (Math.random() * 40 - 20) + 'px';
        document.body.appendChild(h);
        h.addEventListener('animationend', () => h.remove());
    }
}

// navegação
btnNext.onclick = e => {
    if (currentIndex < images.length - 1) {
        currentIndex++;
        updateImage(+1);
        animateBigHeart();
        spawnHeartsAt(e.clientX, e.clientY, 6);
    } else {
        showHeartCard();
    }
};
btnPrev.onclick = e => {
    if (!heartCard.classList.contains('hidden')) {
        heartCard.classList.remove('visible');
        setTimeout(() => {
            heartCard.classList.add('hidden');
            imgEl.classList.remove('hidden');
            currentIndex = images.length - 1;
            updateImage(0);
        }, 500);
    } else if (currentIndex > 0) {
        currentIndex--;
        updateImage(-1);
        animateBigHeart();
        spawnHeartsAt(e.clientX, e.clientY, 6);
    }
};

// swipe mobile
let startX = 0,
    threshold = 50;
document.getElementById('swipe-container')
    .addEventListener('touchstart', e => startX = e.changedTouches[0].clientX);
document.getElementById('swipe-container')
    .addEventListener('touchend', e => {
        const diff = e.changedTouches[0].clientX - startX;
        if (Math.abs(diff) > threshold)(diff < 0 ? btnNext : btnPrev).click();
    });