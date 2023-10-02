//constants
const customersProduct = document.getElementById("customersProduct");
const searchInput = document.getElementById("searchInput");
const filterCateogry = document.getElementById("filterCateogry");
const filterPrice = document.getElementById("filterPrice");
///vars
let products;
let cart;
let productDisplayed;

///display product
function getProducts() {
  products = JSON.parse(localStorage.getItem("products"));
}
getProducts();
///////////////
function displayCustomerProducts(products) {
  products.forEach((product) => {
    customersProduct.innerHTML += `
            <div class="flex products__product" product-id=${product.id}>
                <img src=${product.image} alt="productImage" class="product__img">
                <p calss="product__name">${product.name}</p>
                <p class="product__price">${product.price} $</p>
                <p class="product__cateogry">${product.category}</p>
                <p class="product__detail">${product.detail}</p>
                <button class="cproduct__cartAdd">Add to cart</button>
            </div>`;
  });
}
displayCustomerProducts(products);

//search
searchInput.addEventListener("input", searchProduct);
// search function
function searchProduct(searchEntry) {
  getProducts();
  customersProduct.innerHTML = " ";
  const productDisplayed = products.filter((product) => {
    return product.name.includes(searchEntry.target.value);
  });

  displayCustomerProducts(productDisplayed);
}

/////filter by cateogry
filterCateogry.addEventListener("change", cateogryFiltering);
function cateogryFiltering(cateogry) {
  getProducts();
  customersProduct.innerHTML = " ";
  productDisplayed = products.filter((product) => {
    return product.category === cateogry.target.value;
  });
  displayCustomerProducts(productDisplayed);
}

/////filter by prcice or cateogry
filterPrice.addEventListener("change",priceFiltering);
function priceFiltering(price) {
  getProducts();
  customersProduct.innerHTML = " ";
  productDisplayed = products.filter((product) => {
    if(price.target.value=="low"){
        return (product.price>200)&&(product.price<2000);
    }
    else if(price.target.value=="moderate"){
        return (product.price>2000)&&(product.price<10000);
    }
    else{
        return (product.price>10000);
    }
  });
  displayCustomerProducts(productDisplayed);
}

/////////////////cart