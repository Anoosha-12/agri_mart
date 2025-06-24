// Navigation function
function navigateTo(page) {
  console.log(`Navigating to ${page} page`);
  // Add your navigation logic here
  if (page === "home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else if (page === "contact") {
    scrollToSection("#footer");
  }
}

// Category selection function
function showCategory(category) {
  console.log(`Selected category: ${category}`);

  // Add visual feedback
  const categoryElement = event.currentTarget;
  categoryElement.style.transform = "scale(0.95)";

  setTimeout(() => {
    categoryElement.style.transform = "scale(1.05)";

    setTimeout(() => {
      categoryElement.style.transform = "scale(1)";
    }, 150);
  }, 100);

  switch (category) {
    case "vegetables":
      alert("Explore our fresh vegetables collection!");
      break;
    case "salad":
      alert("Discover our healthy salad recipes!");
      break;
    case "fruits":
      alert("Browse our seasonal fruits selection!");
      break;
  }
}

// Footer link handlers
function handleFooterLink(action) {
  console.log(`Footer action: ${action}`);

  switch (action) {
    case "track-order":
      alert("Track Order - Redirecting to order tracking page...");
      break;
    case "become-rider":
      alert("Become A Rider - Join our delivery team!");
      break;
    case "contact-nutritionist":
      alert("Contact A Nutritionist - Get expert advice on healthy eating!");
      break;
    case "faq":
      alert("FAQ - Frequently Asked Questions page");
      break;
  }
}

// Social media handlers
function handleSocialLink(platform) {
  console.log(`Social media: ${platform}`);

  switch (platform) {
    case "facebook":
      alert("Opening Facebook page...");
      break;
    case "instagram":
      alert("Opening Instagram page...");
      break;
    case "twitter":
      alert("Opening Twitter page...");
      break;
  }
}

// Smooth scrolling function
function scrollToSection(sectionId) {
  const section = document.querySelector(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Add scroll event listener for header
  window.addEventListener("scroll", function () {
    const header = document.getElementById("header");
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Add scroll reveal effect for sections
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(document.querySelector(".about-section"));
  observer.observe(document.querySelector(".main-content"));
  observer.observe(document.querySelector(".footer"));

  // Add smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      scrollToSection(targetId);
    });
  });

  // Parallax effect for vegetables
  window.addEventListener("mousemove", function (e) {
    const vegetables = document.querySelectorAll(".vegetable");
    const herbs = document.querySelectorAll(".herb");

    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    vegetables.forEach((vegetable) => {
      const speed = parseFloat(vegetable.getAttribute("data-speed") || 0.05);
      const x = (window.innerWidth - vegetable.offsetWidth) * mouseX * speed;
      const y = (window.innerHeight - vegetable.offsetHeight) * mouseY * speed;

      vegetable.style.transform = `translate(${x}px, ${y}px)`;
    });

    herbs.forEach((herb) => {
      const speed = parseFloat(herb.getAttribute("data-speed") || 0.08);
      const x = (window.innerWidth - herb.offsetWidth) * mouseX * speed;
      const y = (window.innerHeight - herb.offsetHeight) * mouseY * speed;

      herb.style.transform = `translate(${x}px, ${y}px) rotate(${
        mouseX * 360
      }deg)`;
    });
  });

  // Add random movement to vegetables
  const vegetables = document.querySelectorAll(".vegetable");
  vegetables.forEach((veg, index) => {
    // Set random data-speed attribute
    veg.setAttribute("data-speed", (Math.random() * 0.05 + 0.02).toFixed(3));

    // Add random animation delay
    veg.style.animationDelay = `${-Math.random() * 15}s`;

    // Add random initial position variation
    const randomX = Math.random() * 40 - 20;
    const randomY = Math.random() * 40 - 20;
    veg.style.transform = `translate(${randomX}px, ${randomY}px)`;
  });
});
let cart = [];
let cartCount = 0;

// Add to cart functionality
function addToCart(fruitName, buttonElement) {
  const card = buttonElement.closest(".fruit-card");
  const quantityInput = card.querySelector(".qty-input");
  const quantity = parseInt(quantityInput.value);

  // Add visual feedback
  buttonElement.style.transform = "scale(0.95)";
  buttonElement.textContent = "Added!";
  buttonElement.style.background = "linear-gradient(135deg, #4CAF50, #45a049)";

  setTimeout(() => {
    buttonElement.style.transform = "scale(1)";
    buttonElement.textContent = "Add to Cart";
    buttonElement.style.background =
      "linear-gradient(135deg, #F4C430, #FFD700)";
  }, 1000);

  // Update cart
  const existingItem = cart.find((item) => item.name === fruitName);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      name: fruitName,
      quantity: quantity,
      type: "fruit",
    });
  }

  cartCount += quantity;
  updateCartDisplay();

  // Store in localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("cartCount", cartCount.toString());

  console.log(`Added ${quantity}kg of ${fruitName} to cart`);
}

