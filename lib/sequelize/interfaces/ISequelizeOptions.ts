import {IBaseSequelizeOptions} from "./IBaseSequelizeOptions";

export interface ISequelizeOptions extends IBaseSequelizeOptions {

  /**
   * Name of database
   */
  database: string;

  /**
   * Username of database
   */
  username: string;

  /**
   * Password for database user
   */
  password: string;

  /**
   * Makes it possible to use sequelize for validation only
   * if set to true. For this configuration it is always false.
   * See ISequelizeValidationOnlyConfig interface
   */
  validateOnly?: false;
}
