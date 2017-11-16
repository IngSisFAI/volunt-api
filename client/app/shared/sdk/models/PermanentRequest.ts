/* tslint:disable */
import {
  Product
} from '../index';

declare var Object: any;
export interface PermanentRequestInterface {
  "Ammount": number;
  "Status": boolean;
  "ClosingDate": Date;
  "CreationDate": Date;
  "id"?: any;
  product?: Product;
}

export class PermanentRequest implements PermanentRequestInterface {
  "Ammount": number;
  "Status": boolean;
  "ClosingDate": Date;
  "CreationDate": Date;
  "id": any;
  product: Product;
  constructor(data?: PermanentRequestInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `PermanentRequest`.
   */
  public static getModelName() {
    return "PermanentRequest";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of PermanentRequest for dynamic purposes.
  **/
  public static factory(data: PermanentRequestInterface): PermanentRequest{
    return new PermanentRequest(data);
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
      name: 'PermanentRequest',
      plural: 'PermanentRequests',
      path: 'PermanentRequests',
      idName: 'id',
      properties: {
        "Ammount": {
          name: 'Ammount',
          type: 'number'
        },
        "Status": {
          name: 'Status',
          type: 'boolean'
        },
        "ClosingDate": {
          name: 'ClosingDate',
          type: 'Date'
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
          keyTo: 'permanentRequestId'
        },
      }
    }
  }
}
