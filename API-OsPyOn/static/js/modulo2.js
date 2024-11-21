const accordions = document.querySelectorAll('.accordion-modulo2');

accordions.forEach(accordion => {
    accordion.addEventListener('click', () => {
        const body = accordion.querySelector('.accordion-body-modulo2');
        body.classList.toggle('active');
    })
})