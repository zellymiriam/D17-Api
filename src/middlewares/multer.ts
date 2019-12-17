
/* eslint-disable @typescript-eslint/ban-ts-ignore */
// @ts-ignore
import multer from 'multer';
// @ts-ignore
import Datauri from 'datauri';
import path from 'path';

const storage = multer.memoryStorage();

const fileFilter = (req: any, file: any, cb: any) =>{
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg'  || file.mimetype === 'image/png'){
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const multerUploads = multer({
  storage,
  limits: {
    filesize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

const upload = multerUploads.single('imageUrl');

const dUri = new Datauri();
const dataUri = (req: any) => dUri.format(
  path.extname(req.file.originalname).toString(),
  req.file.buffer);

export {upload, dataUri}
