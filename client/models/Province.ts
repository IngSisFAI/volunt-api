/* tslint:disable */

declare var Object: any;
export interface ProvinceInterface {
  "name": string;
  "id"?: any;
}

export class Province implements ProvinceInterface {
  "name": string;
  "id": any;
  constructor(data?: ProvinceInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Province`.
   */
  public static getModelName() {
    return "Province";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Province for dynamic purposes.
  **/
  public static factory(data: ProvinceInterface): Province{
    return new Province(data);
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
      name: 'Province',
      plural: 'Provinces',
      path: 'Provinces',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
      },
      relations: {
      }
    }
  }
}
