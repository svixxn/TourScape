const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const AppError = require('./appError');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

exports.createMulti = (keys, folder, public_id, width, height) => {
  let counter = 1;
  const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: `TourScape/${folder}/${public_id}`,
      public_id: (req, file) => `${public_id}_${counter++}`,
      overwrite: true,
      resource_type: 'image',
      crop: "scale",
      width: width,
      height: height,
    },
  });

  return multer({ storage: storage, fileFilter: fileFilter }).array(
    keys
  );
};

exports.createSingle = (key, folder, public_id, width, height) => {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: `TourScape/${folder}`,
      public_id: () => public_id,
      overwrite: true,
      resource_type: 'image',
      crop: "scale",
      width: width,
      height: height,
    },
  });
  return multer({ storage: storage, fileFilter: fileFilter }).single(
    key
  );
}

exports.deleteSingle = (folder, public_id) => {
  cloudinary.uploader.destroy(`TourScape/${folder}/${public_id}`);
};