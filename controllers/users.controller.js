import { Transaction } from 'sequelize';
import { validationResult } from 'express-validator';
import UserModel from '../models/User.js';
import sequelize from '../plugins/sequelize.js';

const ERROR_CODES = {
  VALIDATION_ERROR: 'VALITATION_ERROR',
};

export const updateBalance = async (req, res) => {
  const { userId } = req.params;
  const { amount } = req.body;

  const validation = validationResult(req);

  console.log('---- validation', validation);

  // if (!Number.parseInt(userId) || userId <= 0) {
  //   return res.status(400).json({
  //     code: ERROR_CODES.VALIDATION_ERROR,
  //     message: 'User ID must be an integer',
  //   });
  // }

  // if (!Number.isInteger(amount)) {
  //   return res.status(400).json({
  //     code: ERROR_CODES.VALIDATION_ERROR,
  //     message: 'Amount must be an integer',
  //   });
  // }

  try {
    // Prevents SequelizeConnectionAcquireTimeoutError because it's managed tx.
    const result = await sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.REPEATABLE_READ,
    }, async (tx) => {
      const user = await UserModel.findByPk(userId, {
        transaction: tx,
      });
  
      if (!user) {
        throw new Error('User not found');
      }

      const newBalance = Number.parseInt(user.balance) + Number.parseInt(amount);

      if (newBalance < 0) {
        throw new Error('User balance cannot be negative');
      }

      user.balance = newBalance;
      await user.save({
        transaction: tx,
      });
    
      return { balance: user.balance };
    });

    return res.json(result);
  } catch(e) {
    return res.status(500).json({ message: e.message });
  }
};
