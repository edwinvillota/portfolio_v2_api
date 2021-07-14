"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_service_1 = __importDefault(require("../../common/services/sequelize.service"));
const sequelize_1 = require("sequelize");
const shortid_1 = __importDefault(require("shortid"));
const sequelize = sequelize_service_1.default.getSequelize();
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    _id: {
        type: sequelize_1.DataTypes.STRING(10),
        primaryKey: true,
        defaultValue: () => {
            const shortId = shortid_1.default.generate();
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
    sequelize
});
User.sync();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3VzZXJzL21vZGVscy9Vc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGdHQUFzRTtBQUN0RSx5Q0FBc0Q7QUFDdEQsc0RBQTZCO0FBRTdCLE1BQU0sU0FBUyxHQUFHLDJCQUFnQixDQUFDLFlBQVksRUFBRSxDQUFDO0FBYWxELE1BQWEsSUFBSyxTQUFRLGlCQUE2QztDQVN0RTtBQVRELG9CQVNDO0FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQztJQUNSLEdBQUcsRUFBRTtRQUNILElBQUksRUFBRSxxQkFBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDMUIsVUFBVSxFQUFFLElBQUk7UUFDaEIsWUFBWSxFQUFFLEdBQUcsRUFBRTtZQUNqQixNQUFNLE9BQU8sR0FBRyxpQkFBTyxDQUFDLFFBQVEsRUFBRSxDQUFBO1lBQ2xDLE9BQU8sT0FBTyxDQUFBO1FBQ2hCLENBQUM7S0FDRjtJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxxQkFBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7UUFDM0IsU0FBUyxFQUFFLEtBQUs7S0FDakI7SUFDRCxRQUFRLEVBQUU7UUFDUixJQUFJLEVBQUUscUJBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO1FBQzNCLFNBQVMsRUFBRSxLQUFLO0tBQ2pCO0lBQ0QsU0FBUyxFQUFFO1FBQ1QsSUFBSSxFQUFFLHFCQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUMxQixTQUFTLEVBQUUsSUFBSTtLQUNoQjtJQUNELFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxxQkFBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7S0FDM0I7SUFDRCxnQkFBZ0IsRUFBRTtRQUNoQixJQUFJLEVBQUUscUJBQVMsQ0FBQyxPQUFPO0tBQ3hCO0NBQ0YsRUFBRTtJQUNELFNBQVMsRUFBRSxPQUFPO0lBQ2xCLFNBQVM7Q0FDVixDQUFDLENBQUE7QUFFRixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUEifQ==