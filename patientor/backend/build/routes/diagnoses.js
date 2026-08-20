import express from 'express';
import diagnosisService from '../diagnosisService.js';
const router = express.Router();
router.get('/', (_req, res) => {
    res.send(diagnosisService.getEntries());
});
export default router;
