import multer from "multer";

const storageConfig = multer.diskStorage({
  // Write your code here
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});

export const upload = multer({
  storage: storageConfig,
});
