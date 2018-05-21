/* tslint:disable */
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { Organization } from '../../models/Organization';
import { Email } from '../../models/Email';
import { Donner } from '../../models/Donner';
import { Contact } from '../../models/Contact';
import { DonnerReview } from '../../models/DonnerReview';
import { OrganizationReview } from '../../models/OrganizationReview';
import { DonationRequest } from '../../models/DonationRequest';
import { DonationResponse } from '../../models/DonationResponse';
import { Product } from '../../models/Product';
import { Unit } from '../../models/Unit';
import { City } from '../../models/City';
import { Province } from '../../models/Province';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    User: User,
    Organization: Organization,
    Email: Email,
    Donner: Donner,
    Contact: Contact,
    DonnerReview: DonnerReview,
    OrganizationReview: OrganizationReview,
    DonationRequest: DonationRequest,
    DonationResponse: DonationResponse,
    Product: Product,
    Unit: Unit,
    City: City,
    Province: Province,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
