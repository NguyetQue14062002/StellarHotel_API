import { utilitiesController } from '../controllers/index.js';
import express from 'express';

const router = express.Router();

router.get('/', utilitiesController.getAllUtilities);
router.post ('/create', utilitiesController.createUtility);
router.patch('/update', utilitiesController.updateUtility);
router.delete('/delete', utilitiesController.deleteUtility);

export default router;