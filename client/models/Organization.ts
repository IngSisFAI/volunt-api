/* tslint:disable */
import {
  Contact,
  DonnerReview,
  DonationRequest,
  City
} from '../index';

declare var Object: any;
export interface OrganizationInterface {
  "reputation"?: any;
  "inscriptionCode": string;
  "name": string;
  "urlInscriptionPapers": string;
  "street": string;
  "streetNumber": string;
  "pendingApprobal"?: boolean;
  "webPage"?: string;
  "facebookPage"?: string;
  "logoUrl"?: string;
  "realm"?: string;
  "username"?: string;
  "email": string;
  "emailVerified"?: boolean;
  "id"?: any;
  "cityId"?: any;
  "password"?: string;
  accessTokens?: any[];
  contacts?: Contact[];
  donnerReviews?: DonnerReview[];
  donationRequests?: DonationRequest[];
  city?: City;
}

export class Organization implements OrganizationInterface {
  "reputation": any;
  "inscriptionCode": string;
  "name": string;
  "urlInscriptionPapers": string;
  "street": string;
  "streetNumber": string;
  "pendingApprobal": boolean;
  "webPage": string;
  "facebookPage": string;
  "logoUrl": string;
  "realm": string;
  "username": string;
  "email": string;
  "emailVerified": boolean;
  "id": any;
  "cityId": any;
  "password": string;
  accessTokens: any[];
  contacts: Contact[];
  donnerReviews: DonnerReview[];
  donationRequests: DonationRequest[];
  city: City;
  constructor(data?: OrganizationInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Organization`.
   */
  public static getModelName() {
    return "Organization";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Organization for dynamic purposes.
  **/
  public static factory(data: OrganizationInterface): Organization{
    return new Organization(data);
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
      name: 'Organization',
      plural: 'Organizations',
      path: 'Organizations',
      idName: 'id',
      properties: {
        "reputation": {
          name: 'reputation',
          type: 'any'
        },
        "inscriptionCode": {
          name: 'inscriptionCode',
          type: 'string'
        },
        "name": {
          name: 'name',
          type: 'string'
        },
        "urlInscriptionPapers": {
          name: 'urlInscriptionPapers',
          type: 'string'
        },
        "street": {
          name: 'street',
          type: 'string'
        },
        "streetNumber": {
          name: 'streetNumber',
          type: 'string'
        },
        "pendingApprobal": {
          name: 'pendingApprobal',
          type: 'boolean'
        },
        "webPage": {
          name: 'webPage',
          type: 'string'
        },
        "facebookPage": {
          name: 'facebookPage',
          type: 'string'
        },
        "logoUrl": {
          name: 'logoUrl',
          type: 'string'
        },
        "realm": {
          name: 'realm',
          type: 'string'
        },
        "username": {
          name: 'username',
          type: 'string'
        },
        "email": {
          name: 'email',
          type: 'string'
        },
        "emailVerified": {
          name: 'emailVerified',
          type: 'boolean'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "cityId": {
          name: 'cityId',
          type: 'any'
        },
        "password": {
          name: 'password',
          type: 'string'
        },
      },
      relations: {
        accessTokens: {
          name: 'accessTokens',
          type: 'any[]',
          model: '',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'userId'
        },
        contacts: {
          name: 'contacts',
          type: 'Contact[]',
          model: 'Contact',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'organizationId'
        },
        donnerReviews: {
          name: 'donnerReviews',
          type: 'DonnerReview[]',
          model: 'DonnerReview',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'organizationId'
        },
        donationRequests: {
          name: 'donationRequests',
          type: 'DonationRequest[]',
          model: 'DonationRequest',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'organizationId'
        },
        city: {
          name: 'city',
          type: 'City',
          model: 'City',
          relationType: 'belongsTo',
                  keyFrom: 'cityId',
          keyTo: 'id'
        },
      }
    }
  }
}
