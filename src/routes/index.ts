import { Application } from 'express';
import userRoutes from './user';
import roleRoutes from './role';
import transactionRoutes from './transaction';
import loanRoutes from './loan'

const routes = (app: Application)=>{
  app.use('/api/v1', userRoutes);
  app.use('/api/v1', roleRoutes);
  app.use('/api/v1', transactionRoutes);
  app.use('/api/v1', loanRoutes);
};

export default routes;
