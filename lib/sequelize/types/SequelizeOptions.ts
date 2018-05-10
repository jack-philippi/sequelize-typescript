import {ISequelizeOptions} from "../interfaces/ISequelizeOptions";
import {ISequelizeUriOptions} from "../interfaces/ISequelizeUriOptions";
import {ISequelizeValidationOnlyOptions} from '../interfaces/ISequelizeValidationOnlyConfig';

export type SequelizeOptions = ISequelizeOptions |
  ISequelizeUriOptions |
  ISequelizeValidationOnlyOptions;
