import 'reflect-metadata';
import * as OriginSequelize from 'sequelize';
import {Sequelize} from './Sequelize';
import {Model} from "../../model/models/Model";
import {SequelizeOptions} from "../types/SequelizeOptions";
import {getAttributes, getModelName, getModels, getOptions} from "../../model/models";
import {Table} from "../../model/annotations/Table";
import {installHooks} from '../../hooks/hooks';
import {getAssociations} from '../../associations/association';
import {resolveScopes} from '../../scopes/scopes';
import {hasSequelizeUri, prepareOptions} from '../sequelize';
import {Repository} from "../types/Repository";
import {ModelType} from "../../model/types/ModelType";
import {ModelNotInitializedError} from "../../common/errors/ModelNotInitializedError";

export const _OriginSequelize = OriginSequelize as any as typeof Sequelize;

export class SequelizeImpl extends _OriginSequelize {

  throughMap: { [through: string]: any };
  models: { [modelName: string]: ModelType<any> };

  private repositoryMode: boolean;
  private repositories: Map<ModelType<any>, Repository<any>>;

  constructor(options: SequelizeOptions | string) {
    if (typeof options === "string") {
      super(options, prepareOptions({url: options}));
    } else if (hasSequelizeUri(options)) {
      super(options.url, prepareOptions(options));
    } else {
      super(prepareOptions(options));
    }

    this.throughMap = {};
    this.models = {};

    if (typeof options !== "string") {
      this.init(options);
    } else {
      this.repositoryMode = false;
    }
  }

  init(options: SequelizeOptions): void {
    this.repositoryMode = !!options.repositoryMode;
    if (this.repositoryMode) this.repositories = new Map<ModelType<any>, Repository<any>>();
    if (options.models) this.addModels(options.models);
  }

  getRepository<T extends Model<T>>(modelClass: ModelType<T>): Repository<T> {
    if (!this.repositories.has(modelClass)) {
      throw new ModelNotInitializedError(modelClass, {cause: 'before a repository can be retrieved'});
    }
    return this.repositories.get(modelClass) as Repository<T>;
  }

  addModels(arg: string[] | Array<ModelType<any>>): void {
    const models = this.resolveModels(arg);

    this.defineModels(models);
    this.associateModels(models);
    resolveScopes(models);
    installHooks(models);
    models.forEach(model => this.models[model.name] = model);
  }

  associateModels(models: Array<ModelType<any>>): void {

    models.forEach(model => {
      const associations = getAssociations(model.prototype);

      if (!associations) return;

      associations.forEach(association => {
        association.init(model, this);
        const associatedClass = association.getAssociatedClass();
        const relation = association.getAssociation();
        const options = association.getSequelizeOptions();
        model[relation](this.repositoryMode
          ? this.getRepository(associatedClass)
          : associatedClass,
          options);
      });
    });
  }

  getThroughModel(through: string): ModelType<any> {
    // tslint:disable:max-classes-per-file
    @Table({tableName: through, modelName: through})
    class Through extends Model<Through> {
    }

    return Through;
  }

  defineModels(models: Array<ModelType<any>>): void {

    models.forEach(model => {
      const modelName = getModelName(model.prototype);
      const attributes = getAttributes(model.prototype);
      const options = getOptions(model.prototype);

      if (!options) throw new Error(`@Table annotation is missing on class "${model['name']}"`);

      options['modelName'] = modelName;
      options['sequelize'] = this;

      model['init'](attributes, options);
    });
  }

  private resolveModels(arg: string[] | Array<ModelType<any>>): Array<ModelType<any>> {
    const models = getModels(arg);

    if (this.repositoryMode) {
      return models.map(model => {
        const repositoryModel = this.getRepositoryModel(model);
        this.repositories.set(model, repositoryModel);
        return repositoryModel;
      });
    }
    return models;
  }

  private getRepositoryModel<T extends Model<T>>(modelClass: typeof Model): Repository<T> {
    return class extends modelClass<T> {
    } as Repository<T>;
  }

}
