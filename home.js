// =====================================================
// FOODIE HUB - COMPLETE HOME.JS
// =====================================================


// =====================================================
// CART DATA
// =====================================================

let cart = [];


// =====================================================
// SELECT ELEMENTS
// =====================================================

const orderList = document.getElementById("orderList");
const totalPrice = document.getElementById("totalPrice");

const addButtons = document.querySelectorAll(".dish1 button");

const searchInput = document.getElementById("searchInput");

const checkoutBtn = document.getElementById("checkoutBtn");


// =====================================================
// ADD PRODUCT TO CART
// =====================================================

addButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const card = button.closest(".dish1");

        const name = card.querySelector("p.font-bold").innerText;

        const priceText = card.querySelector(".bottom p").innerText;

        const price = Number(
            priceText.replace("₹", "").trim()
        );

        const image = card.querySelector("img").src;


        // Check product already exists
        const existingProduct = cart.find(function (item) {

            return item.name === name;

        });


        if (existingProduct) {

            // Quantity increase
            existingProduct.quantity++;

        } else {

            // New product
            cart.push({

                name: name,
                price: price,
                image: image,
                quantity: 1

            });

        }


        displayCart();

    });

});


// =====================================================
// DISPLAY CART
// =====================================================

function displayCart() {

    orderList.innerHTML = "";

    let total = 0;


    // Empty cart
    if (cart.length === 0) {

        orderList.innerHTML = `
            <p class="text-center text-gray-500 text-sm mt-10">
                Your cart is empty
            </p>
        `;

        totalPrice.innerText = "₹0";

        return;
    }


    // Display every product
    cart.forEach(function (item, index) {

        total += item.price * item.quantity;


        const orderItem = document.createElement("div");

        orderItem.className =
            "border-b border-gray-200 pb-2 mb-2";


        orderItem.innerHTML = `

            <div class="flex gap-2 items-center">

                <!-- PRODUCT IMAGE -->
                <img
                    src="${item.image}"
                    class="h-[55px] w-[55px] rounded-lg object-cover shrink-0"
                >


                <!-- PRODUCT DETAILS -->
                <div class="flex-1 min-w-0">

                    <p class="font-semibold text-xs truncate">
                        ${item.name}
                    </p>

                    <p class="text-gray-500 text-xs">
                        ₹${item.price}
                    </p>


                    <!-- QUANTITY -->
                    <div class="flex items-center gap-2 mt-1">

                        <button
                            class="minusBtn bg-gray-200 hover:bg-gray-300
                                   w-5 h-5 rounded text-xs font-bold"
                            data-index="${index}">
                            −
                        </button>


                        <span class="text-xs font-semibold">
                            ${item.quantity}
                        </span>


                        <button
                            class="plusBtn bg-orange-500 hover:bg-orange-600
                                   text-white w-5 h-5 rounded text-xs font-bold"
                            data-index="${index}">
                            +
                        </button>

                    </div>

                </div>


                <!-- REMOVE -->
                <button
                    class="removeBtn text-red-500 text-xs px-1"
                    data-index="${index}">
                    ×
                </button>

            </div>

        `;


        orderList.appendChild(orderItem);

    });


    // =================================================
    // TOTAL
    // =================================================

    totalPrice.innerText = "₹" + total;


    // =================================================
    // PLUS BUTTON
    // =================================================

    document.querySelectorAll(".plusBtn").forEach(function (button) {

        button.addEventListener("click", function () {

            const index = Number(button.dataset.index);

            cart[index].quantity++;

            displayCart();

        });

    });


    // =================================================
    // MINUS BUTTON
    // =================================================

    document.querySelectorAll(".minusBtn").forEach(function (button) {

        button.addEventListener("click", function () {

            const index = Number(button.dataset.index);


            if (cart[index].quantity > 1) {

                cart[index].quantity--;

            } else {

                // Quantity 1 હોય તો product remove
                cart.splice(index, 1);

            }


            displayCart();

        });

    });


    // =================================================
    // REMOVE BUTTON
    // =================================================

    document.querySelectorAll(".removeBtn").forEach(function (button) {

        button.addEventListener("click", function () {

            const index = Number(button.dataset.index);

            cart.splice(index, 1);

            displayCart();

        });

    });

}


// =====================================================
// SEARCH FOOD
// =====================================================

if (searchInput) {

    searchInput.addEventListener("input", function () {

        const searchValue =
            searchInput.value.toLowerCase().trim();


        const allRows =
            document.querySelectorAll(".dishes");


        allRows.forEach(function (row) {

            const dishes =
                row.querySelectorAll(".dish1");


            dishes.forEach(function (dish) {

                const name =
                    dish.querySelector("p.font-bold")
                        .innerText
                        .toLowerCase();


                const description =
                    dish.querySelectorAll("p")[1]
                        .innerText
                        .toLowerCase();


                // Search empty
                if (searchValue === "") {

                    dish.style.display = "";

                    dish.style.marginLeft = "";

                }

                // Search result
                else if (
                    name.includes(searchValue) ||
                    description.includes(searchValue)
                ) {

                    dish.style.display = "";

                    dish.style.marginLeft = "0px";

                }

                // Not found
                else {

                    dish.style.display = "none";

                }

            });


            // =========================================
            // SEARCH ACTIVE
            // =========================================

            if (searchValue !== "") {

                const visibleDishes =
                    row.querySelectorAll(
                        '.dish1:not([style*="display: none"])'
                    );


                // First visible card gets original left space
                if (visibleDishes.length > 0) {

                    visibleDishes[0].style.marginLeft = "145px";

                }

            }

        });

    });

}


