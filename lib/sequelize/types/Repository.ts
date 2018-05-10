import {ModelType} from "../../model/types/ModelType";
import {Model} from "../../model";

export type Repository<T extends Model<T>> = ModelType<T>;
