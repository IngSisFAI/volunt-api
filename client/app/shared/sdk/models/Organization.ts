/* tslint:disable */
import {
  Contact,
  DonnerReview,
  DonationRequest
} from '../index';

declare var Object: any;
export interface OrganizationInterface {
  "reputation": any;
  "inscriptionCode": string;
  "name": string;
  "urlInscriptionPapers": string;
  "address": string;
  "pendingApprobal": boolean;
  "webPage": string;
  "facebookPage": string;
  "realm"?: string;
  "username"?: string;
  "email": string;
  "emailVerified"?: boolean;
  "id"?: any;
  "password"?: string;
  accessTokens?: any[];
  contacts?: Contact[];
  donnerReviews?: DonnerReview[];
  donationRequests?: DonationRequest[];
}

export class Organization implements OrganizationInterface {
  "reputation": any;
  "inscriptionCode": string;
  "name": string;
  "urlInscriptionPapers": string;
  "address": string;
  "pendingApprobal": boolean;
  "webPage": string;
  "facebookPage": string;
  "realm": string;
  "username": string;
  "email": string;
  "emailVerified": boolean;
  "id": any;
  "password": string;
  accessTokens: any[];
  contacts: Contact[];
  donnerReviews: DonnerReview[];
  donationRequests: DonationRequest[];
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
        "address": {
          name: 'address',
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
      }
    }
  }
}
