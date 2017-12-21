/* tslint:disable */

declare var Object: any;
export interface DonationRequestInterface {
  "creationDate": Date;
  "amount"?: number;
  "expirationDate": Date;
  "isPermanent": boolean;
  "covered"?: number;
  "promised"?: number;
  "status"?: boolean;
  "id"?: any;
  "organizationId"?: any;
  "productId"?: any;
  organization?: any;
  product?: any;
}

export class DonationRequest implements DonationRequestInterface {
  "creationDate": Date;
  "amount": number;
  "expirationDate": Date;
  "isPermanent": boolean;
  "covered": number;
  "promised": number;
  "status": boolean;
  "id": any;
  "organizationId": any;
  "productId": any;
  organization: any;
  product: any;
  constructor(data?: DonationRequestInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `DonationRequest`.
   */
  public static getModelName() {
    return "DonationRequest";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of DonationRequest for dynamic purposes.
  **/
  public static factory(data: DonationRequestInterface): DonationRequest{
    return new DonationRequest(data);
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
      name: 'DonationRequest',
      plural: 'DonationRequests',
      path: 'DonationRequests',
      idName: 'id',
      properties: {
        "creationDate": {
          name: 'creationDate',
          type: 'Date'
        },
        "amount": {
          name: 'amount',
          type: 'number'
        },
        "expirationDate": {
          name: 'expirationDate',
          type: 'Date'
        },
        "isPermanent": {
          name: 'isPermanent',
          type: 'boolean'
        },
        "covered": {
          name: 'covered',
          type: 'number',
          default: 0
        },
        "promised": {
          name: 'promised',
          type: 'number',
          default: 0
        },
        "status": {
          name: 'status',
          type: 'boolean'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "organizationId": {
          name: 'organizationId',
          type: 'any'
        },
        "productId": {
          name: 'productId',
          type: 'any'
        },
      },
      relations: {
        organization: {
          name: 'organization',
          type: 'any',
          model: '',
          relationType: 'belongsTo',
                  keyFrom: 'organizationId',
          keyTo: 'id'
        },
        product: {
          name: 'product',
          type: 'any',
          model: '',
          relationType: 'belongsTo',
                  keyFrom: 'productId',
          keyTo: 'id'
        },
      }
    }
  }
}
