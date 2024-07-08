import { Sequelize } from 'sequelize';
import config from '../config/database.js';

const sequelise = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.dialect,

  pool: {
    handleDisconnects: true,
    max: 10,
    min: 0, 
    idle: 10000, 
    acquire: 20000,
  },

  retry: {
    max: 5,
    backoffBase: 3000,
    backoffExponent: 1.1,
  },
});

export default sequelise;
