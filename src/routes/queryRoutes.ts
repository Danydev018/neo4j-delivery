import { Router } from 'express';
import {
  shortestPath,
  shortestPathAvoiding,
  zonasAccesibles,
  callesCongestionadas,
  zonasNoAccesibles,
  zonasAisladasSiCierra
} from '../controllers/queryController';

const router = Router();

router.post('/shortest-path', shortestPath);
router.post('/shortest-path-avoiding', shortestPathAvoiding);
router.get('/zonas-accesibles', zonasAccesibles);
router.get('/calles-congestionadas', callesCongestionadas);
router.get('/zonas-no-accesibles', zonasNoAccesibles);
router.get('/zonas-aisladas-si-cierra', zonasAisladasSiCierra);

export default router;