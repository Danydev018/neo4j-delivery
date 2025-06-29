import driver from '../config/neo4j';

export async function createInitialModel() {
  const session = driver.session();
  try {
    const cypher = `  
      MERGE (a:Zona {nombre: 'Altamira', tipo_zona: 'residencial'})  
      MERGE (b:Zona {nombre: 'Chacao', tipo_zona: 'comercial'})  
      MERGE (c:Zona {nombre: 'Las Mercedes', tipo_zona: 'comercial'})  
      MERGE (d:Zona {nombre: 'La Urbina', tipo_zona: 'residencial'})  
      MERGE (e:Zona {nombre: 'Petare', tipo_zona: 'residencial'})  
      MERGE (f:Zona {nombre: 'El Rosal', tipo_zona: 'comercial'})  
      MERGE (g:Zona {nombre: 'Los Palos Grandes', tipo_zona: 'residencial'})  
      MERGE (h:Zona {nombre: 'El Cafetal', tipo_zona: 'residencial'})  
      MERGE (cd1:CentroDistribucion {nombre: 'CD_1'})  
      MERGE (cd2:CentroDistribucion {nombre: 'CD_2'})  
      MERGE (cd1)-[:CONECTA {tiempo_minutos: 5, trafico_actual: 'medio', capacidad: 3}]->(a)  
      MERGE (a)-[:CONECTA {tiempo_minutos: 4, trafico_actual: 'bajo', capacidad: 2}]->(b)  
      MERGE (b)-[:CONECTA {tiempo_minutos: 6, trafico_actual: 'alto', capacidad: 2}]->(c)  
      MERGE (c)-[:CONECTA {tiempo_minutos: 7, trafico_actual: 'medio', capacidad: 2}]->(d)  
      MERGE (d)-[:CONECTA {tiempo_minutos: 8, trafico_actual: 'bajo', capacidad: 2}]->(e)  
      MERGE (e)-[:CONECTA {tiempo_minutos: 9, trafico_actual: 'medio', capacidad: 3}]->(f)  
      MERGE (f)-[:CONECTA {tiempo_minutos: 3, trafico_actual: 'bajo', capacidad: 2}]->(g)  
      MERGE (g)-[:CONECTA {tiempo_minutos: 4, trafico_actual: 'alto', capacidad: 2}]->(h)  
      MERGE (cd2)-[:CONECTA {tiempo_minutos: 6, trafico_actual: 'medio', capacidad: 3}]->(c)  
    `;
    await session.run(cypher);
    return { success: true, message: 'Modelo y datos iniciales insertados.' };
  } finally {
    await session.close();
  }
}