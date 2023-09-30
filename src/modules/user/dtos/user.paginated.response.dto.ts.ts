import { ResponseBase } from '@src/shared/api/response.base'
import { PaginatedResponseDto } from '../../../shared/api/paginated.response.base'
import { Paginated } from '@src/shared/domain/repository.port'
import { UserEntity } from '../domain/user.entity'
import { UserResponseDto } from './user.response.dto'

export class UserPaginatedResponseDto extends PaginatedResponseDto<UserResponseDto> {
  declare data: readonly UserResponseDto[]

  constructor(props: Paginated<UserEntity>) {
    const data: UserResponseDto[] = props.data.map((user) => ({
      ...new ResponseBase(user),
      email: user.email,
      country: user.country,
      street: user.street,
    }))
    super({ ...props, data })
  }
}
