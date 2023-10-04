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
const searchInput = document.getElementById("searchInput");

//variables
let products = [
  {
    id: 0,
    name: "Running Shoes",
    price: 79,
    detail: "High-performance running shoes for athletes.",
    image:
      "https://vader-prod.s3.amazonaws.com/1690535117-race-light-mens-trail-running-shoes-sky-blue-and-black.jpg",
    category: "Sport",
  },
  {
    id: 1,
    name: "Smartphone",
    price: 799,
    detail: "The latest smartphone with advanced features.",
    image: "https://m.media-amazon.com/images/I/51JBovbSnML.jpg",
    category: "Electronics",
  },
  {
    id: 2,
    name: "T-Shirt",
    price: 24,
    detail: "Comfortable cotton t-shirt for everyday wear.",
    image:
      "https://www.thehammondsgroup.com/wp-content/uploads/2022/03/white-long-sleeve.png",
    category: "Clothes",
  },
  {
    id: 3,
    name: "Laptop",
    price: 1299,
    detail: "Powerful laptop for work and entertainment.",
    image: "https://m.media-amazon.com/images/I/51JBovbSnML.jpg",
    category: "Electronics",
  },
  {
    id: 4,
    name: "Football",
    price: 19,
    detail: "High-quality football for sports enthusiasts.",
    image:
      "https://vader-prod.s3.amazonaws.com/1690535117-race-light-mens-trail-running-shoes-sky-blue-and-black.jpg",
    category: "Sport",
  },
  {
    id: 5,
    name: "Headphones",
    price: 129,
    detail: "Over-ear headphones for an immersive audio experience.",
    image: "https://m.media-amazon.com/images/I/51JBovbSnML.jpg",
    category: "Electronics",
  },
  {
    id: 6,
    name: "Jeans",
    price: 39,
    detail: "Stylish and comfortable jeans for a trendy look.",
    image:
      "https://www.thehammondsgroup.com/wp-content/uploads/2022/03/white-long-sleeve.png",
    category: "Clothes",
  },
  {
    id: 7,
    name: "Basketball",
    price: 29,
    detail: "Durable basketball suitable for indoor and outdoor play.",
    image:
      "https://vader-prod.s3.amazonaws.com/1690535117-race-light-mens-trail-running-shoes-sky-blue-and-black.jpg",
    category: "Sport",
  },
  {
    id: 8,
    name: "Gaming Console",
    price: 399,
    detail: "State-of-the-art gaming console for gaming enthusiasts.",
    image: "https://m.media-amazon.com/images/I/51JBovbSnML.jpg",
    category: "Electronics",
  },
  {
    id: 9,
    name: "Dress Shirt",
    price: 34,
    detail: "Formal dress shirt for a sharp and professional look.",
    image:
      "https://www.thehammondsgroup.com/wp-content/uploads/2022/03/white-long-sleeve.png",
    category: "Clothes",
  },
  {
    id: 10,
    name: "Running Shorts",
    price: 19,
    detail: "Comfortable running shorts for active individuals.",
    image:
      "https://vader-prod.s3.amazonaws.com/1690535117-race-light-mens-trail-running-shoes-sky-blue-and-black.jpg",
    category: "Sport",
  },
  {
    id: 11,
    name: "Wireless Earbuds",
    price: 69,
    detail: "Wireless earbuds for a tangle-free music experience.",
    image: "https://m.media-amazon.com/images/I/51JBovbSnML.jpg",
    category: "Electronics",
  },
  {
    id: 12,
    name: "Sweater",
    price: 29,
    detail: "Warm and cozy sweater for chilly days.",
    image:
      "https://www.thehammondsgroup.com/wp-content/uploads/2022/03/white-long-sleeve.png",
    category: "Clothes",
  },
  {
    id: 13,
    name: "Yoga Mat",
    price: 24,
    detail: "High-quality yoga mat for a comfortable yoga practice.",
    image:
      "https://vader-prod.s3.amazonaws.com/1690535117-race-light-mens-trail-running-shoes-sky-blue-and-black.jpg",
    category: "Sport",
  },
  {
    id: 14,
    name: "Digital Camera",
    price: 499,
    detail: "Advanced digital camera for photography enthusiasts.",
    image: "https://m.media-amazon.com/images/I/51JBovbSnML.jpg",
    category: "Electronics",
  },
  {
    id: 15,
    name: "Backpack",
    price: 39,
    detail: "Durable backpack for carrying essentials on the go.",
    image:
      "https://www.thehammondsgroup.com/wp-content/uploads/2022/03/white-long-sleeve.png",
    category: "Clothes",
  },
];
getfromLocalStorage();
addToLocalStorage(products);
displayProducts(products);
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
    displayProducts(products);
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
              <p class="product__name">${product.name}</p>
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
  addForm.style.display = "none";
  editBlock.innerHTML = "";
  editBlock.innerHTML += `
    <form class="flex form" id="editForm">
    <label  class="form__label" for="nameEdit">Product Name:</label>
    <input
        id="nameEdit"
        type="text"
        class="form__input"
        placeholder="Enter Product name:"
        value="${product.name}"
    />
    <label  class="form__label--edit form__label" for="detailEdit">Product detail:</label>
    <input
        id="detailEdit"
        type="text"
        class="form__input"
        placeholder="Enter Product details:"
        value="${product.detail}"
    />
    <label  class="form__label" for="priceEdit">Product price:</label>
    <input
        id="priceEdit"
        type="number"
        min="1"
        class="form__input"
        placeholder="Enter Product Price:"
        value="${product.price}"
    />
    <label  class="form__label" for="imageEdit">Product Image:</label>
    <input
        id="imageEdit"
        type="url"
        class="form__input"
        placeholder="Enter Product Image link:"
        value="${product.image}"
    />
    <label  class="form__label" for="categoryEdit">Product Category:</label>
    <select id="categoryEdit" class="form__input">
        <option value="sport">Sport</option>
        <option value="clothes">Clothes</option>
        <option value="electronics">Electronics</option>
    </select>
    <button type="submit" class="form__submit">Edit Product</button>
    </form>
`;
  const categoryEdit = document.getElementById("categoryEdit");
  categoryEdit.value = product.category.toLowerCase();
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
      addForm.style.display = "flex";
      addToLocalStorage(products);
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

///search products eventlistener
if (searchInput) {
  searchInput.addEventListener("input", searchProduct);
}
//search function
function searchProduct(searchEntry) {
  getfromLocalStorage();
  const productDisplayed = filterProducts(searchEntry);
  displayProducts(productDisplayed);
}
//filterforSearch
function filterProducts(searchEntry) {
  const productDisplayed = products.filter((product) => {
    return product.name
      .toLowerCase()
      .includes(searchEntry.target.value.toLowerCase());
  });
  return productDisplayed;
}
/////exports
// module.exports = {
//   formValidation,
//   getfromLocalStorage,
//   addToLocalStorage,
//   addProduct,
//   clearProducts,
//   deleteProduct,
//   filterProducts
// };
