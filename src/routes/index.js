import userRoutes from './user';

const routes = (app)=>{
  app.use('/api/v1', userRoutes);
};
export default routes;
