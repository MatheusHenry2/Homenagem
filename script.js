const images = [
    'assets/imagens/foto1.jpeg',
    'assets/imagens/foto2.jpeg',
    'assets/imagens/foto3.jpeg',
    'assets/imagens/foto4.jpeg',
    'assets/imagens/foto5.jpeg',
    'assets/imagens/foto6.jpeg'
];
let currentIndex = 0;
const imgEl = document.getElementById('swipe-image');
const btnNext = document.getElementById('btn-next');
const btnPrev = document.getElementById('btn-prev');
const heartContainer = document.getElementById('heart-container');

// Troca a imagem e dá um “tilt” de feedback
function updateImage(dir) {
    imgEl.style.transform = `translateX(${dir * 80}px) rotate(${dir * 5}deg)`;
    setTimeout(() => imgEl.style.transform = '', 300);
    imgEl.src = images[currentIndex];
}

// Gera N corações na posição (x,y)
function spawnHeartsAt(x, y, count = 5) {
    for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerText = '❤️';
        // espalha +/-20px em volta do toque
        heart.style.left = x + (Math.random() * 40 - 20) + 'px';
        heart.style.top = y + (Math.random() * 40 - 20) + 'px';
        heartContainer.appendChild(heart);
        heart.addEventListener('animationend', () => heart.remove());
    }
}

// Clique nas setas
btnNext.addEventListener('click', e => {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage(+1);
    spawnHeartsAt(e.clientX, e.clientY, 8);
});
btnPrev.addEventListener('click', e => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage(-1);
    spawnHeartsAt(e.clientX, e.clientY, 8);
});

// Swipe no celular
let startX = 0,
    threshold = 50;
imgEl.addEventListener('touchstart', e => {
    startX = e.changedTouches[0].clientX;
});
imgEl.addEventListener('touchend', e => {
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;
    if (Math.abs(diff) > threshold) {
        if (diff < 0) btnNext.click();
        else btnPrev.click();
    }
});