import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRouter from './routes/userRoutes';
import projectRouter from './routes/issueRoutes';
import statusRouter from './routes/statusRoutes';
import configRouter from './routes/configRoutes';
import authRouter from './routes/auth';
import mongoose, { ConnectOptions } from 'mongoose';
import { createRoles,assignRoles,createUsers } from './utils/role';
import { type IPermission } from './models/permissionsModel';
import { createPermissions } from './utils/permissionCreate';
import permissionController from './controllers/permissionController';
import dotenv from 'dotenv';

const uri = 'mongodb://mongo:jpN74L63Bq18@infra.zeabur.com:31974/';
const app = express();
const PORT = 3000;

async function init() {
  await createPermissions();
  await createUsers();
}
init()
// dotenv.config();
// Connect to MongoDB

mongoose.connect(uri,{dbName:"tao"})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api', userRouter);
app.use('/api', projectRouter);
app.use('/api', statusRouter);
app.use('/api', configRouter);
app.use('/auth', authRouter);



// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});