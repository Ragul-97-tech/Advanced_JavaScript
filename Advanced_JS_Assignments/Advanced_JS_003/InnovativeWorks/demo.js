const productView = document.getElementById("productView");

// --- Helper Functions ---

function createProductElements(tag, classes="",id = "", text="", source="") {
    const element = document.createElement(tag);
    if (classes) element.className = classes;
    if (id) element.id = id;
    if (source) { 
        // Note: For elements other than <img>, like <div>, element.src will not work, 
        // but for <img> (used for product image and progress icons), this is correct.
        element.src = source;
        element.alt = "product image";
    }
    if (text) element.innerHTML = text;
    return element;
}

function ProductDetails(name, ratings, review, price, discount, delivery, service, image, btnText) {
    this.productname = name;
    this.productRatings = ratings;
    this.productReview = review;
    this.productPrice = price;
    this.productDiscount = discount;
    this.productDeliveryTime = delivery;
    this.productService = service;
    this.productImg = image;
    this.productCart = btnText;
}

function appendElements(container, product) {
    container.appendChild(createProductElements("img","product-img", "", "", product.productImg));
    container.appendChild(createProductElements("h3", "product-name", "", product.productname));

    const stars = `<i class="fa-solid fa-star" style="color:gold"></i>`.repeat(Math.floor(product.productRatings)) + `<i class="fa-regular fa-star" style="color:gold;"></i>`.repeat(5 - Math.floor(product.productRatings));
    container.appendChild(createProductElements("p", "product-ratings", "", `${product.productRatings} ${stars}`));
    container.appendChild(createProductElements("p", "product-review", "", product.productReview));
    container.appendChild(createProductElements("p", "product-price", "", product.productPrice));

    const priceStrike = product.productDiscount.replace(/₹[\d,]+/, match => `<s>${match}</s>`);
    container.appendChild(createProductElements("p", "product-discount", "", priceStrike));


    container.appendChild(createProductElements("p", "product-delivery", "", product.productDeliveryTime));
    container.appendChild(createProductElements("p", "product-service", "", product.productService));
}

// --- Modal Management ---

function removePaymentProgressModal() {
    const existingOverlay = document.querySelector(".overlay-payment");
    if (existingOverlay) {
        existingOverlay.remove();
    }
}

function showPaymentProgress(product) {
    const overlay = createProductElements("div", "overlay-payment");
    const previewProduct = createProductElements("div", "product-preview");

    // Add Close Button
    const closeBtn = createProductElements("button", "close-btn", "", "&times;"); 
    closeBtn.addEventListener("click", removePaymentProgressModal);
    previewProduct.appendChild(closeBtn);

    const entireProgress = createProductElements("div", "whole-progress");
    let progressImages = ["shopping_cart.svg", "payments.svg", "receipt.svg", "delivery_truck.svg"];
    for (let i = 0; i < 4; i++) {
        // Correctly pass the image path as the 5th argument (source)
        entireProgress.appendChild(createProductElements("img", "progress-img", "", "",progressImages[i]));
        if (i != 3) {
            const progressContainer = createProductElements("div", "progress");
            // Correctly create the progress bar div inside the container
            progressContainer.appendChild(createProductElements("div", "progress-bar", `p${i+1}`));
            entireProgress.appendChild(progressContainer);
        }
    }
    previewProduct.appendChild(entireProgress);

    appendElements(previewProduct, product);

    const payBtn = createProductElements("button", "btn", "pay-btn", "Order (Promise.then)");
    const payBtnViaAwait = createProductElements("button", "btn", "pay-await-btn", "Order (Async/Await)");
    previewProduct.appendChild(payBtn);
    previewProduct.appendChild(payBtnViaAwait);

    overlay.appendChild(previewProduct);

    // CRITICAL FIX: Append the overlay to the DOM immediately
    document.body.appendChild(overlay);

    return {payBtn, payBtnViaAwait};
}

function progressBar(barId) {
    const bar = document.getElementById(barId);
    if (!bar) {
        console.error(`Progress bar element with ID "${barId}" not found.`);
        return; // Exit if element is not found
    }
    let progress = 0;
    
    // Set initial width to 0% to ensure visible start
    bar.style.width = "0%";
    
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress > 100) progress = 100;
        
        // FIX: Un-commented and active
        bar.style.width = progress + "%"; 

        if (progress >= 100) {
            clearInterval(interval);
        }
    }, 10);
}


// --- Promise Chain Functions ---

function addToCart() {
    return new Promise((resolve) => {
        setTimeout(() => {
            progressBar("p1");
            resolve("Product Added to cart");
        }, 1000)
    })
}

