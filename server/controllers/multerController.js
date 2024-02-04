import multer, { diskStorage } from "multer";

const imageDir = process.env.IMAGE_DIR || "public/";

const fileStorage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, imageDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const fileUpload = multer({
  storage: fileStorage,
  fileFilter: fileFilter,
}).single("file");
