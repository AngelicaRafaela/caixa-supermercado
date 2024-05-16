/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { v4 as uuidv4 } from 'uuid';

export interface ProductsTypes {
  id: string;
  productName: string;
  productPrice: number;
  description?: string;
}

const products: ProductsTypes[] = [
  {
    id: uuidv4(),
    productName: 'notebook',
    productPrice: 2000
  }
]

@Injectable()
export class ProductsService {
  create(createProductDto: CreateProductDto) {
    const newProducts: ProductsTypes = {
      id: uuidv4(),
      productName: createProductDto.productName,
      productPrice: createProductDto.productPrice
    }

    products.push(
      newProducts
    );

    return products;
  }

  findAll(): ProductsTypes[] {
    return products;
  }

  findOne(id: string) {
    return products.find(produto => produto.id === id);
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    if (updateProductDto.productName === "") {
      updateProductDto.productName = undefined;
    }
    const findProduct = products.find(product => product.id === id);

    if (updateProductDto.productName !== undefined) { 
      findProduct.productName = updateProductDto.productName;
    }

    if (updateProductDto.productPrice !== 0 || updateProductDto.productPrice === undefined) {
      findProduct.productPrice = updateProductDto.productPrice;
    }
    
    const newProduct = products.find(product => product.id === id);

    return newProduct;
  }

  remove(id: string) {
    const findIndexProducts = products.findIndex(product => product.id === id);
    const spliceProduct = products.splice(findIndexProducts, 1);
    
    if (spliceProduct) {
      return {
        message: `This action removes this product`
      };
    }
    return `This action does not remove any product`;
  }
}
