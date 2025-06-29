import { Router } from 'express';
import { migrateAndSeed } from '../controllers/graphController';


const router = Router();

router.post('/migrate-and-seed', migrateAndSeed);

export default router;