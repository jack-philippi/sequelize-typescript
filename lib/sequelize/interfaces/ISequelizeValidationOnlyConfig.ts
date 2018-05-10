import {IBaseSequelizeOptions} from "./IBaseSequelizeOptions";

export interface ISequelizeValidationOnlyOptions extends IBaseSequelizeOptions {

  /**
   * Makes it possible to use sequelize for validation only
   * (no db connection is needed)
   */
  validateOnly: true;
}
