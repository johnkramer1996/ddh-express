import { ModelDefined, DestroyOptions, Model, BuildOptions, WhereOptions, ModelCtor } from 'sequelize'
import { AggregateRoot } from '../../../domain/aggregate-root.base'
import { Mapper } from '../../../domain/mapper.interface'
import { Paginated, QueryParams, RepositoryPort } from '../../../domain/repository.port'
import { injectable } from 'inversify'

@injectable()
export abstract class SequelizeRepositoryBase<Aggregate extends AggregateRoot<any>, DbModel extends { id: string }> implements RepositoryPort<Aggregate> {
  constructor(protected readonly mapper: Mapper<Aggregate, DbModel>, protected readonly model: ModelDefined<any, any>) {}

  public async findAll(): Promise<Aggregate[]> {
    const rows = await this.model.findAll()

    return rows.map(this.mapper.toDomain.bind(this.mapper))
  }

  public async findAllPaginated(params: QueryParams): Promise<Paginated<Aggregate>> {
    const { rows, count } = await this.model.findAndCountAll({ limit: params.limit, offset: params.offset, order: params.order })

    return new Paginated({ data: rows.map(this.mapper.toDomain.bind(this.mapper)), count, limit: params.limit, page: params.page })
  }

  public async findOneById(id: string): Promise<Aggregate | null> {
    const row = await this.model.findOne({ where: { id } })

    return row ? this.mapper.toDomain(row) : row
  }

  public async delete(entity: Aggregate, force = false): Promise<boolean> {
    await this.model.destroy({ where: { id: entity.id }, force })

    await entity.publishEvents()

    return true
  }

  public async exists(id: string): Promise<boolean> {
    const found = await this.model.findOne({ where: { id } })

    return Boolean(found)
  }

  public async saveBulk(entiries: Aggregate[]): Promise<any> {
    for (const entity of entiries) await this.save(entity)
  }

  public async deleteBulk(entiries: Aggregate[], force = false): Promise<any> {
    for (const entity of entiries) await this.delete(entity, force)
  }

  public async save(entity: Aggregate): Promise<void> {
    const rawSequelizePost = this.mapper.toPersistence(entity)
    const exists = await this.exists(entity.id)
    const isNewPost = !exists

    isNewPost ? await this.model.create(rawSequelizePost) : await this.model.update(rawSequelizePost, { where: { id: entity.id } })
    await entity.publishEvents()
  }
}
