/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/camelcase */
const { config, uploader } = require('cloudinary')

const cloudinaryConfig = (req: any, res: any, next: any) => {
  config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  next();
};

export { cloudinaryConfig, uploader };
