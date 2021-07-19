import sequelizeService from "../../common/services/sequelize.service"
import { Optional, Model, DataTypes } from 'sequelize'
import shortid from "shortid"

const sequelize = sequelizeService.getSequelize();

export interface UserAttributes {
  _id: string,
  email: string,
  password: string,
  firstName?: string,
  lastName?: string,
  permissionsFlags?: number,
}

interface UserCreationAttributes extends Optional<UserAttributes, "_id"> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public _id!: string
  public email!: string
  public password!: string
  public firstName!: string | undefined;
  public lastName!: string | undefined;
  public permissionsFlags!: number | undefined
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

User.init({
  _id: {
    type: DataTypes.STRING(10),
    primaryKey: true,
    defaultValue: () => {
      const shortId = shortid.generate()
      return shortId
    }
  },
  email: {
    type: DataTypes.STRING(120),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  lastName: {
    type: DataTypes.STRING(50),
  },
  permissionsFlags: {
    type: DataTypes.INTEGER,
  }
}, {
  tableName: 'users',
  sequelize
})

User.sync()