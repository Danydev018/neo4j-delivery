import request from 'supertest';  
import app from '../../app';  
  
describe('Modification Endpoints', () => {  
  beforeEach(async () => {  
    // Reinicializar base de datos antes de cada prueba  
    await request(app).post('/api/graph/migrate-and-seed');  
  });  
  
  test('POST /api/modify/close-street should close street', async () => {  
    const response = await request(app)  
      .post('/api/modify/close-street')  
      .send({ origen: 'Centro1', destino: 'Zona1' })  
      .expect(200);  
      
    expect(response.body.success).toBe(true);  
  });  
  
  test('POST /api/modify/add-zone should create new zone', async () => {  
    const response = await request(app)  
      .post('/api/modify/add-zone')  
      .send({  
        nombre: 'ZonaPrueba',  
        tipoZona: 'residencial',  
        conexiones: [{ destino: 'Centro1', tiempo: 15, trafico: 'bajo', capacidad: 100 }]  
      })  
      .expect(200);  
      
    expect(response.body.success).toBe(true);  
  });  
});