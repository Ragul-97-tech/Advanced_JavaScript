
const productView = document.getElementById("productView");

function createProductElements(tag, classes="",id = "", text="", source="") {
    const element = document.createElement(tag);
    if (classes) element.className = classes;
    if (id) element.id = id;
    if (source) { 
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

products.forEach((product, index) => {
    const productCard = createProductElements("div", "product-card", `product${index + 1}`);

    appendElements(productCard, product);
    const cartBtn = createProductElements("button", "btn", `btn-${index}`, product.productCart);
    productCard.appendChild(cartBtn);

    cartBtn.addEventListener("click", () => {
        removeOverlay();
        const modelButtons = showPaymentProgress(product);

        modelButtons.payBtn.addEventListener("click", () => {
            orderProduct();
        });

        modelButtons.payBtnViaAwait.addEventListener("click", () => {
            orderProductAwait();
        });
    })

    productView.appendChild(productCard);
});

function appendElements(container, product) {
    container.appendChild(createProductElements("img","product-img", "", "", product.productImg));
    container.appendChild(createProductElements("h3", "product-name", "", product.productname));

    const stars = `<i class="fa-solid fa-star" style="color:gold"></i>`.repeat(product.productRatings) + `<i class="fa-regular fa-star" style="color:gold;"></i>`.repeat(5 - Math.floor(product.productRatings));
    container.appendChild(createProductElements("p", "product-ratings", "", `${product.productRatings} ${stars}`));
    container.appendChild(createProductElements("p", "product-review", "", product.productReview));
    container.appendChild(createProductElements("p", "product-price", "", product.productPrice));

    const priceStrike = product.productDiscount.replace(/₹[\d,]+/, match => `<s>${match}</s>`);
    container.appendChild(createProductElements("p", "product-discount", "", priceStrike));


    container.appendChild(createProductElements("p", "product-delivery", "", product.productDeliveryTime));
    container.appendChild(createProductElements("p", "product-service", "", product.productService));
}

let previewProduct;

function showPaymentProgress(product) {
    const overlay = createProductElements("div", "overlay-payment", "template-overlay");
    previewProduct = createProductElements("div", "product-preview");

    const closeBtn = createProductElements("button", "btn", "close-btn", "x");
    closeBtn.addEventListener("click", removeOverlay);
    previewProduct.appendChild(closeBtn);

    const entireProgress = createProductElements("div", "whole-progress");
    let progressImages = ["shopping_cart.svg", "payments.svg", "receipt.svg", "delivery_truck.svg"];
    for (let i = 0; i < 4; i++) {
        entireProgress.appendChild(createProductElements("img", "progress-img", "", "",progressImages[i]));
        if (i != 3) {
            const progressContainer = createProductElements("div", "progress");
            progressContainer.appendChild(createProductElements("div", "progress-bar", `p${i+1}`));
            entireProgress.appendChild(progressContainer);
        }
    }
    previewProduct.appendChild(entireProgress);

    appendElements(previewProduct, product);

    const payBtn = createProductElements("button", "btn", "pay-btn", "Order(.then)");
    const payBtnViaAwait = createProductElements("button", "btn", "pay-await-btn", "Order(await/asyn)");
    previewProduct.appendChild(payBtn);
    previewProduct.appendChild(payBtnViaAwait);

    overlay.appendChild(previewProduct);

    document.body.appendChild(overlay);

    return {payBtn, payBtnViaAwait};
}

function removeOverlay() {
    const overlay = document.getElementById("template-overlay");
    if (overlay) {
        overlay.remove();
    }
}

function progressBar(barId) {
    const bar = document.getElementById(barId);
    let progress = 0;
    if (!bar) {
        console.error(`Progress bar element with ID "${barId}" not found.`);
        return;
    }
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress > 100) progress = 100;
        bar.style.width = progress + "%";

        if (progress >= 100) {
            clearInterval(interval);
        }
    }, 10);
}


function addToCart() {
    return new Promise((resolve) => {
        setTimeout(() => {
            progressBar("p1");
            resolve("Product Added to cart");
            const text = createProductElements("h3", "result", "", "Product Added to cart");
            previewProduct.appendChild(text);
            text.style.color = "lightGreen";
            text.style.fontWeight = "bold";
        }, 1000);
    })
}

function makePay() {
    return new Promise((resolve) => {
        setTimeout(() => {
            progressBar("p2");
            resolve("Payment is created");
            const text = createProductElements("h3", "result", "", "Payment is created");
            previewProduct.appendChild(text);
            text.style.color = "lightGreen";
            text.style.fontWeight = "bold";
        }, 2000)
    })
}

function invoice() {
    return new Promise((resolve) => {
        setTimeout(() => {
            progressBar("p3");
            resolve("Invoice bill is generated");
            const text = createProductElements("h3", "result", "", "Invoice bill is generated");
            previewProduct.appendChild(text);
            text.style.color = "lightGreen";
            text.style.fontWeight = "bold";
        }, 1000)
    })
}

function shipProduct() {
    return new Promise((resolve) => {
        resolve("Product is shipped");
        const text = createProductElements("h3", "result", "", "Product is shipped");
        previewProduct.appendChild(text);
        text.style.color = "lightGreen";
        text.style.fontWeight = "bold";
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
    }).catch((err) => {
        console.log("Error on making dish: ", err);
    });
}

async function orderProductAwait() {
    console.log("Async and await on cooking dishes")
    console.log(await addToCart());
    console.log(await makePay());
    console.log(await invoice());
    console.log(await shipProduct());
}

// orderProduct();
// orderProductAwait();