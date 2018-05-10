import {Model} from '../models/Model';
import {ModelType} from "./ModelType";

export type ModelClassGetter<T extends Model<T> = any> = () => ModelType<T>;
