import { ModelDefined } from 'sequelize'
import { AggregateRoot } from '../../../domain/aggregate-root.base'
import { Mapper } from '../../../domain/mapper.interface'
import { Paginated, PaginatedQueryParams, RepositoryPort } from '../../../domain/repository.port'
import { injectable } from 'inversify'
import { getStringFromUnknown } from '../../../utils/get-error'

@injectable()
export abstract class SequelizeRepositoryBase<Aggregate extends AggregateRoot<any>, DbModel extends { id: string }> implements RepositoryPort<Aggregate> {
  constructor(protected readonly mapper: Mapper<Aggregate, DbModel>, protected readonly model: ModelDefined<any, any>) {}

  public async findAll(): Promise<Aggregate[]> {
    const posts = await this.model.findAll()

    return posts.map(this.mapper.toDomain)
  }

  public async findAllPaginated(params: PaginatedQueryParams): Promise<Paginated<Aggregate>> {
    const { rows: items, count } = await this.model.findAndCountAll({ limit: params.limit, offset: params.offset })

    return new Paginated({ data: items.map(this.mapper.toDomain), count, limit: params.limit, page: params.page })
  }

  public async findOneById(id: string): Promise<Aggregate | null> {
    const post = await this.model.findOne({ where: { id } })

    return post ? this.mapper.toDomain(post) : post
  }

  public async delete(entity: Aggregate): Promise<boolean> {
    await this.model.destroy({ where: { id: entity.id } })

    await entity.publishEvents()

    return true
  }

  public async exists(id: string): Promise<boolean> {
    const found = await this.model.findOne({ where: { id } })

    return Boolean(found)
  }

  public async save(entity: Aggregate): Promise<void> {
    const rawSequelizePost = this.mapper.toPersistence(entity) as any
    const exists = await this.exists(entity.id)
    const isNewPost = !exists

    try {
      isNewPost ? await this.model.create(rawSequelizePost) : await this.model.update(rawSequelizePost, { where: { id: entity.id } })
    } catch (err) {
      throw new Error(getStringFromUnknown(err))
    }
  }
}
