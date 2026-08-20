const STORE_KEY = "districtUrbanStore";

const DEFAULT_STORE = {

    whatsapp: "573000000000",

    address: "Ibagué, Tolima",

    hours: "Lunes a sábado · 9:00 AM - 7:00 PM",

    instagram: "",

    facebook: "",

    products: [

        {
            id: 1,
            name: "Gorra District Black",
            category: "gorras",
            price: 60000,
            sizes: "Única",
            image: "gorra1.jpg"
        },

        {
            id: 2,
            name: "Gorra Street Black",
            category: "gorras",
            price: 60000,
            sizes: "Única",
            image: "gorra2.jpg"
        }

    ]

};


/* CARGAR INFORMACIÓN */

function getStore() {

    const saved = localStorage.getItem(STORE_KEY);

    if (!saved) {

        localStorage.setItem(
            STORE_KEY,
            JSON.stringify(DEFAULT_STORE)
        );

        return DEFAULT_STORE;
    }

    return JSON.parse(saved);
}


let store = getStore();

let cart = [];


/* FORMATO DE PRECIO */

function money(value) {

    return "$" + Number(value).toLocaleString("es-CO");

}


/* PRODUCTOS */

function renderProducts(list = store.products) {

    const container =
        document.getElementById("products");

    if (!container) return;

    container.innerHTML = "";


    list.forEach(product => {

        container.innerHTML += `

            <article class="product-card">

                <img
                    class="product-img"
                    src="${product.image}"
                    alt="${product.name}"
                >

                <div class="product-info">

                    <div class="product-category">
                        ${product.category.toUpperCase()}
                    </div>

                    <div class="product-name">
                        ${product.name}
                    </div>

                    <div class="product-price">
                        ${money(product.price)}
                    </div>

                    <div class="product-sizes">
                        Tallas: ${product.sizes || "Consultar"}
                    </div>

                    <button
                        class="add-btn"
                        onclick="addToCart(${product.id})"
                    >
                        AGREGAR AL CARRITO
                    </button>

                </div>

            </article>

        `;

    });

}


/* FILTRO */

function filterProducts(category) {

    if (category === "todos") {

        renderProducts();

        return;
    }

    const filtered =
        store.products.filter(
            product => product.category === category
        );

    renderProducts(filtered);

}


/* CARRITO */

function addToCart(id) {

    const product =
        store.products.find(
            product => product.id === id
        );

    if (!product) return;

    cart.push(product);

    updateCart();

    openCart();

}


function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


function updateCart() {

    const count =
        document.getElementById("cartCount");

    if (count) {

        count.textContent = cart.length;

    }


    const container =
        document.getElementById("cartItems");

    if (!container) return;


    container.innerHTML = "";

    let total = 0;


    cart.forEach((product, index) => {

        total += Number(product.price);

        container.innerHTML += `

            <div class="cart-item">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

                <div class="cart-item-info">

                    <strong>
                        ${product.name}
                    </strong>

                    <p>
                        ${money(product.price)}
                    </p>

                    <span
                        class="remove-item"
                        onclick="removeFromCart(${index})"
                    >
                        ELIMINAR
                    </span>

                </div>

            </div>

        `;

    });


    const totalElement =
        document.getElementById("cartTotal");

    if (totalElement) {

        totalElement.textContent =
            money(total);

    }

}


function openCart() {

    const modal =
        document.getElementById("cartModal");

    if (modal) {

        modal.style.display = "flex";

    }

}


function closeCart() {

    const modal =
        document.getElementById("cartModal");

    if (modal) {

        modal.style.display = "none";

    }

}


/* WHATSAPP */

function checkoutWhatsApp() {

    if (cart.length === 0) {

        alert("Tu carrito está vacío.");

        return;

    }


    let message =
        "🔥 NUEVO PEDIDO - DISTRICT URBAN\n\n";


    let total = 0;


    cart.forEach(product => {

        message +=
            "• " +
            product.name +
            " - " +
            money(product.price) +
            "\n";

        total += Number(product.price);

    });


    message +=
        "\nTOTAL: " +
        money(total);


    message +=
        "\n\nNombre:\nDirección:\nTeléfono:";


    const url =
        "https://wa.me/" +
        store.whatsapp +
        "?text=" +
        encodeURIComponent(message);


    window.open(url, "_blank");

}


/* INFORMACIÓN DE LA TIENDA */

function renderStoreInfo() {

    const address =
        document.getElementById("storeAddress");

    if (address) {

        address.textContent =
            store.address;

    }


    const hours =
        document.getElementById("storeHours");

    if (hours) {

        hours.textContent =
            store.hours;

    }


    const instagram =
        document.getElementById("instagramLink");

    if (instagram && store.instagram) {

        instagram.href =
            store.instagram;

        instagram.target =
            "_blank";

    }


    const facebook =
        document.getElementById("facebookLink");

    if (facebook && store.facebook) {

        facebook.href =
            store.facebook;

        facebook.target =
            "_blank";

    }


    const whatsapp =
        document.getElementById("whatsappStoreLink");

    if (whatsapp) {

        whatsapp.href =
            "https://wa.me/" +
            store.whatsapp;

        whatsapp.target =
            "_blank";

    }

}


/* GUARDAR */

function saveStore() {

    localStorage.setItem(
        STORE_KEY,
        JSON.stringify(store)
    );

}


/* INICIO */

renderProducts();

renderStoreInfo();

updateCart();