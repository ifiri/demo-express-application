import UserModel from '../models/User.js';
import sequelize from '../plugins/sequelize.js';

export const updateBalance = async (req, res) => {
  const { userId } = req.params;
  const { amount } = req.body;

  const tx = await sequelize.transaction();

  try {
    const user = await UserModel.findByPk(userId, {
      lock: true,
      transaction: tx,
    });

    if (user) {
      const newBalance = Number.parseInt(user.balance) + Number.parseInt(amount);

      if (newBalance < 0) {
        await tx.rollback();
        return res.status(400).json({ message: 'User balance cannot be negative' });
      }

      user.balance = newBalance;
      await user.save({
        lock: true,
        transaction: tx,
      });

      await tx.commit();
    
      return res.json({ balance: user.balance });
    }
  } catch(error) {
    await tx.rollback();

    throw error;
  }

  return res.status(404).json({ message: 'User not found' });
};
