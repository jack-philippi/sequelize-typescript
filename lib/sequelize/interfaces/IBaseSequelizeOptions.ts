import {Options} from "sequelize";
import {ModelType} from "../../model/types/ModelType";

export interface IBaseSequelizeOptions extends Options {

  /**
   * When true enables repository model
   */
  repositoryMode?: boolean;

  /**
   * Path to models, which should be loaded
   */
  models?: string[] | Array<ModelType<any>>;
}
