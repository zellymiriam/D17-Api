import { Application } from 'express';
import userRoutes from './user';

const routes = (app: Application)=>{
  app.use('/api/v1', userRoutes);
};

export default routes;
