import { Router } from 'express';
import { migrateAndSeed, getGraph } from '../controllers/graphController';


const router = Router();

router.post('/migrate-and-seed', migrateAndSeed);
router.get('/all', getGraph); // Nueva ruta 

export default router;