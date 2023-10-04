//constants
const customersProduct = document.getElementById("customersProduct");
const searchInput = document.getElementById("searchInput");
const filterCateogry = document.getElementById("filterCateogry");
const filterPrice = document.getElementById("filterPrice");
const cartContainer = document.getElementById("cartContainer");
const customersCart = document.getElementById("customersCart");
const cartButton = document.getElementById("cartButton");
const cartIndisplay = document.getElementById("cartIndisplay");
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
        <p class="product__name">${product.name}</p>
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
    return product.name
      .toLowerCase()
      .includes(searchEntry.target.value.toLowerCase());
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
    if (cartContainer.style.display == "flex") {
      displayCartProducts(cartProducts);
    }
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
            <div class="flex cart__cartProduct" product-id=${product.id}>
                <img src=${product.image} alt="productImage" class="cartProduct__img">
                <div class="cartProduct__details">
                <p class="details__name">${product.name}</p>
                <p class="details__price">${product.price} $</p>
                <p class="details__cateogry">${product.category}</p>
                <p class="details__detail">${product.detail}</p>
                </div>
                <button class="cartProduct__delete">Delete</button>
            </div>
            `;
  });
  const priceBlock = document.getElementById("price");
  const price = cartTotalPrice(cartProducts);
  cartContainer.style.display = "flex";
  priceBlock.textContent = `Total price is ${price} $`;
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
//cart indisplay
cartIndisplay.addEventListener("click", () => {
  cartContainer.style.display = "none";
});

/////////////
/////////////////intersecton of filtering
function performIntersection(
  cateogries = getProducts(),
  prices = getProducts()
) {
  const intersectionResult = cateogries.filter((cateogryElement) =>
    prices.some((priceElement) => priceElement.id === cateogryElement.id)
  );
  return intersectionResult;
}

/////filter by cateogry
filterCateogry.addEventListener("click", cateogryFiltering);
function cateogryFiltering(cateogry) {
  getProducts();
  customersProduct.innerHTML = "";
  cateogriesDisplayed = products.filter((product) => {
    if (cateogry.target.value === "allCategories") {
      return products;
    } else {
      return (
        product.category.toLowerCase() === cateogry.target.value.toLowerCase()
      );
    }
  });
  displayCustomerProducts(
    performIntersection(cateogriesDisplayed, pricesDisplayed)
  );
}

/////filter by prcice
filterPrice.addEventListener("click", priceFiltering);
function priceFiltering(price) {
  getProducts();
  customersProduct.innerHTML = " ";
  pricesDisplayed = products.filter((product) => {
    if (price.target.value === "allPrices") {
      return products;
    } else {
      if (price.target.value == "low") {
        return product.price >= 1 && product.price <= 2000;
      } else if (price.target.value == "moderate") {
        return product.price > 2000 && product.price <= 10000;
      } else {
        return product.price > 10000;
      }
    }
  });
  displayCustomerProducts(
    performIntersection(cateogriesDisplayed, pricesDisplayed)
  );
}
