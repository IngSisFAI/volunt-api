/* tslint:disable */

declare var Object: any;
export interface OrganizationReviewInterface {
  "liked"?: boolean;
  "description"?: string;
  "id"?: any;
  "donnerId"?: any;
  "createdAt": Date;
  "updatedAt": Date;
  "reviewedRequestId"?: any;
  reviewedRequest?: any;
}

export class OrganizationReview implements OrganizationReviewInterface {
  "liked": boolean;
  "description": string;
  "id": any;
  "donnerId": any;
  "createdAt": Date;
  "updatedAt": Date;
  "reviewedRequestId": any;
  reviewedRequest: any;
  constructor(data?: OrganizationReviewInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `OrganizationReview`.
   */
  public static getModelName() {
    return "OrganizationReview";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of OrganizationReview for dynamic purposes.
  **/
  public static factory(data: OrganizationReviewInterface): OrganizationReview{
    return new OrganizationReview(data);
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
      name: 'OrganizationReview',
      plural: 'OrganizationReviews',
      path: 'OrganizationReviews',
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
        "donnerId": {
          name: 'donnerId',
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
        "reviewedRequestId": {
          name: 'reviewedRequestId',
          type: 'any'
        },
      },
      relations: {
        reviewedRequest: {
          name: 'reviewedRequest',
          type: 'any',
          model: '',
          relationType: 'belongsTo',
                  keyFrom: 'reviewedRequestId',
          keyTo: 'id'
        },
      }
    }
  }
}
