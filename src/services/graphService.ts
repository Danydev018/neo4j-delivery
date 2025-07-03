import driver from '../config/neo4j';

export async function createInitialModel() {
  const session = driver.session();
  try {
    const cypher = `    
      // Nodos de Puerto Ordaz  
      MERGE (po1:Zona {nombre: 'AltaVista', tipo_zona: 'comercial'})    
      MERGE (po2:Zona {nombre: 'Unare', tipo_zona: 'residencial'})    
      // ... (más nodos de Puerto Ordaz hasta tener ~40-50)  
  
      // Nodos de San Félix  
      MERGE (sf1:Zona {nombre: 'VistaAlegre', tipo_zona: 'residencial'})    
      MERGE (sf2:Zona {nombre: 'SierraParima', tipo_zona: 'residencial'})    
      // ... (más nodos de San Félix hasta tener ~30-40)  
  
      // Nodos de Ciudad Bolívar  
      MERGE (cb1:Zona {nombre: 'CascoHistorico', tipo_zona: 'comercial'})    
      MERGE (cb2:Zona {nombre: 'LaSabanita', tipo_zona: 'residencial'})    
      // ... (más nodos de Ciudad Bolívar hasta tener ~10-20)  
  
      // Centros de Distribución  
      MERGE (cd1:CentroDistribucion {nombre: 'CD_PuertoOrdaz'})    
      MERGE (cd2:CentroDistribucion {nombre: 'CD_CiudadBolivar'})    
  
      // Relaciones CONECTA  
      MERGE (cd1)-[:CONECTA {tiempo_minutos: 10, trafico_actual: 'medio', capacidad: 5}]->(po1)  
      MERGE (po1)-[:CONECTA {tiempo_minutos: 5, trafico_actual: 'bajo', capacidad: 3}]->(po2)  
      // ... (muchas más relaciones para conectar todos los nodos y entre ciudades)  
      MERGE (po2)-[:CONECTA {tiempo_minutos: 45, trafico_actual: 'alto', capacidad: 2}]->(sf1) // Conexión entre ciudades  
      MERGE (sf2)-[:CONECTA {tiempo_minutos: 60, trafico_actual: 'medio', capacidad: 3}]->(cb1) // Conexión entre ciudades  
    `;
    await session.run(cypher);
    return { success: true, message: 'Modelo y datos iniciales insertados.' };
  } finally {
    await session.close();
  }
}

export async function getAllGraphData() {  
  const session = driver.session();  
  try {  
    const nodesResult = await session.run(`  
      MATCH (n) RETURN n, labels(n) as nodeLabels  
    `);  
    const relationshipsResult = await session.run(`  
      MATCH (s)-[r]->(e) RETURN r, s.nombre AS fromName, e.nombre AS toName  
    `);  
  
    const nodes = nodesResult.records.map(record => {  
      const node = record.get('n');  
      return {  
        ...node.properties,  
        type: record.get('nodeLabels')[0] // Obtener la primera etiqueta como tipo  
      };  
    });  
  
    const relationships = relationshipsResult.records.map(record => {  
      const rel = record.get('r');  
      return {  
        from: record.get('fromName'), // Usar el nombre retornado directamente  
        to: record.get('toName'),     // Usar el nombre retornado directamente  
        ...rel.properties  
      };  
    });  
  
    return { nodes, relationships };  
  } finally {  
    await session.close();  
  }  
}