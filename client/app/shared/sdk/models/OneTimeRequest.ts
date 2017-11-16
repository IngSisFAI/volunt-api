/* tslint:disable */
import {
  Product
} from '../index';

declare var Object: any;
export interface OneTimeRequestInterface {
  "Ammount": number;
  "ExpirationDate": Date;
  "Covered": number;
  "Promised": number;
  "CreationDate": Date;
  "id"?: any;
  product?: Product;
}

export class OneTimeRequest implements OneTimeRequestInterface {
  "Ammount": number;
  "ExpirationDate": Date;
  "Covered": number;
  "Promised": number;
  "CreationDate": Date;
  "id": any;
  product: Product;
  constructor(data?: OneTimeRequestInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `OneTimeRequest`.
   */
  public static getModelName() {
    return "OneTimeRequest";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of OneTimeRequest for dynamic purposes.
  **/
  public static factory(data: OneTimeRequestInterface): OneTimeRequest{
    return new OneTimeRequest(data);
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
      name: 'OneTimeRequest',
      plural: 'OneTimeRequests',
      path: 'OneTimeRequests',
      idName: 'id',
      properties: {
        "Ammount": {
          name: 'Ammount',
          type: 'number'
        },
        "ExpirationDate": {
          name: 'ExpirationDate',
          type: 'Date'
        },
        "Covered": {
          name: 'Covered',
          type: 'number',
          default: 0
        },
        "Promised": {
          name: 'Promised',
          type: 'number',
          default: 0
        },
        "CreationDate": {
          name: 'CreationDate',
          type: 'Date'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
      },
      relations: {
        product: {
          name: 'product',
          type: 'Product',
          model: 'Product',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'oneTimeRequestId'
        },
      }
    }
  }
}
