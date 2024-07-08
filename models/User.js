import { Model, DataTypes } from 'sequelize';
import sequelize from '../plugins/sequelize.js';

class User extends Model {};

User.init({
  balance: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
}, {
  sequelize,
  modelName: 'users',
});

export default User;
