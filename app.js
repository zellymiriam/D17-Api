import express from 'express';
import  dotenv from  'dotenv';
import cors from 'cors';
import db from './src/db';

dotenv.config();

const app = express();
app.use(cors());
db();

const port = process.env.PORT || 5000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('now listening for requests on port ' + port);
});
