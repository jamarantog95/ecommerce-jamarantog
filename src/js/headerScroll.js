// ======================== Scroll Fondo Menu ======================== //
export function headerScroll() {
    const navbarmenu = document.getElementById('navbar_scroll')

    if (navbarmenu) {
        window.addEventListener('scroll', function () {
            if (window.scrollY >= 50) {
                navbarmenu.classList.add('scroll-menu')
            } else {
                navbarmenu.classList.remove('scroll-menu')
            }
        })
    }
}