// Update cart display
function updateCartDisplay() {
  document.getElementById("cartCount").textContent = cartCount;
}

// View cart
function viewCart() {
  if (cart.length === 0) {
    alert("Your cart is empty! Add some delicious fruits first.");
    return;
  }

  let cartSummary = "Your Cart:\n\n";
  cart.forEach((item) => {
    cartSummary += `${item.name}: ${item.quantity}kg\n`;
  });
  cartSummary += `\nTotal items: ${cartCount}kg`;

  alert(cartSummary); // Show the alert first

  // Then navigate to checkout.html
  window.location.href = "E:maam ponamagrimart projectcheckout.html";
}

// Load cart from localStorage on page load
document.addEventListener("DOMContentLoaded", function () {
  const savedCart = localStorage.getItem("cart");
  const savedCartCount = localStorage.getItem("cartCount");

  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
  if (savedCartCount) {
    cartCount = parseInt(savedCartCount);
    updateCartDisplay();
  }

  // Add scroll event listener for header
  window.addEventListener("scroll", function () {
    const header = document.getElementById("header");
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Add input validation for quantity inputs
  const quantityInputs = document.querySelectorAll(".qty-input");
  quantityInputs.forEach((input) => {
    input.addEventListener("change", function () {
      if (this.value < 1) this.value = 1;
      if (this.value > 50) this.value = 50;
    });
  });
});

// Navigation functions
// function goHome() {
//   window.location.href = "index.html";
// }

function goToVegetables() {
  window.location.href = "vegetables.html";
}

const products = [
  { name: "Carrot", image: "assets/fruitsbgg.png" },
  { name: "Potato", image: "assets/fruitsbgg.png" },
  { name: "Spinach", image: "assets/fruitsbgg.png" },
  { name: "Cabbage", image: "assets/fruitsbgg.png" },
];

let carttCount = 0;

function addToCart(name, btn) {
  const qty = btn.parentElement.querySelector(".qty-input").value;
  carttCount += parseInt(qty);
  document.getElementById("cartCount").textContent = carttCount;
  alert(`${qty}kg ${name} added to cart`);
}

function viewCart() {
  alert(`You have ${carttCount} item(s) in your cart.`);
}

function renderProducts() {
  const container = document.getElementById("fruitsGrid");
  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "fruit-card";
    card.innerHTML = `
      <div class="fruit-image">
        <img src="${product.image}" alt="Fresh ${product.name}" />
      </div>
      <h3 class="fruit-name">${product.name}</h3>
      <div class="quantity-section">
        <span class="qty-label">QTY</span>
        <input type="number" class="qty-input" value="1" min="1" max="50" />
        <span class="qty-label">KG</span>
      </div>
      <button class="add-to-cart" onclick="addToCart('${product.name}', this)">
        Add to Cart
      </button>
    `;
    container.appendChild(card);
  });
}

// Wait for the page to fully load
window.onload = renderProducts;

let currentSlide = 0;
let cartItems = [];
let totalQuantity = 0;

// Sample product data with prices
const productPrices = {
  Apple: 3.5,
  Apricot: 4.2,
  Cherry: 5.8,
  Mango: 4.5,
  Carrot: 2.3,
  Broccoli: 3.2,
  Tomato: 2.8,
};

// Load cart data from localStorage
function loadCartData() {
  const savedCart = localStorage.getItem("cart");
  const savedCartCount = localStorage.getItem("cartCount");

  if (savedCart) {
    cartItems = JSON.parse(savedCart);
  }
  if (savedCartCount) {
    totalQuantity = parseInt(savedCartCount);
  }

  if (cartItems.length === 0) {
    // If no cart items, add sample data for demonstration
    cartItems = [
      { name: "Apple", quantity: 2, type: "fruit" },
      { name: "Cherry", quantity: 1, type: "fruit" },
    ];
    totalQuantity = 3;
  }

  displayProducts();
  updateOrderSummary();
}

//display vegtables
const vegetables = [
  { name: "Carrot", image: "assets/fruitsbgg.png" },
  { name: "Potato", image: "assets/fruitsbgg.png" },
  { name: "Spinach", image: "assets/fruitsbgg.png" },
  { name: "Cabbage", image: "assets/fruitsbgg.png" },
  { name: "Cabbage", image: "assets/fruitsbgg.png" },
];

function renderVegetables() {
  const container = document.getElementById("fruitsGrid"); // Same as fruitsGrid div
  vegetables.forEach((veg) => {
    const card = document.createElement("div");
    card.className = "fruit-card"; // You can rename to veg-card if you want
    card.innerHTML = `
      <div class="fruit-image">
        <img src="${veg.image}" alt="Fresh ${veg.name}" />
      </div>
      <h3 class="fruit-name">${veg.name}</h3>
      <div class="quantity-section">
        <span class="qty-label">QTY</span>
        <input type="number" class="qty-input" value="1" min="1" max="50" />
        <span class="qty-label">KG</span>
      </div>
      <button class="add-to-cart" onclick="addToCart('${veg.name}', this)">
        Add to Cart
      </button>
    `;
    container.appendChild(card);
  });
}

