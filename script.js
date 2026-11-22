
const foods = [
    {
        id: 1,
        name: "Classic Beef Burger",
        category: "Burgers",
        price: 650,
        emoji: "🍔",
        description: "Juicy beef patty with fresh lettuce and cheese."
    },
    {
        id: 2,
        name: "Zinger Burger",
        category: "Burgers",
        price: 550,
        emoji: "🍔",
        description: "Crispy chicken fillet with creamy sauce."
    },
    {
        id: 3,
        name: "Cheese Pizza",
        category: "Pizza",
        price: 1200,
        emoji: "🍕",
        description: "Loaded with mozzarella cheese and fresh toppings."
    },
    {
        id: 4,
        name: "Pepperoni Pizza",
        category: "Pizza",
        price: 1400,
        emoji: "🍕",
        description: "Classic pizza with pepperoni and rich sauce."
    },
    {
        id: 5,
        name: "French Fries",
        category: "Fast Food",
        price: 250,
        emoji: "🍟",
        description: "Golden crispy fries with a pinch of seasoning."
    },
    {
        id: 6,
        name: "Chicken Nuggets",
        category: "Fast Food",
        price: 400,
        emoji: "🍗",
        description: "Crispy golden nuggets served fresh."
    },
    {
        id: 7,
        name: "Cold Coffee",
        category: "Drinks",
        price: 350,
        emoji: "🥤",
        description: "Chilled coffee with a smooth creamy taste."
    },
    {
        id: 8,
        name: "Fresh Lemonade",
        category: "Drinks",
        price: 200,
        emoji: "🍋",
        description: "Refreshing lemonade made with fresh lemons."
    },
    {
        id: 9,
        name: "Chicken Wrap",
        category: "Fast Food",
        price: 450,
        emoji: "🌯",
        description: "Soft wrap filled with chicken and fresh vegetables."
    }
];

let cart = [];
let selectedCategory = "All";

const foodGrid = document.getElementById("foodGrid");
const searchInput = document.getElementById("searchInput");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");

function displayFoods() {
    const searchText = searchInput.value.toLowerCase();

    const filteredFoods = foods.filter(food => {
        const matchesCategory =
            selectedCategory === "All" ||
            food.category === selectedCategory;

        const matchesSearch =
            food.name.toLowerCase().includes(searchText);

        return matchesCategory && matchesSearch;
    });

    foodGrid.innerHTML = "";

    if (filteredFoods.length === 0) {
        foodGrid.innerHTML = "<p>No food items found. Try another search.</p>";
        return;
    }

    filteredFoods.forEach(food => {
        const card = document.createElement("div");
        card.className = "food-card";

        card.innerHTML = `
            <div class="food-visual">${food.emoji}</div>
            <div class="food-info">
                <h3>${food.name}</h3>
                <p>${food.description}</p>
                <div class="food-bottom">
                    <span class="food-price">Rs. ${food.price}</span>
                    <button class="add-btn" onclick="addToCart(${food.id})">
                        + Add to Cart
                    </button>
                </div>
            </div>
        `;

        foodGrid.appendChild(card);
    });
}

function addToCart(foodId) {
    const food = foods.find(item => item.id === foodId);
    const existingItem = cart.find(item => item.id === foodId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...food,
            quantity: 1
        });
    }

    displayCart();
}

function changeQuantity(foodId, amount) {
    const item = cart.find(food => food.id === foodId);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        cart = cart.filter(food => food.id !== foodId);
    }

    displayCart();
}

function removeFromCart(foodId) {
    cart = cart.filter(food => food.id !== foodId);
    displayCart();
}

function displayCart() {
    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML =
            '<p class="empty-cart">Your cart is empty. Add something delicious!</p>';
    }

    cart.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <div>
                <h4>${item.emoji} ${item.name}</h4>
                <p>Rs. ${item.price} × ${item.quantity}</p>
            </div>

            <div class="quantity-controls">
                <button onclick="changeQuantity(${item.id}, -1)">−</button>
                <span>${item.quantity}</span>
                <button onclick="changeQuantity(${item.id}, 1)">+</button>
                <button class="remove-btn"
                    onclick="removeFromCart(${item.id})">
                    Remove
                </button>
            </div>
        `;

        cartItems.appendChild(cartItem);
    });

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    cartTotal.textContent = `Rs. ${total.toLocaleString("en-PK")}`;
}

document.querySelectorAll(".category-btn").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelector(".category-btn.active")
            ?.classList.remove("active");

        button.classList.add("active");
        selectedCategory = button.dataset.category;

        displayFoods();
    });
});

searchInput.addEventListener("input", displayFoods);

checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty! Please add food items first.");
        return;
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    alert(
        "Thank you for ordering with FoodieGo! ❤️\n\n" +
        "Your order has been placed successfully.\n" +
        "Order Total: Rs. " + total.toLocaleString("en-PK") +
        "\n\nThis is a prototype confirmation."
    );

    cart = [];
    displayCart();
});

displayFoods();
displayCart();
