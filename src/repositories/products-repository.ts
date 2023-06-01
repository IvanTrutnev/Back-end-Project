const products = [
  { id: 1, title: 'Banana122' },
  { id: 2, title: 'Tomato' },
];

export const productsRepository = {
  getAllProducts() {
    return products;
  },

  findProducts(title: string | undefined | null) {
    if (title) {
      return products.filter((p) => p.title.indexOf(title) > -1);
    } else {
      return this.getAllProducts();
    }
  },

  getProductById(id: number) {
    const product = products.find((p) => p.id === id);

    return product;
  },

  createProduct(title: string) {
    const newProduct = {
      id: +new Date(),
      title,
    };

    products.push(newProduct);

    return newProduct;
  },
};
