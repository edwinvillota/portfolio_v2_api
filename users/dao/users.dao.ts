import sequelizeService from "../../common/services/sequelize.service"
import { Optional, Model, DataTypes } from 'sequelize'
import { CreateUserDto } from "../dto/create.user.dto"
import { PutUserDto } from "../dto/put.user.dto"
import { PatchUserDto } from "../dto/patch.user.dto"
import shortid from "shortid"
import debug from "debug"

const log: debug.IDebugger = debug("app:in-memory-dao")

const sequelize = sequelizeService.getSequelize();

interface UserAttributes {
  _id: string,
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  permissionsFlags: string,
}

interface UserCreationAttributes extends Optional<UserAttributes, "_id"> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public _id!: string
  public email!: string
  public password!: string
  public firstName!: string
  public lastName!: string
  public permissionsFlags!: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
  
}

User.init({
  _id: {
    type: DataTypes.STRING(10),
    primaryKey: true
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
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING(50),
  },
  permissionsFlags: {
    type: DataTypes.STRING(100),
  }
}, {
  tableName: 'users',
  sequelize
})

User.sync()

class UserDao {
  users: Array<CreateUserDto> = []

  constructor () {
    log('Created new instance of UsersDao')
  }

  async getUsers() {
    return this.users
  }

  async addUser(user: CreateUserDto) {
    const newUser = await User.create({
      _id: shortid.generate(),
      email: 'edwinvillota@hotmail.com',
      firstName: 'edwin',
      lastName: 'villota',
      password: 'Edwin4312',
      permissionsFlags: 'none'
    })
    return newUser._id 
  }

  async getUserById(userId: string){
    return this.users.find((user: { id: string }) => user.id === userId)
  }

  async putUserById(userId: string, user: PutUserDto) {
    const objIndex = this.users.findIndex(
      (obj: { id: string}) => obj.id === userId
    )
    this.users.splice(objIndex, 1, user)

    return `${user.id} updated via put`
  }

  async patchUserById(userId: string, user: PatchUserDto) {
    const objIndex = this.users.findIndex(
      (obj: { id: string }) => obj.id === userId
    );
    let currentUser = this.users[objIndex];
    const allowedPatchFields = [
        'password',
        'firstName',
        'lastName',
        'permissionLevel',
    ];
    for (let field of allowedPatchFields) {
        if (field in user) {
            // @ts-ignore
            currentUser[field] = user[field];
        }
    }
    this.users.splice(objIndex, 1, currentUser);
    return `${user.id} patched`;

  }

  async removeUserById(userId: string) {
    const objIndex = this.users.findIndex(
        (obj: { id: string }) => obj.id === userId
    );
    this.users.splice(objIndex, 1);
    return `${userId} removed`;
  }

  async getUserByEmail(email: string) {
    const objIndex = this.users.findIndex(
        (obj: { email: string }) => obj.email === email
    );
    let currentUser = this.users[objIndex];
    if (currentUser) {
        return currentUser;
    } else {
        return null;
    }
  } 

}

export default new UserDao()