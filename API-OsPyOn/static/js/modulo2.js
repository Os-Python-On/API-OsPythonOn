const accordions = document.querySelectorAll('.accordion2');

accordions.forEach(accordion => {
    accordion.addEventListener('click', () => {
        const body = accordion.querySelector('.accordion-body2');
        body.classList.toggle('active');
    })
})
