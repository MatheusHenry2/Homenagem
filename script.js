const images = [
    'assets/imagens/foto1.jpeg',
    'assets/imagens/foto2.jpeg',
    'assets/imagens/foto3.jpeg',
    'assets/imagens/foto4.jpeg',
    'assets/imagens/foto5.jpeg',
    'assets/imagens/foto6.jpeg'
];
let currentIndex = 0;
let hasSeenCard = false;

const imgEl = document.getElementById('swipe-image');
const btnNext = document.getElementById('btn-next');
const btnPrev = document.getElementById('btn-prev');
const swipeCt = document.getElementById('swipe-container');
const card = document.getElementById('heart-card');
const hearts = document.getElementById('heart-container');

function updateImage(dir = 0) {
    if (dir !== 0) {
        imgEl.style.transform = `translateX(${dir*80}px) rotate(${dir*5}deg)`;
        setTimeout(() => imgEl.style.transform = '', 300);
    }
    imgEl.src = images[currentIndex];
    imgEl.style.opacity = 1;
}

function showHeartCard() {
    hasSeenCard = true;
    imgEl.style.opacity = 0;
    setTimeout(() => {
        imgEl.classList.add('hidden');
        card.classList.remove('hidden');
        card.classList.add('visible');
        spawnHeartsAt(window.innerWidth / 2, window.innerHeight / 2, 15);
    }, 500);
}

function animateBigHeart() {
    const h = document.createElement('div');
    h.className = 'big-heart';
    h.innerText = '❤️';
    swipeCt.appendChild(h);
    h.addEventListener('animationend', () => h.remove());
}

function spawnHeartsAt(x, y, count = 5) {
    for (let i = 0; i < count; i++) {
        const h = document.createElement('div');
        h.className = 'heart';
        h.innerText = '❤️';
        h.style.left = x + (Math.random() * 40 - 20) + 'px';
        h.style.top = y + (Math.random() * 40 - 20) + 'px';
        hearts.appendChild(h);
        h.addEventListener('animationend', () => h.remove());
    }
}

btnNext.addEventListener('click', e => {
    if (!card.classList.contains('hidden')) {
        card.classList.remove('visible');
        setTimeout(() => {
            card.classList.add('hidden');
            currentIndex = 0;
            imgEl.classList.remove('hidden');
            updateImage(0);
        }, 500);
    } else if (currentIndex < images.length - 1) {
        currentIndex++;
        updateImage(+1);
        animateBigHeart();
        spawnHeartsAt(e.clientX, e.clientY, 6);
    } else {
        showHeartCard();
    }
});

btnPrev.addEventListener('click', e => {
    if (!card.classList.contains('hidden')) {
        card.classList.remove('visible');
        setTimeout(() => {
            card.classList.add('hidden');
            imgEl.classList.remove('hidden');
            currentIndex = images.length - 1;
            updateImage(0);
        }, 500);
    } else if (currentIndex > 0) {
        currentIndex--;
        updateImage(-1);
        animateBigHeart();
        spawnHeartsAt(e.clientX, e.clientY, 6);
    } else if (currentIndex === 0 && hasSeenCard) {
        showHeartCard();
    }

});


let startX = 0,
    threshold = 50;
swipeCt.addEventListener('touchstart', e => {
    startX = e.changedTouches[0].clientX;
});
swipeCt.addEventListener('touchend', e => {
    const diff = e.changedTouches[0].clientX - startX;
    if (Math.abs(diff) > threshold) {
        if (diff < 0) btnNext.click();
        else if (diff > 0) btnPrev.click();
    }
});