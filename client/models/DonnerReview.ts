/* tslint:disable */

declare var Object: any;
export interface DonnerReviewInterface {
  "liked": boolean;
  "description": string;
  "id"?: any;
  "organizationId"?: any;
  "createdAt": Date;
  "updatedAt": Date;
  "donationResponseId"?: any;
  organization?: any;
  donationResponse?: any;
}

export class DonnerReview implements DonnerReviewInterface {
  "liked": boolean;
  "description": string;
  "id": any;
  "organizationId": any;
  "createdAt": Date;
  "updatedAt": Date;
  "donationResponseId": any;
  organization: any;
  donationResponse: any;
  constructor(data?: DonnerReviewInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `DonnerReview`.
   */
  public static getModelName() {
    return "DonnerReview";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of DonnerReview for dynamic purposes.
  **/
  public static factory(data: DonnerReviewInterface): DonnerReview{
    return new DonnerReview(data);
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
      name: 'DonnerReview',
      plural: 'DonnerReviews',
      path: 'DonnerReviews',
      idName: 'id',
      properties: {
        "liked": {
          name: 'liked',
          type: 'boolean'
        },
        "description": {
          name: 'description',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "organizationId": {
          name: 'organizationId',
          type: 'any'
        },
        "createdAt": {
          name: 'createdAt',
          type: 'Date'
        },
        "updatedAt": {
          name: 'updatedAt',
          type: 'Date'
        },
        "donationResponseId": {
          name: 'donationResponseId',
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
        donationResponse: {
          name: 'donationResponse',
          type: 'any',
          model: '',
          relationType: 'belongsTo',
                  keyFrom: 'donationResponseId',
          keyTo: 'id'
        },
      }
    }
  }
}
