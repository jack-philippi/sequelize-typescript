import {BaseAssociation} from './BaseAssociation';
import {AssociationOptions} from '../interfaces/AssociationOptions';
import {ModelClassGetter} from '../../model/types/ModelClassGetter';
import {AssociationOptionsHasMany, AssociationOptionsHasOne} from 'sequelize';
import {Association} from '../enums/Association';
import {SequelizeImpl} from '../../sequelize/models/SequelizeImpl';
import {ModelType} from "../../model/types/ModelType";

export class HasAssociation extends BaseAssociation {

  constructor(associatedClassGetter: ModelClassGetter,
              private options: AssociationOptionsHasMany | AssociationOptionsHasOne,
              private association: Association) {
    super(associatedClassGetter);
  }

  getAssociation(): Association {
    return this.association;
  }

  protected getPreparedOptions(model: ModelType<any>,
                               sequelize: SequelizeImpl): AssociationOptions {
    const options = {...this.options};
    const associatedClass = this.getAssociatedClass();

    options.foreignKey = this.getForeignKeyOptions(model, associatedClass, options.foreignKey);

    return options;
  }
}
