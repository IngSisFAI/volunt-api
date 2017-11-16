/* tslint:disable */
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { Organization } from '../../models/Organization';
import { Donner } from '../../models/Donner';
import { Contact } from '../../models/Contact';
import { DonnerReview } from '../../models/DonnerReview';
import { OrganizationReview } from '../../models/OrganizationReview';
import { OneTimeRequest } from '../../models/OneTimeRequest';
import { PermanentRequest } from '../../models/PermanentRequest';
import { DonationResponse } from '../../models/DonationResponse';
import { Product } from '../../models/Product';
import { Unit } from '../../models/Unit';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    User: User,
    Organization: Organization,
    Donner: Donner,
    Contact: Contact,
    DonnerReview: DonnerReview,
    OrganizationReview: OrganizationReview,
    OneTimeRequest: OneTimeRequest,
    PermanentRequest: PermanentRequest,
    DonationResponse: DonationResponse,
    Product: Product,
    Unit: Unit,
    
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
