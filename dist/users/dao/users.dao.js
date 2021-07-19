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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("../models/User");
var debug_1 = __importDefault(require("debug"));
var log = debug_1.default("app:in-memory-dao");
var UserDao = /** @class */ (function () {
    function UserDao() {
        this.users = [];
        log('Created new instance of UsersDao');
    }
    UserDao.prototype.getUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, User_1.User.findAll()];
            });
        });
    };
    UserDao.prototype.addUser = function (userFields) {
        return __awaiter(this, void 0, void 0, function () {
            var newUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User_1.User.create(userFields)];
                    case 1:
                        newUser = _a.sent();
                        return [2 /*return*/, newUser];
                }
            });
        });
    };
    UserDao.prototype.getUserById = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, User_1.User.findByPk(userId)];
            });
        });
    };
    UserDao.prototype.putUserById = function (userId, user) {
        return __awaiter(this, void 0, void 0, function () {
            var userToUpdate, updatedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User_1.User.findByPk(userId)];
                    case 1:
                        userToUpdate = _a.sent();
                        if (!userToUpdate) return [3 /*break*/, 3];
                        return [4 /*yield*/, userToUpdate.update(user)];
                    case 2:
                        updatedUser = _a.sent();
                        return [2 /*return*/, updatedUser];
                    case 3: return [2 /*return*/, null];
                }
            });
        });
    };
    UserDao.prototype.patchUserById = function (userId, user) {
        return __awaiter(this, void 0, void 0, function () {
            var userToPatch, attributesAllowedToPatch, updatedAttributes, _i, attributesAllowedToPatch_1, field, patchedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User_1.User.findByPk(userId)];
                    case 1:
                        userToPatch = _a.sent();
                        if (!userToPatch) return [3 /*break*/, 3];
                        attributesAllowedToPatch = [
                            'firstName',
                            'lastName',
                        ];
                        updatedAttributes = {};
                        for (_i = 0, attributesAllowedToPatch_1 = attributesAllowedToPatch; _i < attributesAllowedToPatch_1.length; _i++) {
                            field = attributesAllowedToPatch_1[_i];
                            if (field in user) {
                                updatedAttributes[field] = user[field];
                            }
                        }
                        return [4 /*yield*/, userToPatch.update(updatedAttributes)];
                    case 2:
                        patchedUser = _a.sent();
                        return [2 /*return*/, patchedUser];
                    case 3: return [2 /*return*/, null];
                }
            });
        });
    };
    UserDao.prototype.removeUserById = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var userToRemove;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User_1.User.findByPk(userId)];
                    case 1:
                        userToRemove = _a.sent();
                        if (userToRemove) {
                            try {
                                userToRemove.destroy();
                                return [2 /*return*/, "User with user id " + userId + " has been deleted"];
                            }
                            catch (error) {
                                return [2 /*return*/, "Error: " + error];
                            }
                        }
                        return [2 /*return*/, "User with user id " + userId + " not found"];
                }
            });
        });
    };
    UserDao.prototype.getUserByEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User_1.User.findOne({
                            where: {
                                email: email
                            }
                        })];
                    case 1:
                        user = _a.sent();
                        if (user) {
                            return [2 /*return*/, user];
                        }
                        else {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return UserDao;
}());
exports.default = new UserDao();
//# sourceMappingURL=users.dao.js.map