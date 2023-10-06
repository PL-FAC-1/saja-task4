//constants
const customersProduct = document.getElementById("customersProduct");
const searchInput = document.getElementById("searchInput");
const filterCateogry = document.getElementById("filterCateogry");
const filterPrice = document.getElementById("filterPrice");
const cartContainer = document.getElementById("cartContainer");
const customersCart = document.getElementById("customersCart");
const cartButton = document.getElementById("cartButton");
const cartIndisplay = document.getElementById("cartIndisplay");
const displaySelect = document.getElementById("displaySelect");

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
///////////////
//displaySelect
function display(productsToDisplay) {
  if (displaySelect.value == "grid") {
    customersProduct.className = "flex display__products";
    customersProduct.innerHTML = "";
    displayCustomerProducts(productsToDisplay);
  } else {
    customersProduct.className += " list";
    customersProduct.innerHTML = "";
    displayProductsAsList(productsToDisplay);
  }
}
displaySelect.addEventListener("click", () => {
  const result = performIntersection(
    finalCateogry(filterCateogry),
    finalPrice(filterPrice)
  );
  searchInput.value = "";
  display(result);
});
function displayCustomerProducts(products) {
  products.forEach((product) => {
    customersProduct.innerHTML += `
        <div class="flex products__product" product-id=${product.id}>
        <img src=${product.image} alt="productImage" class="product__img">
        <p class="product__name">${product.name}</p>
        <p class="product__price">${product.price} $</p>
        <p class="product__cateogry">${product.category}</p>
        <p class="product__detail">${product.detail}</p>
        <button class="product__cartAdd addToCart">Add to cart</button>
          </div>`;
  });
  cartEventLinstener(".products__product");
}
displayCustomerProducts(products);

function displayProductsAsList(products) {
  products.forEach((product) => {
    customersProduct.innerHTML += `
    <div class="flex list__listProduct list__listProduct--margin" product-id=${product.id}>
    <img src=${product.image} alt="productImage" class="listProduct__img">
    <div class="listProduct__details">
    <p class="details__name">${product.name}</p>
    <p class="details__price">${product.price} $</p>
    <p class="details__cateogry">${product.category}</p>
    <p class="details__detail">${product.detail}</p>
    </div>
      <button class="listProduct__button addToCart">Add to cart</button>
  
</div>`;
  });
  cartEventLinstener(".list__listProduct");
}

//search
if (searchInput) {
  searchInput.addEventListener("input", searchProduct);
}

// search function
function searchProduct(searchEntry) {
  const productsToSearch = performIntersection(
    finalCateogry(filterCateogry),
    finalPrice(filterPrice)
  );
  customersProduct.innerHTML = " ";
  const productDisplayed = searchResult(searchEntry.target, productsToSearch);
  display(productDisplayed);
}
//search result
function searchResult(searchEntry, productsToSearch) {
  return productsToSearch.filter((product) => {
    return product.name
      .toLowerCase()
      .includes(searchEntry.value?.toLowerCase());
  });
}
///cart
/////////cart eventlistener function
function cartEventLinstener(containerName) {
  getfromLocalStorage();
  const productContainer = document.querySelectorAll(containerName);
  productContainer.forEach((product) => {
    product.addEventListener("click", (element) => {
      if (element.target.className.includes("addToCart")) {
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
            <div class="flex list__listProduct" product-id=${product.id}>
                <img src=${product.image} alt="productImage" class="listProduct__img">
                <div class="listProduct__details">
                <p class="details__name">${product.name}</p>
                <p class="details__price">${product.price}</p>
                <p class="details__cateogry">${product.category}</p>
                <p class="details__detail">${product.detail}</p>
                </div>
                <button class="listProduct__button deleteFromCart">Delete</button>
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
  const cartDelete = document.querySelectorAll(".deleteFromCart");
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
  finalCateogry(cateogry.target);
  display(performIntersection(cateogriesDisplayed, pricesDisplayed));
}
//cateogry value
function finalCateogry(cateogry) {
  cateogriesDisplayed = products.filter((product) => {
    if (cateogry.value === "allCategories") {
      return products;
    } else {
      return product.category.toLowerCase() === cateogry.value.toLowerCase();
    }
  });
  return cateogriesDisplayed;
}

/////filter by prcice
filterPrice.addEventListener("click", priceFiltering);
function priceFiltering(price) {
  getProducts();
  customersProduct.innerHTML = " ";
  pricesDisplayed = finalPrice(price.target);
  display(performIntersection(cateogriesDisplayed, pricesDisplayed));
}
//final price
function finalPrice(price) {
  pricesDisplayed = products.filter((product) => {
    if (price.value === "allPrices") {
      return products;
    } else {
      if (price.value == "low") {
        return product.price >= 1 && product.price <= 2000;
      } else if (price.value == "moderate") {
        return product.price > 2000 && product.price <= 10000;
      } else {
        return product.price > 10000;
      }
    }
  });
  return pricesDisplayed;
}