// =====================================================
// CHECKOUT
// =====================================================

if (checkoutBtn) {

    checkoutBtn.addEventListener("click", function () {


        // Calculate total
        let total = 0;


        cart.forEach(function (item) {

            total += item.price * item.quantity;

        });


        // Empty cart
        if (cart.length === 0) {

            alert("Please add some food to your order!");

            return;

        }


        // =================================================
        // NAME
        // =================================================

        const name = prompt(
            "Enter your name:"
        );


        if (!name) {

            return;

        }


        // =================================================
        // ADDRESS
        // =================================================

        const address = prompt(
            "Enter your delivery address:"
        );


        if (!address) {

            return;

        }


        // =================================================
        // MOBILE
        // =================================================

        const mobile = prompt(
            "Enter your mobile number:"
        );


        if (!mobile) {

            return;

        }


        // =================================================
        // CONFIRM ORDER
        // =================================================

        const confirmOrder = confirm(

            "Order Summary\n\n" +

            "Name: " + name + "\n" +

            "Address: " + address + "\n" +

            "Mobile: " + mobile + "\n\n" +

            "Total: ₹" + total + "\n\n" +

            "Do you want to place this order?"

        );


        if (!confirmOrder) {

            return;

        }


        // =================================================
        // SUCCESS
        // =================================================

        alert(

            "🎉 Order Placed Successfully!\n\n" +

            "Thank you, " + name + "!\n" +

            "Your food is being prepared.\n\n" +

            "Total: ₹" + total

        );


        // Empty cart after order
        cart = [];

        displayCart();

    });

}


// =====================================================
// INITIAL CART DISPLAY
// =====================================================

displayCart();

// =====================================================
// DARK / LIGHT MODE
// =====================================================

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

// Saved theme check
let savedTheme = localStorage.getItem("theme");

// Page load par dark mode
if (savedTheme === "dark") {
    document.body.classList.add("dark");

    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
}

// Theme button click
if (themeToggle) {
    themeToggle.addEventListener("click", function () {

        document.body.classList.toggle("dark");

        // DARK MODE
        if (document.body.classList.contains("dark")) {

            localStorage.setItem("theme", "dark");

            themeIcon.classList.remove("fa-moon");
            themeIcon.classList.add("fa-sun");

        }

        // LIGHT MODE
        else {

            localStorage.setItem("theme", "light");

            themeIcon.classList.remove("fa-sun");
            themeIcon.classList.add("fa-moon");

        }
    });
}

// =====================================================
// FOOD DETAILS POPUP
// =====================================================

const foodModal = document.getElementById("foodModal");
const closeModal = document.getElementById("closeModal");

const modalImage = document.getElementById("modalImage");
const modalName = document.getElementById("modalName");
const modalPrice = document.getElementById("modalPrice");
const modalDescription = document.getElementById("modalDescription");

const modalAddBtn = document.getElementById("modalAddBtn");


// Food cards
const foodCards = document.querySelectorAll(".dish1");


// Open popup
foodCards.forEach(function (card) {

    card.addEventListener("click", function (event) {

        // ADD+ button par click thay to popup na khule
        if (event.target.closest("button")) {
            return;
        }

        const image = card.querySelector("img");
        const name = card.querySelector("p.font-bold");
        const price = card.querySelector(".bottom p");

        if (!image || !name || !price) {
            return;
        }

        modalImage.src = image.src;

        modalName.innerText = name.innerText;

        modalPrice.innerText = price.innerText;

        modalDescription.innerText =
            "Delicious and freshly prepared food made with quality ingredients. Perfect for enjoying a tasty and satisfying meal.";

        // Store selected food
        modalAddBtn.dataset.name = name.innerText;
        modalAddBtn.dataset.price = price.innerText;
        modalAddBtn.dataset.image = image.src;

        // Show popup
        foodModal.classList.remove("hidden");
        foodModal.classList.add("flex");

    });

});


// Close popup
closeModal.addEventListener("click", function () {

    foodModal.classList.add("hidden");
    foodModal.classList.remove("flex");

});


// Click outside popup = close
foodModal.addEventListener("click", function (event) {

    if (event.target === foodModal) {

        foodModal.classList.add("hidden");
        foodModal.classList.remove("flex");

    }

});


// ESC key = close
document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        foodModal.classList.add("hidden");
        foodModal.classList.remove("flex");

    }

});


// Add to cart from popup
modalAddBtn.addEventListener("click", function () {

    const name = this.dataset.name;
    const priceText = this.dataset.price;
    const image = this.dataset.image;

    const price = parseInt(
        priceText.replace(/[^\d]/g, "")
    );

    const existingItem = cart.find(
        item => item.name === name
    );

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });

    }

    displayCart();

    // Close popup
    foodModal.classList.add("hidden");
    foodModal.classList.remove("flex");

});