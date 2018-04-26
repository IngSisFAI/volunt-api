/* tslint:disable */

declare var Object: any;
export interface DonationResponseInterface {
  "creationDate": Date;
  "amount": number;
  "alreadyDelivered": boolean;
  "isCanceled": boolean;
  "id"?: any;
  "donationRequestId"?: any;
  "donnerId"?: any;
  "donnerReviewId"?: any;
  donationRequest?: any;
  donner?: any;
  donnerReview?: any;
}

export class DonationResponse implements DonationResponseInterface {
  "creationDate": Date;
  "amount": number;
  "alreadyDelivered": boolean;
  "isCanceled": boolean;
  "id": any;
  "donationRequestId": any;
  "donnerId": any;
  "donnerReviewId": any;
  donationRequest: any;
  donner: any;
  donnerReview: any;
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
        "creationDate": {
          name: 'creationDate',
          type: 'Date'
        },
        "amount": {
          name: 'amount',
          type: 'number'
        },
        "alreadyDelivered": {
          name: 'alreadyDelivered',
          type: 'boolean',
          default: false
        },
        "isCanceled": {
          name: 'isCanceled',
          type: 'boolean',
          default: false
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "donationRequestId": {
          name: 'donationRequestId',
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
        donationRequest: {
          name: 'donationRequest',
          type: 'any',
          model: '',
          relationType: 'belongsTo',
                  keyFrom: 'donationRequestId',
          keyTo: 'id'
        },
        donner: {
          name: 'donner',
          type: 'any',
          model: '',
          relationType: 'belongsTo',
                  keyFrom: 'donnerId',
          keyTo: 'id'
        },
        donnerReview: {
          name: 'donnerReview',
          type: 'any',
          model: '',
          relationType: 'belongsTo',
                  keyFrom: 'donnerReviewId',
          keyTo: 'id'
        },
      }
    }
  }
}
