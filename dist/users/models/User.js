"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var sequelize_service_1 = __importDefault(require("../../common/services/sequelize.service"));
var sequelize_1 = require("sequelize");
var shortid_1 = __importDefault(require("shortid"));
var sequelize = sequelize_service_1.default.getSequelize();
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return User;
}(sequelize_1.Model));
exports.User = User;
User.init({
    _id: {
        type: sequelize_1.DataTypes.STRING(10),
        primaryKey: true,
        defaultValue: function () {
            var shortId = shortid_1.default.generate();
            return shortId;
        }
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
        allowNull: true
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING(50),
    },
    permissionsFlags: {
        type: sequelize_1.DataTypes.INTEGER,
    }
}, {
    tableName: 'users',
    sequelize: sequelize
});
User.sync();
//# sourceMappingURL=User.js.map