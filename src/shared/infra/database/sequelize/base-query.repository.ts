import { ModelDefined } from 'sequelize'
import { AttributeStrategyPort, IncludeStrategyPort, Options, Paginated, QueryParams } from '../../../domain/repository.port'
import { injectable } from 'inversify'
import { Literal } from 'sequelize/types/utils'
import { sequelize } from './config/connection'
import { QueryMapper } from '@src/shared/domain/mapper-query.interface'

export const getIncludeStrategies = (includeStrategies?: IncludeStrategyPort[]) => {
  return includeStrategies?.map((i) => i.apply()).flat()
}

export const getAttributeStrategies = (attributeStrategies?: AttributeStrategyPort[]) => {
  return attributeStrategies?.map((i) => i.apply().flat()).map((item) => [sequelize.literal(item[0]), item[1]] as [Literal, string]) ?? []
}

@injectable()
export class SequelizeRepositoryQueryBase<T1, T2, T3> {
  constructor(protected readonly mapper: QueryMapper<T1, T2, T3>, protected readonly model: ModelDefined<any, any>) {}

  public async findAll(options: Options = {}): Promise<T1[]> {
    const rows = await this.model.findAll({
      where: options.where ? options.where : {},
      // order: [['createdAt', 'desc']],
      attributes: {
        include: getAttributeStrategies(options.attributeStrategies),
      },
      include: getIncludeStrategies(options.includeStrategies),
    })

    return rows.map((i) => this.mapper.toQuery(i.toJSON()))
  }

  public async findAllPaginated(params: QueryParams, options: Options = {}): Promise<Paginated<T1>> {
    const { rows, count } = await this.model.findAndCountAll({
      where: options.where ? options.where : {},
      limit: params.limit,
      offset: params.offset,
      order: params.order,
      attributes: {
        include: getAttributeStrategies(options.attributeStrategies),
      },
      include: getIncludeStrategies(options.includeStrategies),
    })

    return new Paginated({ data: rows.map((i) => this.mapper.toQuery(i.toJSON())), count, limit: params.limit, page: params.page })
  }

  public async findOne(options: Options = {}): Promise<T1 | null> {
    const row = await this.model.findOne({
      where: options.where ? options.where : {},
      attributes: {
        include: getAttributeStrategies(options.attributeStrategies),
      },
      include: getIncludeStrategies(options.includeStrategies),
    })

    return row ? this.mapper.toQuery(row.toJSON() as T2) : null
  }

  public async findOneById(id: string, options: Options = {}): Promise<T1 | null> {
    return this.findOne({ where: { id }, ...options })
  }
}
