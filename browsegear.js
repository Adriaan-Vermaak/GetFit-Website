// Define cartItems as a global variable
const cartItems = [];

document.addEventListener('DOMContentLoaded', async () => {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    try {
        // Fetch products from the server
        const products = await fetch('/products').then(response => response.json());
        const productList = document.getElementById('product-list');

        if (!productList) {
            console.error('Product list element not found.');
            return;
        }

        // Clear previous content
        productList.innerHTML = '';

        // Display each product in the product list
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');

            const productName = document.createElement('h3');
            productName.textContent = product.Name;

            const productPrice = document.createElement('p');
            productPrice.textContent = `Price: R${product.Price.toFixed(2)}`;

            const addToCartButton = document.createElement('button');
            addToCartButton.textContent = 'Add to Cart';

            addToCartButton.addEventListener('click', () => {
                if (isInCart(product)) {
                    alert('This item is already in your cart.');
                } else {
                    cartItems.push(product); // Add product to cartItems array
                    localStorage.setItem('cartItems', JSON.stringify(cartItems));
                    console.log('Current cart items:', cartItems);
                    alert('Product added to cart');
                }
            });

            // Append elements to product item
            productItem.appendChild(productName);
            productItem.appendChild(productPrice);
            productItem.appendChild(addToCartButton);

            // Append product item to product list
            productList.appendChild(productItem);
        });
    } catch (error) {
        console.error('Error fetching and displaying products:', error);
    }

    function isInCart(product) {
        return cartItems.some(item => item === product); // Check if exact reference exists
    }
});