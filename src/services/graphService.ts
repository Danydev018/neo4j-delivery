import driver from '../config/neo4j';

export async function createInitialModel() {
  const session = driver.session();
  try {
    const cypher = `
      CREATE 
        (a:Zona {nombre: 'Altamira', tipo_zona: 'residencial'}),
        (b:Zona {nombre: 'Chacao', tipo_zona: 'comercial'}),
        (c:Zona {nombre: 'Las Mercedes', tipo_zona: 'comercial'}),
        (d:Zona {nombre: 'La Urbina', tipo_zona: 'residencial'}),
        (e:Zona {nombre: 'Petare', tipo_zona: 'residencial'}),
        (f:Zona {nombre: 'El Rosal', tipo_zona: 'comercial'}),
        (g:Zona {nombre: 'Los Palos Grandes', tipo_zona: 'residencial'}),
        (h:Zona {nombre: 'El Cafetal', tipo_zona: 'residencial'}),
        (cd1:CentroDistribucion {nombre: 'CD_1'}),
        (cd2:CentroDistribucion {nombre: 'CD_2'}),
        (cd1)-[:CONECTA {tiempo_minutos: 5, trafico_actual: 'medio', capacidad: 3}]->(a),
        (a)-[:CONECTA {tiempo_minutos: 4, trafico_actual: 'bajo', capacidad: 2}]->(b),
        (b)-[:CONECTA {tiempo_minutos: 6, trafico_actual: 'alto', capacidad: 2}]->(c),
        (c)-[:CONECTA {tiempo_minutos: 7, trafico_actual: 'medio', capacidad: 2}]->(d),
        (d)-[:CONECTA {tiempo_minutos: 8, trafico_actual: 'bajo', capacidad: 2}]->(e),
        (e)-[:CONECTA {tiempo_minutos: 9, trafico_actual: 'medio', capacidad: 3}]->(f),
        (f)-[:CONECTA {tiempo_minutos: 3, trafico_actual: 'bajo', capacidad: 2}]->(g),
        (g)-[:CONECTA {tiempo_minutos: 4, trafico_actual: 'alto', capacidad: 2}]->(h),
        (cd2)-[:CONECTA {tiempo_minutos: 6, trafico_actual: 'medio', capacidad: 3}]->(c)
    `;
    await session.run(cypher);
    return { success: true, message: 'Modelo y datos iniciales insertados.' };
  } finally {
    await session.close();
  }
}