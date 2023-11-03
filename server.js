import express from 'express';
import dotenv from 'dotenv';

import './plugins/sequelize.js';
import { install as installRoutes } from './routes/users.routes.js';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const users = installRoutes();

app.use('/users', users);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

export default app;
