import { Model } from 'sequelize'

export class BaseModel<T1 extends {}, T2 extends {}> extends Model<T1, T2> {
  declare id: string
  declare createdAt: Date
  declare updatedAt: Date | null
}
