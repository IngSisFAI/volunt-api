/* tslint:disable */
import {
  Unit
} from '../index';

declare var Object: any;
export interface ProductInterface {
  "name": string;
  "icon": string;
  "id"?: any;
  "parentProductId"?: any;
  "unitId"?: any;
  parentProduct?: Product;
  unit?: Unit;
}

export class Product implements ProductInterface {
  "name": string;
  "icon": string;
  "id": any;
  "parentProductId": any;
  "unitId": any;
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
        "name": {
          name: 'name',
          type: 'string'
        },
        "icon": {
          name: 'icon',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "parentProductId": {
          name: 'parentProductId',
          type: 'any'
        },
        "unitId": {
          name: 'unitId',
          type: 'any'
        },
      },
      relations: {
        parentProduct: {
          name: 'parentProduct',
          type: 'Product',
          model: 'Product',
          relationType: 'belongsTo',
                  keyFrom: 'parentProductId',
          keyTo: 'id'
        },
        unit: {
          name: 'unit',
          type: 'Unit',
          model: 'Unit',
          relationType: 'belongsTo',
                  keyFrom: 'unitId',
          keyTo: 'id'
        },
      }
    }
  }
}
