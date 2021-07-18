"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../models/User");
const debug_1 = __importDefault(require("debug"));
const log = debug_1.default("app:in-memory-dao");
class UserDao {
    constructor() {
        this.users = [];
        log('Created new instance of UsersDao');
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return User_1.User.findAll();
        });
    }
    addUser(userFields) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = yield User_1.User.create(userFields);
            return newUser;
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return User_1.User.findByPk(userId);
        });
    }
    putUserById(userId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userToUpdate = yield User_1.User.findByPk(userId);
            if (userToUpdate) {
                const updatedUser = yield userToUpdate.update(user);
                return updatedUser;
            }
            else {
                return null;
            }
        });
    }
    patchUserById(userId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userToPatch = yield User_1.User.findByPk(userId);
            if (userToPatch) {
                const attributesAllowedToPatch = [
                    'firstName',
                    'lastName',
                ];
                let updatedAttributes = {};
                for (let field of attributesAllowedToPatch) {
                    if (field in user) {
                        updatedAttributes[field] = user[field];
                    }
                }
                const patchedUser = yield userToPatch.update(updatedAttributes);
                return patchedUser;
            }
            else {
                return null;
            }
        });
    }
    removeUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userToRemove = yield User_1.User.findByPk(userId);
            if (userToRemove) {
                try {
                    userToRemove.destroy();
                    return `User with user id ${userId} has been deleted`;
                }
                catch (error) {
                    return `Error: ${error}`;
                }
            }
            return `User with user id ${userId} not found`;
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = User_1.User.findOne({
                where: {
                    email: email
                }
            });
            if (user) {
                return user;
            }
            else {
                return null;
            }
        });
    }
}
exports.default = new UserDao();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuZGFvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdXNlcnMvZGFvL3VzZXJzLmRhby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFxQztBQUlyQyxrREFBeUI7QUFFekIsTUFBTSxHQUFHLEdBQW9CLGVBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBO0FBR3ZELE1BQU0sT0FBTztJQUdYO1FBRkEsVUFBSyxHQUF5QixFQUFFLENBQUE7UUFHOUIsR0FBRyxDQUFDLGtDQUFrQyxDQUFDLENBQUE7SUFDekMsQ0FBQztJQUVLLFFBQVE7O1lBQ1osT0FBTyxXQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7UUFDdkIsQ0FBQztLQUFBO0lBRUssT0FBTyxDQUFDLFVBQXlCOztZQUNyQyxNQUFNLE9BQU8sR0FBRyxNQUFNLFdBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDOUMsT0FBTyxPQUFPLENBQUE7UUFDaEIsQ0FBQztLQUFBO0lBRUssV0FBVyxDQUFDLE1BQWM7O1lBQzlCLE9BQU8sV0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUM5QixDQUFDO0tBQUE7SUFFSyxXQUFXLENBQUMsTUFBYyxFQUFFLElBQWdCOztZQUNoRCxNQUFNLFlBQVksR0FBRyxNQUFNLFdBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDaEQsSUFBSSxZQUFZLEVBQUU7Z0JBQ2hCLE1BQU0sV0FBVyxHQUFHLE1BQU0sWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDbkQsT0FBTyxXQUFXLENBQUE7YUFDbkI7aUJBQU07Z0JBQ0wsT0FBTyxJQUFJLENBQUE7YUFDWjtRQUNILENBQUM7S0FBQTtJQUVLLGFBQWEsQ0FBQyxNQUFjLEVBQUUsSUFBa0I7O1lBQ3BELE1BQU0sV0FBVyxHQUFHLE1BQU0sV0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUMvQyxJQUFJLFdBQVcsRUFBRTtnQkFDZixNQUFNLHdCQUF3QixHQUErQjtvQkFDM0QsV0FBVztvQkFDWCxVQUFVO2lCQUNYLENBQUE7Z0JBRUQsSUFBSSxpQkFBaUIsR0FBeUIsRUFBRSxDQUFBO2dCQUVoRCxLQUFLLElBQUksS0FBSyxJQUFJLHdCQUF3QixFQUFFO29CQUMxQyxJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUU7d0JBQ2pCLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtxQkFDdkM7aUJBQ0Y7Z0JBRUQsTUFBTSxXQUFXLEdBQUcsTUFBTSxXQUFXLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUE7Z0JBQy9ELE9BQU8sV0FBVyxDQUFBO2FBQ25CO2lCQUFNO2dCQUNMLE9BQU8sSUFBSSxDQUFBO2FBQ1o7UUFDSCxDQUFDO0tBQUE7SUFFSyxjQUFjLENBQUMsTUFBYzs7WUFDakMsTUFBTSxZQUFZLEdBQUcsTUFBTSxXQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ2hELElBQUksWUFBWSxFQUFFO2dCQUNoQixJQUFJO29CQUNGLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtvQkFDdEIsT0FBTyxxQkFBcUIsTUFBTSxtQkFBbUIsQ0FBQTtpQkFDdEQ7Z0JBQUMsT0FBTyxLQUFLLEVBQUU7b0JBQ2QsT0FBTyxVQUFVLEtBQUssRUFBRSxDQUFBO2lCQUN6QjthQUNGO1lBQ0QsT0FBTyxxQkFBcUIsTUFBTSxZQUFZLENBQUM7UUFDakQsQ0FBQztLQUFBO0lBRUssY0FBYyxDQUFDLEtBQWE7O1lBQ2hDLE1BQU0sSUFBSSxHQUFHLFdBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ3hCLEtBQUssRUFBRTtvQkFDTCxLQUFLLEVBQUUsS0FBSztpQkFDYjthQUNGLENBQUMsQ0FBQTtZQUNGLElBQUksSUFBSSxFQUFFO2dCQUNOLE9BQU8sSUFBSSxDQUFDO2FBQ2Y7aUJBQU07Z0JBQ0gsT0FBTyxJQUFJLENBQUM7YUFDZjtRQUNILENBQUM7S0FBQTtDQUVGO0FBRUQsa0JBQWUsSUFBSSxPQUFPLEVBQUUsQ0FBQSJ9