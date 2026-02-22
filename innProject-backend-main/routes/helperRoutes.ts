// routes/helperRoutes.ts
import express from 'express';
import { HelperController } from '../controllers/helperController';
import multer from 'multer';
import path from 'path';
import { validateHelper } from '../middlewares/errorHandler';
import { parseFormData } from '../middlewares/errorHandler';


const router = express.Router();
const upload = multer({ dest: path.join(__dirname, '../uploads') });
const helperController = new HelperController();

router.get('/helpers', helperController.getHelpers);
router.post('/helpers',upload.single('profile'),parseFormData,validateHelper,helperController.addHelper);
router.get('/helpers/:id', helperController.getHelperById);
router.delete('/helpers/:id', helperController.deleteHelper); 
router.put('/helpers/:id',upload.single('profile'),parseFormData,helperController.updateHelper)



export default router;
