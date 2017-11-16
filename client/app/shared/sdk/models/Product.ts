/* tslint:disable */
import {
  Unit
} from '../index';

declare var Object: any;
export interface ProductInterface {
  "Name": string;
  "Icon": string;
  "id"?: any;
  "productId"?: any;
  "donationRequestId"?: any;
  "oneTimeRequestId"?: any;
  "permanentRequestId"?: any;
  parentProduct?: Product;
  unit?: Unit;
}

export class Product implements ProductInterface {
  "Name": string;
  "Icon": string;
  "id": any;
  "productId": any;
  "donationRequestId": any;
  "oneTimeRequestId": any;
  "permanentRequestId": any;
  parentProduct: Product;
  unit: Unit;
  constructor(data?: ProductInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Product`.
   */
  public static getModelName() {
    return "Product";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Product for dynamic purposes.
  **/
  public static factory(data: ProductInterface): Product{
    return new Product(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Product',
      plural: 'Products',
      path: 'Products',
      idName: 'id',
      properties: {
        "Name": {
          name: 'Name',
          type: 'string'
        },
        "Icon": {
          name: 'Icon',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "productId": {
          name: 'productId',
          type: 'any'
        },
        "donationRequestId": {
          name: 'donationRequestId',
          type: 'any'
        },
        "oneTimeRequestId": {
          name: 'oneTimeRequestId',
          type: 'any'
        },
        "permanentRequestId": {
          name: 'permanentRequestId',
          type: 'any'
        },
      },
      relations: {
        parentProduct: {
          name: 'parentProduct',
          type: 'Product',
          model: 'Product',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'productId'
        },
        unit: {
          name: 'unit',
          type: 'Unit',
          model: 'Unit',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'productId'
        },
      }
    }
  }
}
