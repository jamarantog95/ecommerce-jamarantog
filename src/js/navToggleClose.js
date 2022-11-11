
export function navToggleClose() {
    const iconMenu = document.querySelector(".nav_toggle");
    const menu = document.querySelector(".menu_options");
    const iconClose = document.getElementById('nav-close');
    const navLink = document.querySelectorAll('.menu_link');

    if (iconMenu) {
        iconMenu.addEventListener("click", function () {
            menu.classList.toggle("show_menu");
        });
    }

    if (iconClose) {
        iconClose.addEventListener("click", function () {
            menu.classList.remove('show_menu')
        })
    }

    function linkAction() {
        const menu = document.querySelector(".menu_options");
        menu.classList.remove('show_menu')
    }
    navLink.forEach(e => e.addEventListener('click', linkAction))

}