var cart = [];
var products = [];

document.addEventListener('DOMContentLoaded', function() {
  generateProducts();
  updateCart();
});

function generateProducts() {
  for (let i = 1; i <= 50; i++) {
    products.push({
      id: i,
      name: 'Product ' + i,
      price: Math.floor(Math.random() * 100) + 1,
      quantity: 0
    });
  }
  renderProducts();
}

function renderProducts() {
  var cartItems = document.getElementById('cartItems');
  cartItems.innerHTML = '';
  var total = 0;
  cart.forEach(function(item) {
    var li = document.createElement('li');
    li.textContent = `${item.name} - Quantity: ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
    var removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', function() {
      removeFromCart(item.id);
    });
    li.appendChild(removeBtn);
    cartItems.appendChild(li);
    total += item.price * item.quantity;
  });
  document.getElementById('cartTotal').textContent = total.toFixed(2);
}

function addToCart(productId) {
  var product = products.find(p => p.id === productId);
  var cartItem = cart.find(item => item.id === productId);
  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, quantity: 1 });
  }
  updateCart();
}

function removeFromCart(productId) {
  var index = cart.findIndex(item => item.id === productId);
  if (index !== -1) {
    if (cart[index].quantity > 1) {
      cart[index].quantity--;
    } else {
      cart.splice(index, 1);
    }
  }
  updateCart();
}

function updateCart() {
  var cartItems = document.getElementById('cartBtn');
  cartItems.textContent = 'Cart (' + cart.reduce((total, item) => total + item.quantity, 0) + ')';
  renderProducts();
}

function showTab(tabName) {
  var tabs = document.querySelectorAll('.tab-content');
  tabs.forEach(function(tab) {
    tab.style.display = 'none';
  });
  var tab = document.getElementById(tabName);
  tab.style.display = 'block';
}

function checkout() {
  showTab('payment');
}

function pay() {
  var paymentMethod = document.querySelector('input[name="payment"]:checked').value;
  alert('Payment method: ' + paymentMethod);
}

function createAccount() {
  alert('Creating account with Google');
}
