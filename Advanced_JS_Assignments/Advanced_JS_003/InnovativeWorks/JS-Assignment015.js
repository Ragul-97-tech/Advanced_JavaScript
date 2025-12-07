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

    productCard.appendChild(createProductElements("img","product-img", "", "", product.productImg));
    productCard.appendChild(createProductElements("h3", "product-name", "", product.productname));

    const stars = `<i class="fa-solid fa-star" style="color:gold"></i>`.repeat(product.productRatings) + `<i class="fa-regular fa-star" style="color:gold;"></i>`.repeat(5 - Math.floor(product.productRatings));
    productCard.appendChild(createProductElements("p", "product-ratings", "", `${product.productRatings} ${stars}`));
    productCard.appendChild(createProductElements("p", "product-review", "", product.productReview));
    productCard.appendChild(createProductElements("p", "product-price", "", product.productPrice));

    const priceStrike = product.productDiscount.replace(/₹[\d,]+/, match => `<s>${match}</s>`);
    productCard.appendChild(createProductElements("p", "product-discount", "", priceStrike));


    productCard.appendChild(createProductElements("p", "product-delivery", "", product.productDeliveryTime));
    productCard.appendChild(createProductElements("p", "product-service", "", product.productService));
    productCard.appendChild(createProductElements("button", "btn", "", product.productCart));

    productView.appendChild(productCard);
});
