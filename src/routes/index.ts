import { Application } from 'express';
import userRoutes from './user';
import roleRoutes from './role';

const routes = (app: Application)=>{
  app.use('/api/v1', userRoutes);
  app.use('/api/v1', roleRoutes);
};

export default routes;
