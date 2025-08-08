document.addEventListener('DOMContentLoaded', function() {
    const fadeInElements = document.querySelectorAll('.fade-in-up');
    const sections = document.querySelectorAll('.content-section');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 // A animação será disparada quando 20% do elemento estiver visível
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Também observe elementos específicos dentro das seções, como cards e blocos
    fadeInElements.forEach(element => {
        observer.observe(element);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const carouselTrack = document.querySelector('.carousel-track');
    const cards = Array.from(carouselTrack.children);
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const numCards = cards.length;

    let currentIndex = 2;

    const updateCarousel = () => {
        // Remove a classe 'active' de todos os cards
        cards.forEach(card => card.classList.remove('active'));

        // Adiciona a classe 'active' ao card atual
        cards[currentIndex].classList.add('active');

        // Calcula a largura total de um card com a margem
        const cardWidth = cards[0].offsetWidth;
        const cardMargin = parseFloat(window.getComputedStyle(cards[0]).marginRight) * 2;
        const totalCardWidth = cardWidth + cardMargin;

        // Calcula o offset para centralizar o card ativo
        // O valor `(carouselTrack.offsetWidth / 2)` é a metade do contêiner visível
        // O valor `(totalCardWidth / 2)` é a metade do card
        // O valor `(totalCardWidth * currentIndex)` move a pista para a esquerda
        const offset = (carouselTrack.offsetWidth / 2) - (totalCardWidth / 2) - (totalCardWidth * currentIndex);
        carouselTrack.style.transform = `translateX(${offset}px)`;
    };

    const handleNextClick = () => {
        currentIndex = (currentIndex + 1) % numCards;
        updateCarousel();
    };

    const handlePrevClick = () => {
        currentIndex = (currentIndex - 1 + numCards) % numCards;
        updateCarousel();
    };

    nextButton.addEventListener('click', handleNextClick);
    prevButton.addEventListener('click', handlePrevClick);

    // Inicializa o carrossel no estado correto
    updateCarousel();

    // Adiciona event listeners para o clique nos cards
    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });

    // Animação de entrada
    const fadeInElements = document.querySelectorAll('.fade-in-up');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    fadeInElements.forEach(element => {
        observer.observe(element);
    });
});