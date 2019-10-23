/* eslint-disable no-console */
import  mongoose from 'mongoose';
import  dotenv from  'dotenv';

dotenv.config();

const db = async()=>{

  mongoose.connect(process.env.DB_URL,   { useNewUrlParser: true,useUnifiedTopology: true } )
    .catch(err=> console.log(err));

  mongoose.connection.on('connected', ()=>{
    console.log('Mongoose default connection is open to', process.env.DB_NAME);
  });

  mongoose.connection.on('error', (err)=>{
    console.log('Mongoose default connection has occured '+err+' error');
  });

  mongoose.connection.on('disconnected', ()=>{
    console.log('Mongoose default connection is disconnected');
  });

  process.on('SIGINT', ()=>{
    mongoose.connection.close(()=>{
      console.log('Mongoose default connection is disconnected due to application termination');
      process.exit(0);
    });
  });
};

export default db;
