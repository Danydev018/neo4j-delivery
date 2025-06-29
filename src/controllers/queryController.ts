import { Request, Response } from 'express';
import {
  getShortestPath,
  getShortestPathAvoiding,
  getZonasAccesibles,
  getCallesCongestionadas,
  getZonasNoAccesibles,
  getZonasAisladasSiCierra
} from '../services/queryService';

// 1. Ruta más rápida
export async function shortestPath(req: Request, res: Response) {
  const { center, zona } = req.body;
  const data = await getShortestPath(center, zona);
  res.json(data);
}

// 2. Ruta más rápida evitando zonas bloqueadas
export async function shortestPathAvoiding(req: Request, res: Response) {
  const { center, zona, zonasBloqueadas } = req.body;
  const data = await getShortestPathAvoiding(center, zona, zonasBloqueadas);
  res.json(data);
}

// 3. Zonas accesibles desde un centro
export async function zonasAccesibles(req: Request, res: Response) {
  const { center, maxTiempo } = req.query;
  const data = await getZonasAccesibles(center as string, Number(maxTiempo));
  res.json(data);
}

// 4. Calles congestionadas
export async function callesCongestionadas(req: Request, res: Response) {
  const data = await getCallesCongestionadas();
  res.json(data);
}

// 5. Zonas no accesibles desde un centro
export async function zonasNoAccesibles(req: Request, res: Response) {
  const data = await getZonasNoAccesibles();
  res.json(data);
}

// 6. Zonas aisladas si se cierra una zona
export async function zonasAisladasSiCierra(req: Request, res: Response) {
  const { nombreZona } = req.query;
  const data = await getZonasAisladasSiCierra(nombreZona as string);
  res.json(data);
}