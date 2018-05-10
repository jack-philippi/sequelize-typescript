import {Constructor, NonAbstract} from "../../common/utils/types";
import {Model} from "../index";

export type ModelType<T extends Model<T>> = Constructor<T> & NonAbstract<typeof Model>;
