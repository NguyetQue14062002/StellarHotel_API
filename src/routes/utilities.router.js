import { utilitiesController } from '../controllers/index.js';
import express from 'express';
import upload from '../middleware/uploadMedia.js';

const router = express.Router();

router.get('/', utilitiesController.getAllUtilities);
router.post ('/create', upload.single('image'),utilitiesController.createUtility);
router.patch('/update', upload.single('image'),utilitiesController.updateUtility);
router.delete('/delete', utilitiesController.deleteUtility);

export default router;