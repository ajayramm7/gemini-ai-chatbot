import multer from 'multer';
import { ApiError } from '../utils/apiError.js';
import { isSupportedDocument, isSupportedImage } from '../utils/fileUtils.js';

const storage = multer.memoryStorage();
const maxUploadMb = Number(process.env.MAX_UPLOAD_MB || 10);

const upload = multer({
  storage,
  limits: {
    fileSize: maxUploadMb * 1024 * 1024
  },
  fileFilter: (_req, file, cb) => {
    const isAllowed = isSupportedDocument(file) || isSupportedImage(file);

    if (!isAllowed) {
      cb(new ApiError(400, 'Unsupported file type.'));
      return;
    }

    cb(null, true);
  }
});

export const singleUpload = upload.single('file');
