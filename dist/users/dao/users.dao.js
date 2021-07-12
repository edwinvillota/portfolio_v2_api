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
const shortid_1 = __importDefault(require("shortid"));
const debug_1 = __importDefault(require("debug"));
const log = debug_1.default("app:in-memory-dao");
class UserDao {
    constructor() {
        this.users = [];
        log('Created new instance of UsersDao');
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.users;
        });
    }
    addUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            user.id = shortid_1.default.generate();
            this.users.push(user);
            return user.id;
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.users.find((user) => user.id === userId);
        });
    }
    putUserById(userId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const objIndex = this.users.findIndex((obj) => obj.id === userId);
            this.users.splice(objIndex, 1, user);
            return `${user.id} updated via put`;
        });
    }
    patchUserById(userId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const objIndex = this.users.findIndex((obj) => obj.id === userId);
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
        });
    }
    removeUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const objIndex = this.users.findIndex((obj) => obj.id === userId);
            this.users.splice(objIndex, 1);
            return `${userId} removed`;
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const objIndex = this.users.findIndex((obj) => obj.email === email);
            let currentUser = this.users[objIndex];
            if (currentUser) {
                return currentUser;
            }
            else {
                return null;
            }
        });
    }
}
exports.default = new UserDao();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuZGFvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdXNlcnMvZGFvL3VzZXJzLmRhby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUdBLHNEQUE2QjtBQUM3QixrREFBeUI7QUFFekIsTUFBTSxHQUFHLEdBQW9CLGVBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBO0FBRXZELE1BQU0sT0FBTztJQUdYO1FBRkEsVUFBSyxHQUF5QixFQUFFLENBQUE7UUFHOUIsR0FBRyxDQUFDLGtDQUFrQyxDQUFDLENBQUE7SUFDekMsQ0FBQztJQUVLLFFBQVE7O1lBQ1osT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFBO1FBQ25CLENBQUM7S0FBQTtJQUVLLE9BQU8sQ0FBQyxJQUFtQjs7WUFDL0IsSUFBSSxDQUFDLEVBQUUsR0FBRyxpQkFBTyxDQUFDLFFBQVEsRUFBRSxDQUFBO1lBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ3JCLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQTtRQUNoQixDQUFDO0tBQUE7SUFFSyxXQUFXLENBQUMsTUFBYzs7WUFDOUIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQW9CLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssTUFBTSxDQUFDLENBQUE7UUFDdEUsQ0FBQztLQUFBO0lBRUssV0FBVyxDQUFDLE1BQWMsRUFBRSxJQUFnQjs7WUFDaEQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQ25DLENBQUMsR0FBa0IsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsS0FBSyxNQUFNLENBQzFDLENBQUE7WUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFBO1lBRXBDLE9BQU8sR0FBRyxJQUFJLENBQUMsRUFBRSxrQkFBa0IsQ0FBQTtRQUNyQyxDQUFDO0tBQUE7SUFFSyxhQUFhLENBQUMsTUFBYyxFQUFFLElBQWtCOztZQUNwRCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FDbkMsQ0FBQyxHQUFtQixFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLE1BQU0sQ0FDM0MsQ0FBQztZQUNGLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdkMsTUFBTSxrQkFBa0IsR0FBRztnQkFDdkIsVUFBVTtnQkFDVixXQUFXO2dCQUNYLFVBQVU7Z0JBQ1YsaUJBQWlCO2FBQ3BCLENBQUM7WUFDRixLQUFLLElBQUksS0FBSyxJQUFJLGtCQUFrQixFQUFFO2dCQUNsQyxJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUU7b0JBQ2YsYUFBYTtvQkFDYixXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNwQzthQUNKO1lBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztZQUM1QyxPQUFPLEdBQUcsSUFBSSxDQUFDLEVBQUUsVUFBVSxDQUFDO1FBRTlCLENBQUM7S0FBQTtJQUVLLGNBQWMsQ0FBQyxNQUFjOztZQUNqQyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FDakMsQ0FBQyxHQUFtQixFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLE1BQU0sQ0FDN0MsQ0FBQztZQUNGLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMvQixPQUFPLEdBQUcsTUFBTSxVQUFVLENBQUM7UUFDN0IsQ0FBQztLQUFBO0lBRUssY0FBYyxDQUFDLEtBQWE7O1lBQ2hDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUNqQyxDQUFDLEdBQXNCLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUNsRCxDQUFDO1lBQ0YsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN2QyxJQUFJLFdBQVcsRUFBRTtnQkFDYixPQUFPLFdBQVcsQ0FBQzthQUN0QjtpQkFBTTtnQkFDSCxPQUFPLElBQUksQ0FBQzthQUNmO1FBQ0gsQ0FBQztLQUFBO0NBRUY7QUFFRCxrQkFBZSxJQUFJLE9BQU8sRUFBRSxDQUFBIn0=