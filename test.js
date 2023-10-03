const {
  getfromLocalStorage,
  formValidation,
  addToLocalStorage,
  addProduct,
  clearProducts,
  deleteProduct,
} = require("./seller/seller");
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
///getTesting
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
//form validation
describe("formValidation", () => {
  test("should return true if all fields are non-empty", () => {
    const result = formValidation(
      { value: "Name" },
      { value: "Details" },
      { value: "100" },
      { value: "image.jpg" }
    );
    expect(result).toBe(true);
  });

  test("should return false if any field is empty", () => {
    const result = formValidation(
      { value: "Name" },
      { value: "" },
      { value: "100" },
      { value: "image.jpg" }
    );
    expect(result).toBe(false);
  });

  test("should return false if all fields are empty", () => {
    const result = formValidation(
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" }
    );
    expect(result).toBe(false);
  });
});

//addProductTesting
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

  test("should aalert when validation not passes", () => {
    addProduct(
      { value: "" },
      { value: "" },
      { value: "lkl" },
      { value: "image.jpg" },
      { value: "sport" }
    );
    const products = getfromLocalStorage();
    expect(products.length).toBe(0);
  });
});
///deleteProductTesting
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