const products = [
  { id: 1, title: 'Banana122' },
  { id: 2, title: 'Tomato' },
];

export type ProductType = {
  id: number;
  title: string;
};

export const productsRepository = {
  getAllProducts() {
    return products;
  },

  async findProducts(title: string | undefined | null): Promise<ProductType[]> {
    if (title) {
      return products.filter((p) => p.title.indexOf(title) > -1);
    } else {
      return this.getAllProducts();
    }
  },

  async getProductById(id: number): Promise<ProductType | null> {
    const product = products.find((p) => p.id === id);

    return product || null;
  },

  async createProduct(title: string): Promise<ProductType> {
    const newProduct = {
      id: +new Date(),
      title,
    };

    products.push(newProduct);

    return newProduct;
  },

  async updateProduct(id: number, title: string): Promise<boolean> {
    let product = products.find((p) => p.id === id);

    if (product) {
      product.title = title;
      return true;
    } else {
      return false;
    }
  },

  async deleteProduct(id: number): Promise<boolean> {
    return false;
  },
};
