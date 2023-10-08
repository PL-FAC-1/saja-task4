import { getfromLocalStorage, addToLocalStorage, addProduct, clearProducts, deleteProduct, filterProducts, editExecute } from './seller/seller.js';
// mock storage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => (store[key] ? store[key] : null),
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();
// Assign the mock to the global object
global.localStorage = localStorageMock;

////getTesting
describe("getFromLocalStorage", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });
  test("retrieve products from localStorage", () => {
    const mockProducts = [
      {
        id: 0,
        name: "car",
        price: 1000,
        detail: "white car",
        image:
          "https://res.cloudinary.com/carsxe/image/upload/f_auto,fl_lossy,q_auto/v1569282984/carsxe-api/purple_porsche.png",
        category: "electronics",
      },
    ];
    addToLocalStorage([
      {
        id: 0,
        name: "car",
        price: 1000,
        detail: "white car",
        image:
          "https://res.cloudinary.com/carsxe/image/upload/f_auto,fl_lossy,q_auto/v1569282984/carsxe-api/purple_porsche.png",
        category: "electronics",
      },
    ]);
    const products = getfromLocalStorage();
    expect(products).toEqual(mockProducts);
  });
});
///addTolocalSTesting
describe("addToLocalStorage", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });
  test("products are added into local storage", () => {
    const mockProduct = {
      id: 0,
      name: "car",
      price: 1000,
      detail: "white car",
      image:
        "https://res.cloudinary.com/carsxe/image/upload/f_auto,fl_lossy,q_auto/v1569282984/carsxe-api/purple_porsche.png",
      category: "electronics",
    };
    addToLocalStorage([mockProduct]);
    expect(localStorage.getItem("products")).toEqual(
      JSON.stringify([mockProduct])
    );
  });
});
////addProductTesting
describe("addProduct", () => {
  beforeEach(() => {
    localStorage.clear();
    clearProducts();
  });

  test("should add products when form validation passes", () => {
    addProduct(
      { value: "Name" },
      { value: "Details" },
      { value: "454" },
      { value: "image.jpg" },
      { value: "sport" }
    );
    const products = getfromLocalStorage();
    expect(products.length).toBe(1);
  });


});
// ///deleteProductTesting
describe("deleteProduct", () => {
  afterEach(() => {
    // Clear localStorage afer test
    localStorage.clear();
  });
  test("should delete product", () => {
    const mockProduct = {
      id: 0,
      name: "car",
      price: 1000,
      detail: "white car",
      image:
        "https://res.cloudinary.com/carsxe/image/upload/f_auto,fl_lossy,q_auto/v1569282984/carsxe-api/purple_porsche.png",
      category: "electronics",
    };
    addToLocalStorage([mockProduct]);
    let products = getfromLocalStorage();
    const length = products.length;
    deleteProduct(products[0].id);
    products = getfromLocalStorage();
    expect(products.length).toBe(length - 1);
  });
});
/////filterforsearch testing
describe("filterProducts", () => {
  afterEach(() => {
    // Clear localStorage afer test
    localStorage.clear();
  });
  test("should delete product", () => {
    const mockProducts = [
      {
        id: 0,
        name: "car",
        price: 1000,
        detail: "white car",
        image:
          "https://res.cloudinary.com/carsxe/image/upload/f_auto,fl_lossy,q_auto/v1569282984/carsxe-api/purple_porsche.png",
        category: "electronics",
      },
      {
        id: 1,
        name: "longcar",
        price: 1000,
        detail: "white car",
        image:
          "https://res.cloudinary.com/carsxe/image/upload/f_auto,fl_lossy,q_auto/v1569282984/carsxe-api/purple_porsche.png",
        category: "electronics",
      },
      {
        id: 2,
        name: "chair",
        price: 1000,
        detail: "white chair",
        image:
          "https://res.cloudinary.com/carsxe/image/upload/f_auto,fl_lossy,q_auto/v1569282984/carsxe-api/purple_porsche.png",
        category: "electronics",
      },
    ];
    addToLocalStorage(mockProducts);
    const productsAfter = filterProducts("car");
    const result = productsAfter.every((element) =>
      element.name.includes("car")
    );
    expect(result).toBe(true);
  });
});
//editProduct
describe('editExecute', () => {
  let products;
  beforeEach(() => {
    localStorage.clear();
    products = [
      {
        id: 0,
        name: "Running Shoes",
        price: 10079,
        detail: "High-performance running shoes for athletes.",
        image:
          "https://vader-prod.s3.amazonaws.com/1690535117-race-light-mens-trail-running-shoes-sky-blue-and-black.jpg",
        category: "Sport",
      },
      {
        id: 1,
        name: "Smartphone",
        price: 2799,
        detail: "The latest smartphone with advanced features.",
        image: "https://m.media-amazon.com/images/I/51JBovbSnML.jpg",
        category: "Electronics",
      },
    ];
  });
  test('should edit product details', () => {
    const productToEdit = products[0];
    const newName = 'New Name';
    const newDetail = 'New Details';
    const newPrice = 150;
    const newImage = 'newImage.jpg';
    const newCategory = 'New Category';
    editExecute(products,productToEdit, newName, newDetail, newPrice, newImage, newCategory);
    expect(products[0].name).toBe(newName);
    expect(products[0].detail).toBe(newDetail);
    expect(products[0].price).toBe(newPrice);
    expect(products[0].image).toBe(newImage);
    expect(products[0].category).toBe(newCategory);
  });
});


