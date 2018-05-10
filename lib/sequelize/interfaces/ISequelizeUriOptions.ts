import {IBaseSequelizeOptions} from "./IBaseSequelizeOptions";

export interface ISequelizeUriOptions extends IBaseSequelizeOptions {

  /**
   * Uri connection string to database
   */
  url: string;

  /**
   * Makes it possible to use sequelize for validation only
   * if set to true. For this configuration it is always false.
   * See ISequelizeValidationOnlyConfig interface
   */
  validateOnly?: false;
}
