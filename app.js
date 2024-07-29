document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemCount = document.querySelector('.cart_icon span');
    const cartItemList = document.querySelector('.cart_items');
    const cartIcon = document.querySelector('.cart_icon');
    const sidebar = document.getElementById('sidebar');
    const cartTotal = document.querySelector('.cart_total');

    let cartItems = [];
    let totalAmount = 0;

    addToCartButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const item = {
                name: document.querySelectorAll('.card .card_title')[index].textContent,
                price: parseFloat(document.querySelectorAll('.price')[index].textContent.slice(0)),
                quantity: 1,
            };
            const existingItem = cartItems.find((cartItem) => cartItem.name === item.name,);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cartItems.push(item);
            }
            totalAmount += item.price;
            updateCartUi();
            
        });
    
  

    function updateCartUi() {
        updateCartItemCount(cartItems.length);
        updateCartItemList();
        updateCartTotal();
    }

    function updateCartItemCount(count) {
        cartItemCount.textContent = count;
    }

    function updateCartItemList() {
        cartItemList.innerHTML = '';
        cartItems.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item', 'individual-cart-item');
            cartItem.innerHTML = `
                <span>(${item.quantity}x)${item.name}</span>
                <span class="cart-item-price">
                    $${(item.price * item.quantity).toFixed(2,)}
                    <button class="remove-item" data-index="${index}">
                        <i class="fa-solid fa-times"></i>
                    </button>
                </span>
            `;
            cartItemList.append(cartItem);
        });

        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                const index = event.target.dataset.index;
                removeItemFromCart(index);
            });
        });
    }

    function removeItemFromCart(index) {
        const removedItem = cartItems.splice(index, 1)[0];
        totalAmount -= removedItem.price * removedItem.quantity;
        updateCartUi();
    }

    function updateCartTotal() {
        cartTotal.textContent = `$${totalAmount.toFixed(2)}`;
    }

    cartIcon.addEventListener('click', () => {
        sidebar.classList.add('open');
    });

    const closeButton = document.querySelector('.sidebar_close');
    closeButton.addEventListener('click', () => {
        sidebar.classList.remove('open');
    });

  });
});
