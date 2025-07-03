import { Request, Response } from 'express';
import { cleanDatabase } from '../services/cleanService';
import { runMigrations } from '../services/migrationService';
import { createInitialModel, getAllGraphData } from '../services/graphService';

export async function migrateAndSeed(req: Request, res: Response) {
  try {
    await cleanDatabase();
    console.log('cleanDatabase OK');
    await runMigrations();
    console.log('runMigrations OK');
    const result = await createInitialModel();
    console.log('createInitialModel OK');
    res.json({ ...result, success: true, message: 'Migración y carga inicial completa.' });
  } catch (error) {
    console.error('Error en migrateAndSeed:', error);
    res.status(500).json({ success: false, message: 'Error en migración/carga inicial', error });
  }
}

export async function getGraph(req: Request, res: Response) {  
  try {  
    const data = await getAllGraphData();  
    res.json(data);  
  } catch (error) {  
    console.error('Error fetching graph data:', error);  
    res.status(500).json({ success: false, message: 'Error al obtener los datos del grafo.' });  
  }  
}