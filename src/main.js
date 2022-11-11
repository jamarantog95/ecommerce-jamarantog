

import { load } from './js/loadTheme.js'
import { darkTheme } from './js/darkTheme.js'
import { headerScroll } from './js/headerScroll.js'
import { navToggleClose } from './js/navToggleClose.js'
import { sectionActive } from './js/activeLink.js'
import { navToggleShop } from './js/navToggleShop.js'

window.addEventListener('load', function () {
    load()
});

document.addEventListener('DOMContentLoaded', function () {
    darkTheme()
    headerScroll()
    navToggleClose()
    sectionActive()
    navToggleShop()
    // sectionActive()
    // renderCart()
    // renderProducts()
    // activeProduct()

    // mixitup('.products__content', {
    //     selectors: {
    //         target: '.products__card'
    //     },
    //     animation: {
    //         duration: 300
    //     }
    // }).filter('all')
})

