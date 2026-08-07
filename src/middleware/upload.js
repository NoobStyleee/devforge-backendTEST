import multer from 'multer';
import path from 'node:path';
import os from 'node:os';

const storage = multer.diskStorage({
  destination: os.tmpdir(),
  filename: (req, file, cb) => {
    const uniquePrefix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniquePrefix}${path.extname(file.originalname)}`);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 1 * 1024 * 1024 }, // 1 Mb, згідно ТЗ
});
