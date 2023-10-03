//constants
const customersProduct = document.getElementById("customersProduct");
const searchInput = document.getElementById("searchInput");
const filterCateogry = document.getElementById("filterCateogry");
const filterPrice = document.getElementById("filterPrice");
const customersCart = document.getElementById("customersCart");
const cartButton = document.getElementById("cartButton");
///vars
let products = [];
let cartProducts = [];
let productDisplayed;
let cateogriesDisplayed;
let pricesDisplayed;

///display product
function displayCustomerProducts() {
    products = JSON.parse(localStorage.getItem("products"));
    products.forEach((product) => {
      customersProduct.innerHTML += `
              <div class="flex products__product" product-id=${product.id}>
                  <img src=${product.image} alt="productImage" class="product__img">
                  <p calss="product__name">${product.name}</p>
                  <p class="product__price">${product.price} $</p>
                  <p class="product__cateogry">${product.category}</p>
                  <p class="product__detail">${product.detail}</p>
                  <button class="product__cartAdd">Add to cart</button>
              </div>`;
    });
    cartEventLinstener();
  }
displayCustomerProducts(products);
  