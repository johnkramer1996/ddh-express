import { ModelDefined } from 'sequelize'
import { Mapper } from '../../../domain/mapper.interface'
import { Options, Paginated, QueryParams, RepositoryPort } from '../../../domain/repository.port'
import { injectable } from 'inversify'
import { Literal } from 'sequelize/types/utils'
import { sequelize } from './config/connection'
import { Entity } from '@src/shared/domain/entity'
import { AggregateRoot } from '@src/shared/domain/aggregate-root.base'
import { QueryMapper } from '@src/modules/forum/mappers/comment/mapper-query'

@injectable()
export abstract class SequelizeRepositoryBase<EntityDomain extends Entity<any>, DbModel extends { id: string }> implements RepositoryPort<EntityDomain> {
  constructor(protected readonly mapper: Mapper<EntityDomain, DbModel>, protected readonly model: ModelDefined<any, any>) {}

  public async findAllPaginated(params: QueryParams, options: Options = {}): Promise<Paginated<EntityDomain>> {
    const { rows, count } = await this.model.findAndCountAll({
      where: options.where ? options.where : {},
      limit: params.limit,
      offset: params.offset,
      order: params.order,
      attributes: {
        include: options?.attributeStrategies?.map((i) => i.apply().flat()).map((item) => [sequelize.literal(item[0]), item[1]] as [Literal, string]) || [],
      },
      include: options?.includeStrategies?.map((i) => i.apply()).flat(),
    })

    return new Paginated({ data: rows.map(this.mapper.toDomain.bind(this.mapper)), count, limit: params.limit, page: params.page })
  }

  public async findOne(options: Options = {}): Promise<EntityDomain | null> {
    const row = await this.model.findOne({
      where: options.where ? options.where : {},
      attributes: {
        include: options.attributeStrategies?.map((i) => i.apply().flat()).map((item) => [sequelize.literal(item[0]), item[1]] as [Literal, string]) || [],
      },
      include: options.includeStrategies?.map((i) => i.apply()).flat(),
    })

    return row ? this.mapper.toDomain(row) : row
  }

  public async findOneById(id: string, options: Options = {}): Promise<EntityDomain | null> {
    return this.findOne({ where: { id }, ...options })
  }

  public async delete(entity: EntityDomain, force = false): Promise<void> {
    await this.model.destroy({ where: { id: entity.id }, force })
  }

  public async exists(id: string): Promise<boolean> {
    const found = await this.model.findOne({ where: { id } })

    return Boolean(found)
  }

  public async saveBulk(entiries: EntityDomain[]): Promise<any> {
    for (const entity of entiries) await this.save(entity)
  }

  public async deleteBulk(entiries: EntityDomain[], force = false): Promise<any> {
    for (const entity of entiries) await this.delete(entity, force)
  }

  public async save(entity: EntityDomain): Promise<void> {
    const rawSequelizePost = this.mapper.toPersistence(entity)
    const exists = await this.exists(entity.id)
    const isNewPost = !exists

    isNewPost ? await this.model.create(rawSequelizePost) : await this.model.update(rawSequelizePost, { where: { id: entity.id } })
  }
}

@injectable()
export abstract class SequelizeRepositoryAggregateBase<Aggregate extends AggregateRoot<any>, DbModel extends { id: string }> extends SequelizeRepositoryBase<
  Aggregate,
  DbModel
> {
  public async delete(aggregate: Aggregate, force = false): Promise<void> {
    await super.delete(aggregate, force)

    await aggregate.publishEvents()
  }

  public async save(aggregate: Aggregate): Promise<void> {
    await super.save(aggregate)

    await aggregate.publishEvents()
  }
}

@injectable()
export class SequelizeRepositoryQueryBase<T1, T2, T3> {
  constructor(protected readonly mapper: QueryMapper<T1, T2, T3>, protected readonly model: ModelDefined<any, any>) {}

  public async findAll(options: Options = {}): Promise<T1[]> {
    const rows = await this.model.findAll({
      where: options.where ? options.where : {},
      attributes: {
        include: options?.attributeStrategies?.map((i) => i.apply().flat()).map((item) => [sequelize.literal(item[0]), item[1]] as [Literal, string]) || [],
      },
      include: options?.includeStrategies?.map((i) => i.apply()).flat(),
    })

    return rows.map(this.mapper.toQuery.bind(this.mapper))
  }

  public async findAllPaginated(params: QueryParams, options: Options = {}): Promise<Paginated<T1>> {
    const { rows, count } = await this.model.findAndCountAll({
      where: options.where ? options.where : {},
      limit: params.limit,
      offset: params.offset,
      order: params.order,
      attributes: {
        include: options?.attributeStrategies?.map((i) => i.apply().flat()).map((item) => [sequelize.literal(item[0]), item[1]] as [Literal, string]) || [],
      },
      include: options?.includeStrategies?.map((i) => i.apply()).flat(),
    })

    return new Paginated({ data: rows.map(this.mapper.toQuery.bind(this.mapper)), count, limit: params.limit, page: params.page })
  }

  public async findOne(options: Options = {}): Promise<T1 | null> {
    const row = await this.model.findOne({
      where: options.where ? options.where : {},
      attributes: {
        include: options.attributeStrategies?.map((i) => i.apply().flat()).map((item) => [sequelize.literal(item[0]), item[1]] as [Literal, string]) || [],
      },
      include: options.includeStrategies?.map((i) => i.apply()).flat(),
    })

    return row ? this.mapper.toQuery(row) : row
  }

  public async findOneById(id: string, options: Options = {}): Promise<T1 | null> {
    return this.findOne({ where: { id }, ...options })
  }
}
