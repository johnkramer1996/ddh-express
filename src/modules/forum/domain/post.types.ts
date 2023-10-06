import { TimeStamp } from '@src/shared/core/time-stamp'
import { PrimaryKey } from '@src/shared/core/primary-key'
import { UserModelAttributes } from '@src/modules/user/domain/user.types'
import { Slug } from './value-objects/slug.value-object'
import { Votes } from './value-objects/votes.value-objcect'
import { UserEntity } from '@src/modules/user/domain/user.entity'

// public class Student
// {
//     public string Name { get; }
//     public string Email { get; }
//     public ICollection<Enrollment> Enrollments { get; } // one-to-many
// }
// But in the domain model, you have to set up both, the student’s Enrollments and the enrollment’s Student.
// no one-to-many
// And therefore, make the relationship unidirectional instead of bidirectional.
// The distinction between being a unidirectional or a bidirectional relationship is called parity.
// try to always make relationships unidirectional when possible
// Try to avoid composite primary keys in the database. Only use them for many-to-many intermediate tables that don’t contain any other data
//
// why post -> user
// If you can manage without it, then remove that collection, and solve the problem this way.
// public class Enrollment
// {
//     public string Grade { get; }
//     public string Course { get; }
//     public Student Student { get; } // many-to-one
// }

export interface PostEntityCreationProps {
  type: PostType
  title: string
  text: string | null
  link: string | null
  slug: Slug
  userId: string
  // comments: Comments
  // dateTimePosted?: string | Date;
}

export interface PostEntityProps extends PostEntityCreationProps {
  points: number
  totalNumComments: number
  votes: Votes
  user?: { [key: string]: any }
  votesUsers: UserEntity[]
}

export interface PostModelCreationAttributes extends PrimaryKey {
  userId: string
  type: string
  title: string
  text: string | null
  link: string | null
  slug: string
  points: number
  totalNumComments: number
}

export interface PostModelAttributes extends PostModelCreationAttributes, TimeStamp {
  user?: UserModelAttributes
}

export enum PostType {
  text = 'text',
  link = 'link',
}
