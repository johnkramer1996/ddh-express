import { PaginatedQueryRequestDto } from '@src/shared/api/paginated-query.request.dto'
import { OrderBy } from '@src/shared/domain/repository.port'
import { IsEnum, IsOptional } from 'class-validator'
import { PostModelAttributes } from '../domain/post.types'
import { Transform } from 'class-transformer'

export enum Order {
  popular = 'popular',
  recent = 'recent',
}

const orderMap: { [key in keyof typeof Order]: keyof PostModelAttributes } = {
  popular: 'points',
  recent: 'createdAt',
}

export class FindAllPaginatedQueryRequestDto extends PaginatedQueryRequestDto {
  @IsOptional()
  @IsEnum(Order)
  @Transform(
    (prop) => {
      const value = orderMap[prop.value as Order]
      return [[value ?? orderMap.popular, 'desc']]
    },
    { since: 2 } // transform only in controller
  )
  order?: OrderBy[]
}
