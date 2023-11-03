import { Model, DataTypes } from 'sequelize';
import sequelize from '../plugins/sequelize.js';

class User extends Model {};

User.init({
  balance: DataTypes.INTEGER
}, {
  sequelize,
  modelName: 'users',
});

export default User;
