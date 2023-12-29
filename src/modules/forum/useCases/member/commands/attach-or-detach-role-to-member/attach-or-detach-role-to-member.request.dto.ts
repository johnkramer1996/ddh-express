import { MemberRole, MemberRoleEnum } from '@src/modules/forum/domain/entity/member/member.types'
import { IsEnum } from 'class-validator'

export class AddRoleToMemberRequestDto {
  @IsEnum(MemberRoleEnum, { message: `role must be one of the following values: ${MemberRoleEnum.join(', ')}` })
  readonly role!: MemberRole
}
