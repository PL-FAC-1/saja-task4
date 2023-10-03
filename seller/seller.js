//constants
const addForm = document.getElementById("addForm");
const productName = document.getElementById("name");
const productDetail = document.getElementById("detail");
const productPrice = document.getElementById("price");
const productImage = document.getElementById("image");
const productCateogry = document.getElementById("category");
const formInputs = document.querySelectorAll("input");
const productsList = document.getElementById("productsList");
const displayButton = document.getElementById("displayProducts");
//variables
let products = [];

//////addForm eventlistener(preventdefault, add the product)
if (addForm) {
  addForm.addEventListener("submit", (event) => {
    event.preventDefault();
    getfromLocalStorage();
    addProduct(
      productName,
      productDetail,
      productPrice,
      productImage,
      productCateogry
    );
  });
}

////addtProductsToLocalStorageFunction
function addToLocalStorage(products) {
  window.localStorage.setItem("products", JSON.stringify(products));
}

// ///getfromLocalStorage
function getfromLocalStorage() {
  if (localStorage.getItem("products")) {
    products = JSON.parse(localStorage.getItem("products"));
  }
  return products;
}
// ////form validation
function formValidation(name, detail, price, image) {
  return (
    name.value.length > 0 &&
    detail.value.length > 0 &&
    price.value.length > 0 &&
    image.value.length > 0
  );
}
// //adding the product to the list , update id,getfromlocalstorage, push to localstorage
function addProduct(
  productName,
  productDetail,
  productPrice,
  productImage,
  productCateogry
) {
  if (formValidation(productName, productDetail, productPrice, productImage)) {
    const name = productName.value;
    const price = productPrice.value;
    const detail = productDetail.value;
    const image = productImage.value;
    const category = productCateogry.value;
    const product = {
      id: Date.now(),
      name,
      price,
      detail,
      image,
      category,
    };
    products.push(product);
    addToLocalStorage(products);
    formInputs.forEach((input) => (input.value = ""));
  } else {
    alert("All Fields Are Required");
  }
}
//display button event listener
if (displayButton) {
  displayButton.addEventListener("click", () => {
    getfromLocalStorage();
    displayProducts(products);
  });
}

//dispaly all products(addEvent)
function displayProducts(products) {
  productsList.innerHTML = "";
  products.forEach((product) => {
    productsList.innerHTML += `
          <div class="flex products__product" product-id=${product.id}>
              <img src=${product.image} alt="productImage" class="product__img">
              <p calss="product__name">${product.name}</p>
              <p class="product__price">${product.price} $</p>
              <p class="product__cateogry">${product.category}</p>
              <p class="product__detail">${product.detail}</p>
              <button class="product__edit">Edit</button>
              <button class="product__delete">Delete</button>
          </div>`;
  });
  productEventLinstener();
}
// delete and edit eventlistener
function productEventLinstener() {
  const productContainers = document.querySelectorAll(".products__product");
  productContainers.forEach((product) => {
    product.addEventListener("click", (element) => {
      if (element.target.className == "product__delete") {
        deleteProduct(element.target.parentElement.getAttribute("product-id"));
        element.target.parentElement.remove();
      }
      if (element.target.className == "product__edit") {
        const productId =
          element.target.parentElement.getAttribute("product-id");
        products.forEach((product) => {
          if (product.id == productId) {
            editProduct(product);
          }
        });
      }
    });
  });
}

///delete function
function deleteProduct(productId) {
  products = products.filter((product) => product.id != productId);
  addToLocalStorage(products);
}
///////////
function clearProducts() {
  //for testing
  products = [];
}

/////exports
// module.exports = {
//   formValidation,
//   getfromLocalStorage,
//   addToLocalStorage,
//   addProduct,
//   clearProducts,
//   deleteProduct,
// };
