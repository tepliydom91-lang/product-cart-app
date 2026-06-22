const products = [
    { id: 1, name: 'Black and White Bangle', image: '/obrazky/55.png', price: 205.15 },
    { id: 2, name: 'Black Ceramic Circle', image: '/obrazky/53.png', price: 131.62 },
    { id: 3, name: 'Cubetto Bracelet', image: '/obrazky/50.png', price: 72.79 },
    { id: 4, name: 'Grey Pearl', image: '/obrazky/38.png', price: 50.74 },
    { id: 5, name: 'Link Bracelet', image: '/obrazky/11.png', price: 21.32 },
    { id: 6, name: 'Onyx Cuff', image: '/obrazky/54.png', price: 146.33 },
    { id: 7, name: 'Twist Bangle', image: '/obrazky/28.png', price: 28.68 },
    { id: 8, name: 'Zebra Bracelet', image: '/obrazky/52.png', price: 80.15 }
];

let cart = [];

function renderProducts() {
    const productsGrid = document.querySelector('.products-grid');
    productsGrid.innerHTML = '';

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';

        card.innerHTML = `
            <h3 class="product-title">${product.name}</h3>
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <p>${product.price} UAH</p>
            <div class="quantity-controls">
                <button class="btn-add" data-id="${product.id}">+1</button>
                <button class="btn-delete" data-id="${product.id}">-1</button>
            </div>
        `;

        productsGrid.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', renderProducts);

document.querySelector('.products-grid').addEventListener('click', event => {
    const id = parseInt(event.target.dataset.id);

    if (event.target.classList.contains('btn-add')) {
        addToCart(id);
    }

    if (event.target.classList.contains('btn-delete')) {
        removeFromCart(id);
    }
});

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const itemInCart = cart.find(item => item.id === productId);

    if (itemInCart) {
        itemInCart.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    updateCartDisplay();
}

function removeFromCart(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);

    if (itemIndex !== -1) {
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity -= 1;
        } else {
            cart.splice(itemIndex, 1);
        }
    }

    updateCartDisplay();
}

function updateCartDisplay() {
    const cartContent = document.querySelector('#cart-content');
    cartContent.innerHTML = '';

    cart.forEach(item => {
        const items = document.createElement('div');
        items.className = 'cartCont';
        items.innerHTML = `${item.name} x${item.quantity} = ${(item.price * item.quantity).toFixed(2)} UAH`;
        cartContent.appendChild(items);
    });

    const total = cart.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
    }, 0);

    if (cart.length > 0) {
        const totalDiv = document.createElement('div');
        totalDiv.className = 'cart-total';
        totalDiv.innerHTML = `<strong>Total: ${total.toFixed(2)} UAH</strong>`;
        cartContent.appendChild(totalDiv);
    }
}