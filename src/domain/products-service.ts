import { productsRepository } from '../repositories/products-in-db-repository';

import { ProductType } from '../repositories/db';

export const productsService = {
  async findProducts(title: string | undefined | null): Promise<ProductType[]> {
    return productsRepository.findProducts(title);
  },

  async getProductById(id: number): Promise<ProductType | null> {
    return productsRepository.getProductById(id);
  },

  async createProduct(title: string): Promise<ProductType> {
    const newProduct = {
      id: +new Date(),
      title,
    };

    return await productsRepository.createProduct(newProduct);
  },

  async updateProduct(id: number, title: string): Promise<boolean> {
    return await productsRepository.updateProduct(id, title);
  },

  async deleteProduct(id: number): Promise<boolean> {
    return await productsRepository.deleteProduct(id);
  },
};
