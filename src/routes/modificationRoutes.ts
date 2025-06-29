import { Router } from 'express';
import {
  closeStreetCtrl,
  openStreetCtrl,
  addZoneCtrl,
  addCentroCtrl,
  updateStreetTimeCtrl
} from '../controllers/modificationController';

const router = Router();

router.post('/close-street', closeStreetCtrl);
router.post('/open-street', openStreetCtrl);
router.post('/add-zone', addZoneCtrl);
router.post('/add-centro', addCentroCtrl);
router.post('/update-street-time', updateStreetTimeCtrl);

export default router;