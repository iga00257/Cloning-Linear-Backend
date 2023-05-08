import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRouter from './src/routes/userRoutes';
import projectRouter from './src/routes/issueRoutes';
import statusRouter from './src/routes/statusRoutes';
import configRouter from './src/routes/configRoutes';
import authRouter from './src/routes/auth';
import mongoose, { ConnectOptions } from 'mongoose';
import { createRoles,assignRoles,createUsers } from './src/utils/role';
import { type IPermission } from './src/models/permissionsModel';
import { createPermissions } from './src/utils/permissionCreate';
import permissionController from './src/controllers/permissionController';
import dotenv from 'dotenv';

const uri = 'mongodb://mongo:jpN74L63Bq18@infra.zeabur.com:31974/';
const app = express();
const PORT = 8080;

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
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

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