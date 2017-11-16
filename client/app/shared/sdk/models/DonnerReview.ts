/* tslint:disable */
import {
  DonationResponse
} from '../index';

declare var Object: any;
export interface DonnerReviewInterface {
  "Calification"?: string;
  "id"?: any;
  "organizationId"?: any;
  reviewedResponse?: DonationResponse;
}

export class DonnerReview implements DonnerReviewInterface {
  "Calification": string;
  "id": any;
  "organizationId": any;
  reviewedResponse: DonationResponse;
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
        "Calification": {
          name: 'Calification',
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
      },
      relations: {
        reviewedResponse: {
          name: 'reviewedResponse',
          type: 'DonationResponse',
          model: 'DonationResponse',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'donnerReviewId'
        },
      }
    }
  }
}
