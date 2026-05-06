import { Router } from 'express';
import { uploadDocument, uploadImage } from '../controllers/uploadController.js';
import { singleUpload } from '../middleware/uploadMiddleware.js';

const router = Router();

router.post('/document', singleUpload, uploadDocument);
router.post('/image', singleUpload, uploadImage);

export default router;
