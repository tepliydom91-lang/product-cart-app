
const products = [
    {
        id: 1,
        name: 'Black and White Bangle',
        image: '/obrazky/55.png',
        price: 205.15
    },
    {
        id: 2,
        name: 'Black Ceramic Circle',
        image: '/obrazky/53.png',
        price: 131.62
    },
    {
        id: 3,
        name: 'Cubetto Bracelet',
        image: '/obrazky/50.png',
        price: 72.79
    },
    {
        id: 4,
        name: 'Grey Pearl',
        image: '/obrazky/38.png',
        price: 50.74
    },
    {
        id: 5,
        name: 'Link Bracelet',
        image: '/obrazky/11.png',
        price: 21.32
    },
    {
        id: 6,
        name: 'Onyx Cuff',
        image: '/obrazky/54.png',
        price: 146.33
    },
    {
        id: 7,
        name: 'Twist Bangle',
        image: '/obrazky/28.png',
        price: 28.68
    },
    {
        id: 8,
        name: 'Zebra Bracelet',
        image: '/obrazky/52.png',
        price: 80.15
    }
];

let cart =[];

function renderProducts() {
    const productsGrid = document.querySelector('.products-grid');
    productsGrid.innerHTML = '';
//Map
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
        <h3 class="product-title">${product.name}</h3>
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <p>${product.price}</p>
            <div class="quantity-controls">
        <button class="btn-add" data-id="${product.id}">+1</button>
        <button class="btn-delete" data-id="${product.id}">-1</button>
            </div>
        `;
        
        productsGrid.appendChild(card)
    });
}

document.addEventListener('DOMContentLoaded', renderProducts);

const allAddBtn = document.querySelectorAll('.btn-add');
const allDleteBtn = document.querySelectorAll('.btn-delete');


document.querySelector('.products-grid').addEventListener('click', event => {
    const target = event.target;
    if (target.classList.contains('btn-add')) {
        const id = parseInt(target.dataset.id);
        console.log(id)
        addToCart(id)
    }
    if (target.classList.contains('btn-delete')) {
        const id = parseInt(target.dataset.id);
        removeFromCart(id)
    }
})



function addToCart (productId) {
    const product = products.find(p => p.id === productId);
    const itemInCart = cart.find(item => item.id === productId)

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
    const cartContent = document.querySelector('#cart-content');
console.log(cart)
    cartContent.innerHTML = '';
    cart.forEach(item => {
        const items = document.createElement('div');
        items.className = 'cartCont';
        items.innerHTML = `${item.name} x${item.quantity} = UAH${(item.price * item.quantity)}`;
        cartContent.appendChild(items);
    });
    document.addEventListener('DOMContentLoaded', renderProducts);
}



function removeFromCart (productId){
    const itemIndex = cart.findIndex(item => item.id === productId)

    if(itemIndex) {
        cart[itemIndex].quantity -= 1;
    }else  {
    cart.splice(itemIndex,1)
}
}