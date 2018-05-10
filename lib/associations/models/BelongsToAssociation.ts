import {BaseAssociation} from './BaseAssociation';
import {AssociationOptions} from '../interfaces/AssociationOptions';
import {ModelClassGetter} from '../../model/types/ModelClassGetter';
import {AssociationOptionsBelongsTo} from 'sequelize';
import {Association} from '../enums/Association';
import {SequelizeImpl} from '../../sequelize/models/SequelizeImpl';
import {ModelType} from "../../model/types/ModelType";

export class BelongsToAssociation extends BaseAssociation {

  constructor(associatedClassGetter: ModelClassGetter,
              private options: AssociationOptionsBelongsTo) {
    super(associatedClassGetter);
  }

  getAssociation(): Association {
    return Association.BelongsTo;
  }

  protected getPreparedOptions(model: ModelType<any>,
                               sequelize: SequelizeImpl): AssociationOptions {
    const options = {...this.options};
    const associatedClass = this.getAssociatedClass();

    options.foreignKey = this.getForeignKeyOptions(associatedClass, model, options.foreignKey);

    return options;
  }
}
