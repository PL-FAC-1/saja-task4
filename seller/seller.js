//constants
const addForm = document.getElementById("addForm");
const productName = document.getElementById("name");
const productDetail = document.getElementById("detail");
const productPrice = document.getElementById("price");
const productImage = document.getElementById("image");
const productCateogry = document.getElementById("category");
const formInputs = document.querySelectorAll("input");
const productsList = document.getElementById("productsList");
const editBlock = document.getElementById("editBlock");
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
////edit function
function editProduct(product) {
    editBlock.innerHTML = "";
    editBlock.innerHTML += `
      <form class="flex editBlock__editForm" id="editForm">
      <label for="nameEdit">Product Name:</label>
      <input
          id="nameEdit"
          type="text"
          class="editForm__name"
          placeholder="Enter Product name:"
          value=${product.name}
      />
      <label for="detailEdit">Product detail:</label>
      <input
          id="detailEdit"
          type="text"
          class="editForm__name"
          placeholder="Enter Product details:"
          value=${product.detail}
      />
      <label for="priceEdit">Product price:</label>
      <input
          id="priceEdit"
          type="number"
          min="1"
          class="editForm__price"
          placeholder="Enter Product Price:"
          value=${product.price}
      />
      <label for="imageEdit">Product Image:</label>
      <input
          id="imageEdit"
          type="url"
          class="editForm__iamge"
          placeholder="Enter Product Image link:"
          value=${product.image}
      />
      <label for="categoryEdit">Product Category:</label>
      <select class="editForm_category" id="categoryEdit">
          <option value="Sport">Sport</option>
          <option value="Clothes">Clothes</option>
          <option value="Electronics">Electronics</option>
          <option value="Grocery">Grocery</option>
      </select>
      <button type="submit" class="editForm__submit">Edit Product</button>
      </form>
  `;
    const categoryEdit = document.getElementById("categoryEdit");
    categoryEdit.value = product.category;
    ///edit constnts
    const editForm = document.getElementById("editForm");
    const nameEdit = document.getElementById("nameEdit");
    const detailEdit = document.getElementById("detailEdit");
    const priceEdit = document.getElementById("priceEdit");
    const imageEdit = document.getElementById("imageEdit");
    //edit eventlistener
    editForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (formValidation(nameEdit, detailEdit, priceEdit, imageEdit)) {
        products.map((productElement) => {
          if (productElement.id == product.id) {
            productElement.name = nameEdit.value;
            productElement.detail = detailEdit.value;
            productElement.price = priceEdit.value;
            productElement.image = imageEdit.value;
            productElement.category = categoryEdit.value;
          }
        });
        editForm.remove();
        addToLocalStorage();
        displayProducts(products);
      } else {
        alert("plaese fill all fields");
      }
    });
  }
///////////for testing
function clearProducts() {
  products = [];
}


/////exports
module.exports = {
  formValidation,
  getfromLocalStorage,
  addToLocalStorage,
  addProduct,
  clearProducts,
  deleteProduct,
};
