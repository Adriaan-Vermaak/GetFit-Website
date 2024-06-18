document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalCostContainer = document.getElementById('total-cost');
    const purchaseNowButton = document.createElement('button');

    if (!cartItemsContainer || !totalCostContainer) {
        console.error('Cart items container or total cost container not found.');
        return;
    }

    // Retrieve cart items from local storage
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    const renderCartItems = () => {
        // Clear previous content in cart items container
        cartItemsContainer.innerHTML = '';

        // Display each cart item in the cart items container
        let totalCost = 0;
        cartItems.forEach((item, index) => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');

            const itemName = document.createElement('h3');
            itemName.textContent = item.Name;

            const itemPrice = document.createElement('p');
            itemPrice.textContent = `Price: R${item.Price.toFixed(2)}`;

            // Create Remove button
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove from Cart';
            removeButton.addEventListener('click', () => {
                cartItems.splice(index, 1); // Remove item from cartItems array
                localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Update local storage
                renderCartItems(); // Re-render cart items
            });

            cartItemElement.appendChild(itemName);
            cartItemElement.appendChild(itemPrice);
            cartItemElement.appendChild(removeButton);

            cartItemsContainer.appendChild(cartItemElement);

            // Add item price to total cost
            totalCost += item.Price;
        });

        // Clear previous total cost content
        totalCostContainer.innerHTML = '';

        // Display total cost
        const totalCostElement = document.createElement('div');
        totalCostElement.textContent = `Total Cost: R${totalCost.toFixed(2)}`;
        totalCostContainer.appendChild(totalCostElement);

        // Check if Purchase Now button already exists
        const existingPurchaseButton = document.getElementById('purchase-button');
        if (!existingPurchaseButton) {
            // Create and append Purchase Now button
            const purchaseNowButton = document.createElement('button');
            purchaseNowButton.textContent = 'Purchase Now';
            purchaseNowButton.id = 'purchase-button';
            purchaseNowButton.addEventListener('click', () => {
                // Navigate to purchase.html when Purchase Now is clicked
                if (cartItems.length === 0) {
                    alert('Your cart is empty. Please add items to the cart before proceeding to purchase.');
                } else {
                    // Navigate to purchase.html when Purchase Now is clicked
                    window.location.href = 'purchase.html';
                }
            });

            // Style the Purchase Now button
    purchaseNowButton.textContent = 'Purchase Now';
    purchaseNowButton.id = 'purchase-button';
    purchaseNowButton.classList.add('purchase-button'); // Apply the purchase-button class
    purchaseNowButton.style.backgroundColor = '#32CD32'; // Bright green color
    purchaseNowButton.style.color = '#fff'; // white text color
    purchaseNowButton.style.border = 'none';
    purchaseNowButton.style.borderRadius = '5px';
    purchaseNowButton.style.cursor = 'pointer';
    purchaseNowButton.style.display = 'block'; // Display as block element
    purchaseNowButton.style.width = '200px'; // Set a fixed width
    purchaseNowButton.style.margin = '20px auto'; // Center the button horizontally
    purchaseNowButton.style.padding = '10px'; // Add padding for better appearance
    purchaseNowButton.style.textAlign = 'center'; // Center text

            // Append Purchase Now button to the document body
            document.body.appendChild(purchaseNowButton);
        }
    };

    renderCartItems(); // Initial render
});
