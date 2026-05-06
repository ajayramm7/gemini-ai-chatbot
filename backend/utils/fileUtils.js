import pdfParse from 'pdf-parse';
import { ApiError } from './apiError.js';

export const allowedDocumentMimeTypes = new Set([
  'application/pdf',
  'text/plain',
  'application/octet-stream'
]);

export const allowedImageMimeTypes = new Set([
  'image/png',
  'image/jpeg',
  'image/jpg',
  'application/octet-stream'
]);

export const getFileExtension = (fileName = '') => {
  const parts = fileName.toLowerCase().split('.');
  return parts.length > 1 ? parts.at(-1) : '';
};

export const isSupportedDocument = (file) => {
  const extension = getFileExtension(file?.originalname);
  return allowedDocumentMimeTypes.has(file?.mimetype) && ['pdf', 'txt'].includes(extension);
};

export const isSupportedImage = (file) => {
  const extension = getFileExtension(file?.originalname);
  return allowedImageMimeTypes.has(file?.mimetype) && ['png', 'jpg', 'jpeg'].includes(extension);
};

export const normalizeText = (text) =>
  text
    .replace(/\r/g, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

export const extractDocumentText = async (file) => {
  if (!file) {
    throw new ApiError(400, 'No document was uploaded.');
  }

  if (!isSupportedDocument(file)) {
    throw new ApiError(400, 'Only PDF and TXT documents are supported.');
  }

  if (getFileExtension(file.originalname) === 'pdf') {
    const parsed = await pdfParse(file.buffer);
    return normalizeText(parsed.text || '');
  }

  return normalizeText(file.buffer.toString('utf8'));
};

export const toGeminiImagePart = (image) => {
  if (!image?.base64 || !image?.mimeType) {
    return null;
  }

  return {
    inlineData: {
      mimeType: image.mimeType,
      data: image.base64
    }
  };
};

export const createImagePayload = (file) => {
  if (!file) {
    throw new ApiError(400, 'No image was uploaded.');
  }

  if (!isSupportedImage(file)) {
    throw new ApiError(400, 'Only PNG, JPG, and JPEG images are supported.');
  }

  return {
    fileName: file.originalname,
    mimeType: file.mimetype,
    size: file.size,
    base64: file.buffer.toString('base64')
  };
};
