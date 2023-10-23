import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const directory = 'documents';

    // Verificar si el directorio existe, si no, créalo
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory);
    }

    cb(null, directory);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage });

export const uploadDocument = (req, res, next) => {
  upload.single('document')(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    next();
  });
};
