import { User } from '../models/User'
import { CreateUserDto } from "../dto/create.user.dto"
import { PutUserDto } from "../dto/put.user.dto"
import { PatchUserDto } from "../dto/patch.user.dto"
import debug from "debug"

const log: debug.IDebugger = debug("app:in-memory-dao")

type PatchUserAttributesType = keyof PutUserDto
class UserDao {
  users: Array<CreateUserDto> = []

  constructor () {
    log('Created new instance of UsersDao')
  }

  async getUsers() {
    return User.findAll()
  }

  async addUser(userFields: CreateUserDto) {
    const newUser = await User.create(userFields);
    return newUser
  }

  async getUserById(userId: string){
    return User.findByPk(userId)
  }

  async putUserById(userId: string, user: PutUserDto) {
    const userToUpdate = await User.findByPk(userId)
    if (userToUpdate) {
      const updatedUser = await userToUpdate.update(user)
      return updatedUser
    } else {
      return null
    }
  }

  async patchUserById(userId: string, user: PatchUserDto) {
    const userToPatch = await User.findByPk(userId)
    if (userToPatch) {
      const attributesAllowedToPatch: PatchUserAttributesType[]  = [
        'firstName',
        'lastName',
      ]

      let updatedAttributes: { [x: string] : any} = {}

      for (let field of attributesAllowedToPatch) {
        if (field in user) {
          updatedAttributes[field] = user[field]
        }
      }

      const patchedUser = await userToPatch.update(updatedAttributes)
      return patchedUser
    } else {
      return null
    }
  }

  async removeUserById(userId: string) {
    const userToRemove = await User.findByPk(userId)
    if (userToRemove) {
      try {
        userToRemove.destroy()
        return `User with user id ${userId} has been deleted`
      } catch (error) {
        return `Error: ${error}`
      }
    }
    return `User with user id ${userId} not found`;
  }

  async getUserByEmail(email: string) {
    const user = User.findOne({
      where: {
        email: email
      }
    })
    if (user) {
        return user;
    } else {
        return null;
    }
  } 

}

export default new UserDao()