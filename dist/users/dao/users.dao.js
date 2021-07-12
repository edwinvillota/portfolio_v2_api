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
const sequelize_service_1 = __importDefault(require("../../common/services/sequelize.service"));
const sequelize_1 = require("sequelize");
const shortid_1 = __importDefault(require("shortid"));
const debug_1 = __importDefault(require("debug"));
const log = debug_1.default("app:in-memory-dao");
const sequelize = sequelize_service_1.default.getSequelize();
class User extends sequelize_1.Model {
}
User.init({
    _id: {
        type: sequelize_1.DataTypes.STRING(10),
        primaryKey: true
    },
    email: {
        type: sequelize_1.DataTypes.STRING(120),
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: false
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING(50),
    },
    permissionsFlags: {
        type: sequelize_1.DataTypes.STRING(100),
    }
}, {
    tableName: 'users',
    sequelize
});
User.sync();
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
            const newUser = yield User.create({
                _id: shortid_1.default.generate(),
                email: 'edwinvillota@hotmail.com',
                firstName: 'edwin',
                lastName: 'villota',
                password: 'Edwin4312',
                permissionsFlags: 'none'
            });
            return newUser._id;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuZGFvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdXNlcnMvZGFvL3VzZXJzLmRhby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLGdHQUFzRTtBQUN0RSx5Q0FBc0Q7QUFJdEQsc0RBQTZCO0FBQzdCLGtEQUF5QjtBQUV6QixNQUFNLEdBQUcsR0FBb0IsZUFBSyxDQUFDLG1CQUFtQixDQUFDLENBQUE7QUFFdkQsTUFBTSxTQUFTLEdBQUcsMkJBQWdCLENBQUMsWUFBWSxFQUFFLENBQUM7QUFhbEQsTUFBTSxJQUFLLFNBQVEsaUJBQTZDO0NBVS9EO0FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQztJQUNSLEdBQUcsRUFBRTtRQUNILElBQUksRUFBRSxxQkFBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDMUIsVUFBVSxFQUFFLElBQUk7S0FDakI7SUFDRCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUscUJBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO1FBQzNCLFNBQVMsRUFBRSxLQUFLO0tBQ2pCO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsSUFBSSxFQUFFLHFCQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUMzQixTQUFTLEVBQUUsS0FBSztLQUNqQjtJQUNELFNBQVMsRUFBRTtRQUNULElBQUksRUFBRSxxQkFBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDMUIsU0FBUyxFQUFFLEtBQUs7S0FDakI7SUFDRCxRQUFRLEVBQUU7UUFDUixJQUFJLEVBQUUscUJBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO0tBQzNCO0lBQ0QsZ0JBQWdCLEVBQUU7UUFDaEIsSUFBSSxFQUFFLHFCQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztLQUM1QjtDQUNGLEVBQUU7SUFDRCxTQUFTLEVBQUUsT0FBTztJQUNsQixTQUFTO0NBQ1YsQ0FBQyxDQUFBO0FBRUYsSUFBSSxDQUFD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