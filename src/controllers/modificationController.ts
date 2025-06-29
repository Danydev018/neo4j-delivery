import { Request, Response } from 'express';
import {
  closeStreet,
  openStreet,
  addZone,
  addCentro,
  updateStreetTime
} from '../services/modificationService';

export async function closeStreetCtrl(req: Request, res: Response) {
  const { origen, destino } = req.body;
  const result = await closeStreet(origen, destino);
  res.json(result);
}

export async function openStreetCtrl(req: Request, res: Response) {
  const { origen, destino } = req.body;
  const result = await openStreet(origen, destino);
  res.json(result);
}

export async function addZoneCtrl(req: Request, res: Response) {
  const { nombre, tipoZona, conexiones } = req.body;
  const result = await addZone(nombre, tipoZona, conexiones);
  res.json(result);
}

export async function addCentroCtrl(req: Request, res: Response) {
  const { nombre, conexiones } = req.body;
  const result = await addCentro(nombre, conexiones);
  res.json(result);
}

export async function updateStreetTimeCtrl(req: Request, res: Response) {
  const { origen, destino, nuevoTiempo } = req.body;
  const result = await updateStreetTime(origen, destino, nuevoTiempo);
  res.json(result);
}