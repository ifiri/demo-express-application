import express from 'express';
import { body, param } from 'express-validator';
import { updateBalance } from '../controllers/users.controller.js';

const router = express.Router();

export const install = () => {
  router.post(
    '/:userId/balance',
    param('userId')
      .exists()
      .isInt({
        min: 0,
        allow_leading_zeroes: false,
      }),
    body('amount')
      .exists()
      .isInt({
        allow_leading_zeroes: false,
      }),
    updateBalance
  );

  return router;
};
