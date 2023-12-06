import { productsCollection, ProductType } from './db';

export const productsRepository = {
  async findProducts(title: string | undefined | null): Promise<ProductType[]> {
    let filter: any = {};

    if (title) {
      filter.title = { $regex: title };
    }

    return productsCollection.find(filter).toArray();
  },

  async getProductById(id: number): Promise<ProductType | null> {
    const product = await productsCollection.findOne({ id });

    return product || null;
  },

  async createProduct(newProduct: ProductType): Promise<ProductType> {
    const result = await productsCollection.insertOne(newProduct);

    return newProduct;
  },

  async updateProduct(id: number, title: string): Promise<boolean> {
    const result = await productsCollection.updateOne(
      { id },
      { $set: { title } }
    );

    return result.matchedCount === 1;
  },

  async deleteProduct(id: number): Promise<boolean> {
    const result = await productsCollection.deleteOne({ id });

    return result.deletedCount === 1;
  },
};