function makePay() {
    return new Promise((resolve) => {
        setTimeout(() => {
            progressBar("p2");
            resolve("Payment is created");
        }, 2000)
    })
}

function invoice() {
    return new Promise((resolve) => {
        setTimeout(() => {
            progressBar("p3");
            resolve("Invoice bill is generated");
        }, 1000)
    })
}

function shipProduct() {
    return new Promise((resolve) => {
        resolve("Product is shipped");
    })
}

function orderProduct() {
    addToCart().then((result) => {
        console.log(result);
        return makePay();
    }).then((result) => {
        console.log(result);
        return invoice();
    }).then((result) => {
        console.log(result)
        return shipProduct();
    }).then((result) => {
        console.log(result);
        removePaymentProgressModal(); // Cleanup on successful order
    }).catch((err) => {
        console.log("Error on making dish: ", err);
        removePaymentProgressModal(); // Cleanup on error
    });
}

async function orderProductAwait() {
    try {
        console.log("Async and await on cooking dishes")
        console.log(await addToCart());
        console.log(await makePay());
        console.log(await invoice());
        console.log(await shipProduct());
        removePaymentProgressModal(); // Cleanup on successful order
    } catch (err) {
        console.log("Error: ", err);
        removePaymentProgressModal(); // Cleanup on error
    }
}


// --- Product Data ---

const products = [
    new ProductDetails(
        "TCL 80 cms (32 inches) V5C Series Full HD Smart QLED Google TV 32V5C4.",
        (Math.random() * 5).toFixed(1),
        "1K+ bought in past month",
        "₹12,490",
        "M.R.P: ₹22,990 (46% off)",
        "FREE delivery Wed, 24 Sept, 7 am - 9 pm",
        "Service: Setup at delivery",
        "https://m.media-amazon.com/images/I/71NudoyP-GL._SX355_.jpg",
        "Add to Cart"
    ),
    new ProductDetails(
        "Samsung 108 cm (43 inches) Crystal 4K Neo Series Ultra HD Smart LED TV.",
        (Math.random() * 5).toFixed(1),
        "1K+ bought in past month",
        "₹27,990",
        "M.R.P: ₹47,990 (42% off)",
        "FREE delivery Thu, 25 Sept, 11 am - 2 pm",
        "Service: Installation within 24 hours",
        "https://m.media-amazon.com/images/I/71LJJrKbezL._SL1500_.jpg",
        "Add to Cart"
    ),
    new ProductDetails(
        "LG 164 cm (65 inches) 4K Ultra HD Smart OLED TV.",
        (Math.random() * 5).toFixed(1),
        "2K+ bought in past month",
        "₹1,88,384",
        "M.R.P: ₹3,39,990 (45% off)",
        "FREE scheduled delivery on Fri, 26 Sept, 8 am - 10 am",
        "Service: Brand Installation",
        "https://m.media-amazon.com/images/I/51ovn-3QDML._SY300_SX300_QL70_FMwebp_.jpg",
        "Add to Cart"
    ),
    new ProductDetails(
        "Sony Bravia 126 cm (50 inches) 4K Ultra HD Smart LED Google TV.",
        (Math.random() * 5).toFixed(1),
        "800+ bought in past month",
        "₹58,490",
        "M.R.P: ₹72,990 (27% off)",
        "FREE delivery Sat, 27 Sept, 4 pm - 6pm",
        "Service: Brand Installation",
        "https://m.media-amazon.com/images/I/51hzmmwZOqL._SY300_SX300_QL70_FMwebp_.jpg",
        "Add to Cart"
    )
];


// --- Main Rendering Loop ---

products.forEach((product, index) => {
    const productCard = createProductElements("div", "product-card", `product${index + 1}`);

    appendElements(productCard, product);
    const cartBtn = createProductElements("button", "btn", `btn-${index}`, product.productCart);
    productCard.appendChild(cartBtn);

    // CRITICAL FIX: The event listener only creates the modal and attaches the order listeners 
    // to the modal's internal buttons (payBtn and payBtnViaAwait).
    cartBtn.addEventListener("click", () => {
        // Remove any previous modal instance before creating a new one
        removePaymentProgressModal(); 
        
        const modalButtons = showPaymentProgress(product);

        modalButtons.payBtn.addEventListener("click", () => {
            orderProduct();
        });

        modalButtons.payBtnViaAwait.addEventListener("click", () => {
            orderProductAwait();
        });
    });

    productView.appendChild(productCard);
});

// The final orderProductAwait() outside the loop should be removed 
// as it would run instantly when the page loads, before any button is clicked.
// If you want it run on load, uncomment the orderProduct() line above.
// orderProductAwait();