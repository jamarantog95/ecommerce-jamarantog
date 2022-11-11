// Datos
let items = [
    {
        id: 1,
        name: 'Hoodies',
        price: 14.00,
        image: './src/img/featured1.png',
        category: 'hoodies',
        quantity: 10
    },
    {
        id: 2,
        name: 'Shirts',
        price: 24.00,
        image: './src/img/featured2.png',
        category: 'shirts',
        quantity: 15
    },
    {
        id: 3,
        name: 'Sweatshirts',
        price: 24.00,
        image: './src/img/featured3.png',
        category: 'sweatshirts',
        quantity: 20
    }
]

const contentProducts = document.querySelector(".products_content");
// const iconCart = document.querySelector(".nav_shop");


const contentCartShop = document.querySelector(".cart");
const contentCartShopItems = document.querySelector(".contentCartShop__items");


const countProd = document.querySelector(".countProd");
const contentCartShopTotal = document.querySelector(".contentCartShop__total");


let objCartShop = {};


// Mostrar Productos
function printProducts() {
    let html = "";

    items.forEach(({ id, name, price, image, category, quantity }) => {
        const btnBuy = quantity
            ? `<button class="button prod_btn" id="${id}">+</button>`
            : `<button class="btn btn__nodrop">No disponible</button>`;

        html += `
            <article class="product_card ${category}">
                <div class="products_shape">
                    <img src="${image}" alt="${name}" class="prod_img">
                </div>
                <div class="products_data">
                    <h2 class="prod_price">$${price.toFixed(2)}
                        <span class="prod_quantity">| Stock: ${quantity}</span>
                    </h2>
                    <h3 class="prod_name">${name}</h3>
                    ${btnBuy}
                </div>
            </article>
            `;
    });

    contentProducts.innerHTML = html;
}

// Mostrar Productos en el Carro
function printCarProducts() {
    let html = "";

    const arrayCartShop = Object.values(objCartShop);

    arrayCartShop.forEach(({ id, name, price, amount, image, quantity }) => {
        html += `
            <article class="cart__card">
                <div class="cart__box">
                    <img src="${image}" alt="${name}" class="cart__img">
                </div>

                <div class="cart__details">
                    <h3 class="cart__title">${name}</h3>
                    <span class="cart__stock">Stock:${quantity} und | <span class="cart__price">$${price.toFixed(2)}</span></span>
                    <span class="cart__subtotal">
                        Subtotal: $${amount * price}
                    </span>

                    <div class="cart__amount">
                        <div class="cart__amount-content">
                            <span class="cart__amount-box minus" data-id="${id}">
                                <i class="bx bx-minus" id=${id}></i>
                            </span>

                            <span class="cart__amount-number">${amount} units</span>

                            <span class="cart__amount-box plus" id="${id}">
                                <i class="bx bx-plus" id=${id}></i>
                            </span>
                        </div>

                        <i class="bx bx-trash-alt cart__amount-trash" id="${id}"></i>
                    </div>
                </div>
            </article>
        `;
    });

    contentCartShopItems.innerHTML = html;

    countProduct();
    printTotal();
}



// Funcion Contabiliza los productos
function countProduct() {
    const arrayCartShop = Object.values(objCartShop);

    let suma = arrayCartShop.reduce((acum, curr) => {
        acum += curr.amount;
        return acum;
    }, 0);

    countProd.textContent = suma;
}


// Funcion Agregar Producto al Carrito
function addProduct(idProd) {
    const currentProduct = items.find((prod) => prod.id === idProd);

    if (currentProduct.quantity === objCartShop[idProd].amount)
        return alert("No hay mas productos en el stock");

    objCartShop[currentProduct.id].amount++;
}


// Funcion Eliminar Producto del Carrito
function deleteProduct(idProd) {
    const op = confirm("Seguro que quieres eliminar?");

    if (op) {
        delete objCartShop[idProd];
    }
}


// Mostrar el Total + validacion vacios
function printTotal() {
    const arrayCartShop = Object.values(objCartShop);

    if (!arrayCartShop.length)
        return (contentCartShopTotal.innerHTML =
            `
            <div class="cart__empty">
                <img src="src/img/empty-cart.png" alt="empty cart">
                <h2>Your cart is empty</h2>
                <p>You can add items to your cart by clicking on the "<i class="bx bx-plus"></i>" button on the product
                    page.</p>
            </div>
            `);

    let total = arrayCartShop.reduce((acum, curr) => {
        acum += curr.price * curr.amount;
        return acum;
    }, 0);

    contentCartShopTotal.innerHTML = `
        <div class="cart__prices">
            <span class="cart__prices-total" id="cart-total">$${total.toFixed(2)}</span>
        </div>
        
        <button class="btn_comprar button cart__btn" id="cart-checkout">
            <i class='bx bxs-check-shield'></i> Checkout
        </button>


    `;
}



contentProducts.addEventListener("click", (e) => {
    if (e.target.classList.contains("button")) {
        const idProd = Number(e.target.id);

        const currentProduct = items.find((prod) => prod.id === idProd);

        if (objCartShop[currentProduct.id]) {
            addProduct(idProd);
        } else {
            objCartShop[currentProduct.id] = { ...currentProduct };
            objCartShop[currentProduct.id].amount = 1;
        }

        printCarProducts();
    }
});


contentCartShopItems.addEventListener("click", (e) => {

    // Evento Agregar Unidades x Producto
    if (e.target.classList.contains("bx-plus")) {
        const idProd = Number(e.target.id);
        addProduct(idProd);
    }

    // Evento Reducir Unidades x Producto
    if (e.target.classList.contains("bx-minus")) {
        const idProd = Number(e.target.id);

        if (objCartShop[idProd].amount === 1) {
            deleteProduct(idProd);
        } else {
            objCartShop[idProd].amount--;
        }
    }

    // Evento Eliminar Producto del Carrito
    if (e.target.classList.contains("cart__amount-trash")) {
        const idProd = Number(e.target.id);

        deleteProduct(idProd);
    }

    printCarProducts();
});


contentCartShopTotal.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn_comprar")) {
        const op = confirm("Estas seguro de esto?");

        if (op) {
            items = items.map((prod) => {
                if (objCartShop[prod.id]?.id === prod.id) {
                    return {
                        ...prod,
                        quantity: prod.quantity - objCartShop[prod.id].amount,
                    };
                } else {
                    return prod;
                }
            });

            objCartShop = {};
            printProducts();
            printCarProducts();
        }
    }
});

printProducts();
printTotal();