window.onload = renderVegetables;

// Display products in carousel
function displayProducts() {
  const carouselTrack = document.getElementById("carouselTrack");
  const indicators = document.getElementById("carouselIndicators");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  // Clear existing content
  carouselTrack.innerHTML = "";
  indicators.innerHTML = "";

  // Create slides for each product
  cartItems.forEach((item, index) => {
    const slide = document.createElement("div");
    slide.className = "carousel-slide";
    slide.innerHTML = `
                    <img src="/placeholder.svg?height=150&width=150" alt="${item.name}" class="product-image">
                `;
    carouselTrack.appendChild(slide);

    // Create indicator dot
    const dot = document.createElement("div");
    dot.className = `carousel-dot ${index === 0 ? "active" : ""}`;
    dot.onclick = () => goToSlide(index);
    indicators.appendChild(dot);
  });

  // Show/hide navigation buttons based on number of products
  if (cartItems.length > 1) {
    prevBtn.style.display = "block";
    nextBtn.style.display = "block";
  } else {
    prevBtn.style.display = "none";
    nextBtn.style.display = "none";
  }

  // Update quantity input with current product quantity
  if (cartItems.length > 0) {
    document.getElementById("quantityInput").value =
      cartItems[currentSlide].quantity;
  }
}

// Carousel navigation functions
function nextSlide() {
  currentSlide = (currentSlide + 1) % cartItems.length;
  updateCarousel();
}

function previousSlide() {
  currentSlide = (currentSlide - 1 + cartItems.length) % cartItems.length;
  updateCarousel();
}

function goToSlide(index) {
  currentSlide = index;
  updateCarousel();
}

function updateCarousel() {
  const carouselTrack = document.getElementById("carouselTrack");
  const indicators = document.querySelectorAll(".carousel-dot");

  carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

  indicators.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });

  // Update quantity input
  if (cartItems[currentSlide]) {
    document.getElementById("quantityInput").value =
      cartItems[currentSlide].quantity;
  }
}

// Update order summary
function updateOrderSummary() {
  const summaryItems = document.getElementById("summaryItems");
  const totalAmount = document.getElementById("totalAmount");

  summaryItems.innerHTML = "";
  let total = 0;

  cartItems.forEach((item) => {
    const price = productPrices[item.name] || 3.0;
    const itemTotal = price * item.quantity;
    total += itemTotal;

    const summaryItem = document.createElement("div");
    summaryItem.className = "summary-item";
    summaryItem.innerHTML = `
                    <span>${item.name} (${item.quantity}kg)</span>
                    <span>$${itemTotal.toFixed(2)}</span>
                `;
    summaryItems.appendChild(summaryItem);
  });

  totalAmount.textContent = `$${total.toFixed(2)}`;
}

// Update quantity for current product
document
  .getElementById("quantityInput")
  .addEventListener("change", function () {
    const newQuantity = parseInt(this.value);
    if (newQuantity >= 1 && newQuantity <= 50 && cartItems[currentSlide]) {
      const oldQuantity = cartItems[currentSlide].quantity;
      cartItems[currentSlide].quantity = newQuantity;

      // Update total quantity
      totalQuantity = totalQuantity - oldQuantity + newQuantity;

      // Update localStorage
      localStorage.setItem("cart", JSON.stringify(cartItems));
      localStorage.setItem("cartCount", totalQuantity.toString());

      updateOrderSummary();
    }
  });

// Confirm order
function confirmOrder() {
  if (cartItems.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  let orderSummary = "Order Confirmed!\n\nYour Order:\n";
  let total = 0;

  cartItems.forEach((item) => {
    const price = productPrices[item.name] || 3.0;
    const itemTotal = price * item.quantity;
    total += itemTotal;
    orderSummary += `${item.name}: ${item.quantity}kg - $${itemTotal.toFixed(
      2
    )}\n`;
  });

  orderSummary += `\nTotal: $${total.toFixed(2)}`;
  orderSummary +=
    "\n\nThank you for your order! We will deliver fresh produce to your doorstep.";

  alert(orderSummary);

  // Clear cart after successful order
  localStorage.removeItem("cart");
  localStorage.removeItem("cartCount");

  // Redirect to home page
  setTimeout(() => {
    window.location.href = "index.html";
  }, 2000);
}

// Go back function
function goBack() {
  window.history.back();
}

// Auto-advance carousel every 5 seconds (if multiple products)
function startAutoCarousel() {
  if (cartItems.length > 1) {
    setInterval(() => {
      nextSlide();
    }, 5000);
  }
}

// Initialize page
document.addEventListener("DOMContentLoaded", function () {
  loadCartData();
  startAutoCarousel();
});
