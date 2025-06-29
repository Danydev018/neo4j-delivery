import request from 'supertest';  
import app from '../../app';  
  
describe('Query Endpoints', () => {  
  beforeAll(async () => {  
    // Inicializar base de datos de prueba  
    await request(app).post('/api/graph/migrate-and-seed');  
  });  
  
  test('POST /api/query/shortest-path should return path', async () => {  
    const response = await request(app)  
      .post('/api/query/shortest-path')  
      .send({ center: 'Centro1', zona: 'Zona1' })  
      .expect(200);  
      
    expect(response.body).toBeDefined();  
  });  
  
  test('GET /api/query/zonas-accesibles should return accessible zones', async () => {  
    const response = await request(app)  
      .get('/api/query/zonas-accesibles')  
      .query({ center: 'Centro1', maxTiempo: 30 })  
      .expect(200);  
      
    expect(Array.isArray(response.body)).toBe(true);  
  });  
});