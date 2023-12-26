import { ModelDefined } from 'sequelize'
import { Mapper } from '../../../domain/mapper.interface'
import { Options, RepositoryPort } from '../../../domain/repository.port'
import { injectable } from 'inversify'
import { Entity } from '@src/shared/domain/entity'
import { AggregateRoot } from '@src/shared/domain/aggregate-root.base'
import { getAttributeStrategies, getIncludeStrategies } from './base-query.repository'

@injectable()
export abstract class SequelizeRepositoryBase<EntityDomain extends Entity<any>, DbModel extends { id: string }> implements RepositoryPort<EntityDomain> {
  constructor(protected readonly mapper: Mapper<EntityDomain, DbModel>, protected readonly model: ModelDefined<any, any>) {}

  public async findOne(options: Options = {}): Promise<EntityDomain | null> {
    const row = await this.model.findOne({
      where: options.where ? options.where : {},
      attributes: {
        include: getAttributeStrategies(options.attributeStrategies),
      },
      include: getIncludeStrategies(options.includeStrategies),
    })

    return row ? this.mapper.toDomain(row) : row
  }

  public async findOneById(id: string, options: Options = {}): Promise<EntityDomain | null> {
    return this.findOne({ where: { id }, ...options })
  }

  public async delete(entity: EntityDomain): Promise<void> {
    await this.model.destroy({ where: { id: entity.id } })
  }

  public async exists(id: string): Promise<boolean> {
    const found = await this.model.findOne({ where: { id } })

    return Boolean(found)
  }

  public async saveBulk(entiries: EntityDomain[]): Promise<any> {
    for (const entity of entiries) await this.save(entity)
  }

  public async deleteBulk(entiries: EntityDomain[]): Promise<any> {
    for (const entity of entiries) await this.delete(entity)
  }

  public async save(entity: EntityDomain): Promise<void> {
    const rawSequelizeEntity = this.mapper.toPersistence(entity)
    const exists = await this.exists(entity.id)
    const isNewEntity = !exists

    isNewEntity ? await this.model.create(rawSequelizeEntity) : await this.model.update(rawSequelizeEntity, { where: { id: entity.id } })
  }
}

@injectable()
export abstract class SequelizeRepositoryAggregateBase<Aggregate extends AggregateRoot<any>, DbModel extends { id: string }> extends SequelizeRepositoryBase<
  Aggregate,
  DbModel
> {
  public async delete(aggregate: Aggregate): Promise<void> {
    await super.delete(aggregate)

    await aggregate.publishEvents()
  }

  public async save(aggregate: Aggregate): Promise<void> {
    await super.save(aggregate)

    await aggregate.publishEvents()
  }
}
