const products = [
  { name: "smartphone(nokia)", price: 14999, category: "electronics", image: "Images/smartphone(nokia).jpg" },
  { name: "headphones", price: 999, category: "electronics", image: "Images/headphones.jpg" },
  { name: "T-shirt", price: 899, category: "fashion", image: "Images/T-shirt.jpg" },
  { name: "novelbook(never ending sky)", price: 350, category: "books", image: "Images/novelbook(never ending sky).jpg" },
  { name: "Mysore sandal soap", price: 219, category: "personalcare", image: "Images/Mysore sandal soap.jpg" },
  { name: "dell laptop", price: 45599, category: "electronics", image: "Images/dell laptop.png" },
  { name: "washing machine", price: 25799, category: "electronics", image: "Images/washing machine.webp" },
  { name: "cotton chudidar", price: 1599, category: "fashion", image: "Images/cotton chudidar.webp" },
];

let cart = [];
let loggedInUser = null;

function showLogin() {
  document.getElementById("login-section").style.display = "block";
  document.getElementById("store-section").style.display = "none";
}

function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user && pass) {
    loggedInUser = user;
    document.getElementById("user-display").textContent = user;
    document.getElementById("login-section").style.display = "none";
    document.getElementById("store-section").style.display = "block";
    document.getElementById("logout-link").style.display = "inline";
    renderProducts();
  } else {
    alert("Please enter valid credentials.");
  }
}

function logout() {
  loggedInUser = null;
  cart = [];
  updateCartCount();
  document.getElementById("store-section").style.display = "none";
  document.getElementById("login-section").style.display = "block";
  document.getElementById("logout-link").style.display = "none";
}

function renderProducts(category = "all") {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  const filteredProducts = category === "all"
    ? products
    : products.filter(p => p.category === category);

  filteredProducts.forEach(product => {
    productList.innerHTML += `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>Rs.${product.price}</p>
        <button class="btn" onclick="addToCart('${product.name}')">Add to Cart</button>
      </div>
    `;
  });
}

function filterProducts() {
  const category = document.getElementById("category").value;
  renderProducts(category);
}

function addToCart(productName) {
  cart.push(productName);
  updateCartCount();
}

function updateCartCount() {
  document.getElementById("cart-count").textContent = cart.length;
  renderCart();
}

function viewCart() {
  document.getElementById("cart-section").style.display = "block";
  renderCart();
}

function renderCart() {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";

  const cartMap = {};
  cart.forEach(item => {
    cartMap[item] = (cartMap[item] || 0) + 1;
  });

  for (let item in cartMap) {
    cartItems.innerHTML += `<li>${item} x ${cartMap[item]}</li>`;
  }
}
