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
function getProducts() {
  products = JSON.parse(localStorage.getItem("products"));
  return products;
}
getProducts();
///////////////reusable
function displayCustomerProducts(products) {
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

//search
if (searchInput) {
  searchInput.addEventListener("input", searchProduct);
}

// search function
function searchProduct(searchEntry) {
  getProducts();
  customersProduct.innerHTML = " ";
  const productDisplayed = products.filter((product) => {
    return product.name.includes(searchEntry.target.value);
  });

  displayCustomerProducts(productDisplayed);
}

///cart
/////////cart eventlistener function
function cartEventLinstener() {
  getfromLocalStorage();
  const productContainer = document.querySelectorAll(".products__product");
  productContainer.forEach((product) => {
    product.addEventListener("click", (element) => {
      if (element.target.className == "product__cartAdd") {
        addToCart(element.target.parentElement.getAttribute("product-id"));
      }
    });
  });
}
////addtoLocalStorageFunction
function addToLocalStorage() {
  window.localStorage.setItem("cart", JSON.stringify(cartProducts));
}

///getfromLocalStorage
function getfromLocalStorage() {
  if (localStorage.getItem("cart")) {
    cartProducts = JSON.parse(localStorage.getItem("cart"));
  }
  return cartProducts;
}
getfromLocalStorage();

/////add to cart
function addToCart(productId) {
  getfromLocalStorage();
  const product = getProducts().find((product) => product.id == productId);
  if (!cartProducts.some((cartProduct) => cartProduct.id == product.id)) {
    cartProducts.push(product);
    addToLocalStorage();
  } else {
    alert("already in cart!");
  }
}
///////////display what in cart
cartButton.addEventListener("click", () => {
  displayCartProducts(getfromLocalStorage());
});
function displayCartProducts(cartProducts) {
  customersCart.innerHTML = "";
  cartProducts.forEach((product) => {
    customersCart.innerHTML += `
            <div class="flex products__product" product-id=${product.id}>
                <img src=${product.image} alt="productImage" class="product__img">
                <p calss="product__name">${product.name}</p>
                <p class="product__price">${product.price} $</p>
                <p class="product__cateogry">${product.category}</p>
                <p class="product__detail">${product.detail}</p>
                <button class="cartProduct__delete">Delete</button>
            </div>`;
  });
  const price = cartTotalPrice(cartProducts);
  customersCart.innerHTML += `
            <div class="flex">
                <p class="product__price">${price}</p>
            </div>`;
  cartDeleteEventLinstener();
}
///cartButtonEventLinstener
function cartDeleteEventLinstener() {
  const cartDelete = document.querySelectorAll(".cartProduct__delete");
  cartDelete.forEach((button) => {
    button.addEventListener("click", () => {
      cartProductDelete(button.parentElement.getAttribute("product-id"));
      button.parentElement.remove();
    });
  });
}
////cartDeleteproduct
function cartProductDelete(productId) {
  cartProducts = cartProducts.filter((product) => product.id != productId);
  addToLocalStorage();
  displayCartProducts(cartProducts);
}
/////totalPrice
function cartTotalPrice(cartProducts) {
  let price = 0;
  cartProducts.forEach((product) => {
    price = price + Number(product.price);
  });
  return price;
}
