import express from 'express';
import { updateBalance } from '../controllers/users.controller.js';

const router = express.Router();

export const install = () => {
  router.post('/:userId/balance', updateBalance);

  return router;
};
