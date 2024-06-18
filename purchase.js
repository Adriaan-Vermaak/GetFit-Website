document.addEventListener('DOMContentLoaded', () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    const purchaseButton = document.getElementById('purchase-button');
    const nameInput = document.getElementById('name');
    const surnameInput = document.getElementById('surname');
    const addressInput = document.getElementById('address');
    const cityInput = document.getElementById('city');
    const postalCodeInput = document.getElementById('postal-code');
    const countryInput = document.getElementById('country');
    const paymentMethodInput = document.getElementById('payment-method');
    const cardExpiryInput = document.getElementById('card-expiry');
    const securityCodeInput = document.getElementById('card-security-code');

    purchaseButton.addEventListener('click', () => {
        if (!validateForm()) {
            alert('Please fill in all required fields and ensure the card expiry date is valid.');
            return;
        }

        // Proceed with purchase logic
        const purchaseMessage = `Product(s) purchased successfully: ${cartItems.map(item => item.Name).join(', ')}`;
        alert(purchaseMessage);

        // Clear cart items after purchase
        localStorage.removeItem('cartItems');

        // Clear form fields
        clearFormFields();

        // Redirect to dashboard after 3 seconds
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 3000);
    });

    function validateForm() {
        if (
            !nameInput.value ||
            !surnameInput.value ||
            !addressInput.value ||
            !cityInput.value ||
            !postalCodeInput.value ||
            !countryInput.value ||
            !paymentMethodInput.value ||
            !cardExpiryInput.value ||
            !securityCodeInput.value
        ) {
            return false;
        }

        // Validate card expiry date
        const currentDate = new Date();
        const cardExpiryDate = new Date(cardExpiryInput.value);
        if (cardExpiryDate < currentDate) {
            return false;
        }

        return true;
    }

    function clearFormFields() {
        nameInput.value = '';
        surnameInput.value = '';
        addressInput.value = '';
        cityInput.value = '';
        postalCodeInput.value = '';
        countryInput.value = '';
        paymentMethodInput.value = '';
        cardExpiryInput.value = '';
        securityCodeInput.value = '';
    }
});
