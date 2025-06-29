import express from 'express';
import graphRoutes from './routes/graphRoutes';
import queryRoutes from './routes/queryRoutes';
import modificationRoutes from './routes/modificationRoutes';


const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('¡API Neo4j Delivery corriendo! Consulta los endpoints en /api/...');
});

app.use('/api/graph', graphRoutes);
app.use('/api/query', queryRoutes);
app.use('/api/modify', modificationRoutes);

export default app;