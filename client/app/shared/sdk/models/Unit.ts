/* tslint:disable */

declare var Object: any;
export interface UnitInterface {
  "name": string;
  "id"?: any;
}

export class Unit implements UnitInterface {
  "name": string;
  "id": any;
  constructor(data?: UnitInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Unit`.
   */
  public static getModelName() {
    return "Unit";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Unit for dynamic purposes.
  **/
  public static factory(data: UnitInterface): Unit{
    return new Unit(data);
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
      name: 'Unit',
      plural: 'Units',
      path: 'Units',
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
