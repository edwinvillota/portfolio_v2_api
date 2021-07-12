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
const sequelize_1 = require("sequelize");
const debug_1 = __importDefault(require("debug"));
const log = debug_1.default('app:sequelize-service');
class SequelizeService {
    constructor() {
        this.count = 0;
        this.sequelizeOptions = {
            host: 'localhost',
            port: 5432,
            dialect: 'postgres',
            database: 'users',
            username: 'admin',
            password: 'admin',
        };
        this.connectWithRetry = () => __awaiter(this, void 0, void 0, function* () {
            log('Attempting Postgres connection (with retry if needed)');
            const sequelize = new sequelize_1.Sequelize(this.sequelizeOptions);
            try {
                yield sequelize.authenticate();
                log('Postgres is connected');
            }
            catch (error) {
                const retrySeconds = 5;
                log(`Postgres connection unsuccessful
        (will retry #${++this.count} after ${retrySeconds} seconds):`, error);
                setTimeout(this.connectWithRetry, retrySeconds * 1000);
            }
        });
        this.connectWithRetry();
    }
    getSequelize() {
        if (this.sequelize) {
            this.sequelize.authenticate().then(() => {
                log('Sequelize is ready');
                return this.sequelize;
            }).catch((error) => {
                log('Sequelize is not ready', error);
                return new sequelize_1.Sequelize(this.sequelizeOptions);
            });
        }
        return new sequelize_1.Sequelize(this.sequelizeOptions);
    }
}
exports.default = new SequelizeService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VxdWVsaXplLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21tb24vc2VydmljZXMvc2VxdWVsaXplLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBOEM7QUFDOUMsa0RBQTJCO0FBRTNCLE1BQU0sR0FBRyxHQUFvQixlQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQztBQUU1RCxNQUFNLGdCQUFnQjtJQVlwQjtRQVhRLFVBQUssR0FBRyxDQUFDLENBQUE7UUFDVCxxQkFBZ0IsR0FBWTtZQUNsQyxJQUFJLEVBQUUsV0FBVztZQUNqQixJQUFJLEVBQUUsSUFBSTtZQUNWLE9BQU8sRUFBRSxVQUFVO1lBQ25CLFFBQVEsRUFBRSxPQUFPO1lBQ2pCLFFBQVEsRUFBRSxPQUFPO1lBQ2pCLFFBQVEsRUFBRSxPQUFPO1NBQ2xCLENBQUE7UUFvQkQscUJBQWdCLEdBQUcsR0FBUyxFQUFFO1lBQzVCLEdBQUcsQ0FBQyx1REFBdUQsQ0FBQyxDQUFDO1lBQzdELE1BQU0sU0FBUyxHQUFHLElBQUkscUJBQVMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtZQUV0RCxJQUFJO2dCQUNGLE1BQU0sU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFBO2dCQUM5QixHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQTthQUM3QjtZQUFDLE9BQU8sS0FBSyxFQUFFO2dCQUNkLE1BQU0sWUFBWSxHQUFHLENBQUMsQ0FBQTtnQkFDdEIsR0FBRyxDQUNEO3VCQUNlLEVBQUUsSUFBSSxDQUFDLEtBQUssVUFBVSxZQUFZLFlBQVksRUFDM0QsS0FBSyxDQUNSLENBQUE7Z0JBQ0QsVUFBVSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxZQUFZLEdBQUcsSUFBSSxDQUFDLENBQUE7YUFDdkQ7UUFFSCxDQUFDLENBQUEsQ0FBQTtRQWpDQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQsWUFBWTtRQUNWLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNoQixJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ3RDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO2dCQUN6QixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUE7WUFDdkIsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQ2pCLEdBQUcsQ0FBQyx3QkFBd0IsRUFBRSxLQUFLLENBQUMsQ0FBQTtnQkFDcEMsT0FBTyxJQUFJLHFCQUFTLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUE7WUFDN0MsQ0FBQyxDQUFDLENBQUE7U0FDTDtRQUNELE9BQU8sSUFBSSxxQkFBUyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO0lBQzdDLENBQUM7Q0FvQkY7QUFFRCxrQkFBZSxJQUFJLGdCQUFnQixFQUFFLENBQUMifQ==