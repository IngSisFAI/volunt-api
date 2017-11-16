/* tslint:disable */

declare var Object: any;
export interface DonationResponseInterface {
  "CreationDate": string;
  "Ammount": number;
  "AlreadyDelivered": boolean;
  "id"?: any;
  "donnerId"?: any;
  "donnerReviewId"?: any;
  respondsTo?: any;
}

export class DonationResponse implements DonationResponseInterface {
  "CreationDate": string;
  "Ammount": number;
  "AlreadyDelivered": boolean;
  "id": any;
  "donnerId": any;
  "donnerReviewId": any;
  respondsTo: any;
  constructor(data?: DonationResponseInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `DonationResponse`.
   */
  public static getModelName() {
    return "DonationResponse";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of DonationResponse for dynamic purposes.
  **/
  public static factory(data: DonationResponseInterface): DonationResponse{
    return new DonationResponse(data);
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
      name: 'DonationResponse',
      plural: 'DonationResponses',
      path: 'DonationResponses',
      idName: 'id',
      properties: {
        "CreationDate": {
          name: 'CreationDate',
          type: 'string'
        },
        "Ammount": {
          name: 'Ammount',
          type: 'number'
        },
        "AlreadyDelivered": {
          name: 'AlreadyDelivered',
          type: 'boolean',
          default: false
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "donnerId": {
          name: 'donnerId',
          type: 'any'
        },
        "donnerReviewId": {
          name: 'donnerReviewId',
          type: 'any'
        },
      },
      relations: {
        respondsTo: {
          name: 'respondsTo',
          type: 'any',
          model: '',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'donationResponseId'
        },
      }
    }
  }
}
