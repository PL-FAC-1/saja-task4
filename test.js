const {
  getfromLocalStorage,
  addToLocalStorage,
  addProduct,
  clearProducts,
  deleteProduct,
  filterProducts,
} = require("./seller/seller");
// const {
//   searchResult
// } = require("./customer/customer");

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

///addTesting
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
// ///getTesting
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
// //addProductTesting
describe("addProduct", () => {
  beforeEach(() => {
    localStorage.clear();
    clearProducts();
  });

  test("should add products when form validation passes", () => {
    addProduct(
      { value: "Name" },
      { value: "Details" },
      { value: "lkl" },
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
// ///filterforsearch testing
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
// describe('searchResult function', () => {
//   const productsToSearch = [
//     { name: 'Product A' },
//     { name: 'Product B' },
//     { name: 'Another Product' },
//   ];

//   test('should filter products by search term (case insensitive)', () => {
//     const searchEntry = { value: 'product' };
//     const result = searchResult(searchEntry, productsToSearch);
//     expect(result).toEqual([
//       { name: 'Product A' },
//       { name: 'Product B' },
//       { name: 'Another Product' },
//     ]);
//   });

//   test('should return an empty array if search term does not match any product', () => {
//     const searchEntry = { value: 'Nonexistent Product' };
//     const result = searchResult(searchEntry, productsToSearch);
//     expect(result).toEqual([]);
//   });
// });