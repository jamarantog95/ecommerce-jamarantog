export function sectionActive() {
    const sections = document.querySelectorAll('section[id]')

    function fn() {
        const scrollY = window.pageYOffset

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight,
                sectionTop = current.offsetTop - 58,
                sectionId = current.getAttribute('id')

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.menu a[href*=' + sectionId + ']').classList.add('active_link')
            } else {
                document.querySelector('.menu a[href*=' + sectionId + ']').classList.remove('active_link')
            }
        })
    }

    window.addEventListener('scroll', fn)
}