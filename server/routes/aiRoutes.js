import express from 'express';
import { enhaceProSummary, enhanceJobDesc, uploadResume } from '../controllers/aiControllers.js';
import protect from '../middlewares/authMiddleware.js';

const aiRouter = express.Router();

aiRouter.post('/enhance-pro-sum', protect, enhaceProSummary);
aiRouter.post('/enhance-job-desc', protect, enhanceJobDesc );
aiRouter.post('/upload-resume', protect,uploadResume);

export default aiRouter;