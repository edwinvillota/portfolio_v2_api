import { Sequelize, Options } from 'sequelize'
import debug  from 'debug';

const log: debug.IDebugger = debug('app:sequelize-service');

class SequelizeService  {
  private count = 0
  private sequelizeOptions: Options = {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    database: 'users',
    username: 'admin',
    password: 'admin',
  }
  private sequelize : Sequelize | undefined

  constructor() {
    this.connectWithRetry();
  }

  getSequelize(): Sequelize {
    if (this.sequelize) {
        this.sequelize.authenticate().then(() => {
          log('Sequelize is ready')
          return this.sequelize
        }).catch((error) => {
          log('Sequelize is not ready', error)
          return new Sequelize(this.sequelizeOptions)
        })
    } 
    return new Sequelize(this.sequelizeOptions)
  }

  connectWithRetry = async () => {
    log('Attempting Postgres connection (with retry if needed)');
    const sequelize = new Sequelize(this.sequelizeOptions)

    try {
      await sequelize.authenticate()
      log('Postgres is connected')
    } catch (error) {
      const retrySeconds = 5
      log(
        `Postgres connection unsuccessful
        (will retry #${++this.count} after ${retrySeconds} seconds):`
        , error
      )
      setTimeout(this.connectWithRetry, retrySeconds * 1000)
    }

  }
}

export default new SequelizeService();