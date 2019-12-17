import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes';
import bodyParser from 'body-parser';
import createTables from './database/createTables';
import {  cloudinaryConfig } from './config/cloudinary';

dotenv.config();

const app = express();
const server = async () => {
  await createTables();
  app.use('*', cloudinaryConfig);
  app.use(cors());
  app.use(bodyParser.json());

  routes(app);

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log('now listening for requests on port' + port);
  });
};
server();

