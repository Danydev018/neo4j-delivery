import request from 'supertest';  
import app from '../../app';  
  
describe('Graph Endpoints', () => {  
  test('POST /api/graph/migrate-and-seed should initialize database', async () => {  
    const response = await request(app)  
      .post('/api/graph/migrate-and-seed')  
      .expect(200);  
      
    expect(response.body.success).toBe(true);  
    expect(response.body.message).toContain('completa');  
  });  
});