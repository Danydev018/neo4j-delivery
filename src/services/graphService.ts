import driver from '../config/neo4j';

export async function createInitialModel() {
  const session = driver.session();
  try {

    const cypher = `    
      // Nodos de Puerto Ordaz
      MERGE (po1:Zona {nombre: 'AltaVista', tipo_zona: 'comercial'})
      MERGE (po2:Zona {nombre: 'Unare', tipo_zona: 'residencial'})
      MERGE (po3:Zona {nombre: 'LosOlivos', tipo_zona: 'residencial'})
      MERGE (po4:Zona {nombre: 'VillaBetania', tipo_zona: 'residencial'})
      MERGE (po5:Zona {nombre: 'Core8', tipo_zona: 'residencial'})
      MERGE (po6:Zona {nombre: 'LasAmericas', tipo_zona: 'comercial'})
      MERGE (po7:Zona {nombre: 'LosPinos', tipo_zona: 'residencial'})
      MERGE (po8:Zona {nombre: 'CampoB', tipo_zona: 'industrial'})
      MERGE (po9:Zona {nombre: 'GuayanaCountry', tipo_zona: 'residencial'})
      MERGE (po10:Zona {nombre: 'VillaGranada', tipo_zona: 'residencial'})
      MERGE (po11:Zona {nombre: 'LasPeonias', tipo_zona: 'residencial'})
      MERGE (po12:Zona {nombre: 'VillaAsia', tipo_zona: 'comercial'})
      MERGE (po13:Zona {nombre: 'LosMangos', tipo_zona: 'residencial'})
      MERGE (po14:Zona {nombre: 'VillaAntillana', tipo_zona: 'residencial'})
      MERGE (po15:Zona {nombre: 'VillaIcabaru', tipo_zona: 'residencial'})
      MERGE (po16:Zona {nombre: 'VillaCentral', tipo_zona: 'comercial'})
      MERGE (po17:Zona {nombre: 'VillaBahia', tipo_zona: 'residencial'})
      MERGE (po18:Zona {nombre: 'VillaTavare', tipo_zona: 'residencial'})
      MERGE (po19:Zona {nombre: 'VillaAponwao', tipo_zona: 'residencial'})
      MERGE (po20:Zona {nombre: 'VillaCaruachi', tipo_zona: 'residencial'})

      // Nodos de San Felix
      MERGE (sf1:Zona {nombre: 'VistaAlegre', tipo_zona: 'residencial'})
      MERGE (sf2:Zona {nombre: 'SierraParima', tipo_zona: 'residencial'})
      MERGE (sf3:Zona {nombre: 'ElRoble', tipo_zona: 'comercial'})
      MERGE (sf4:Zona {nombre: 'UD146', tipo_zona: 'residencial'})
      MERGE (sf5:Zona {nombre: 'UD145', tipo_zona: 'residencial'})
      MERGE (sf6:Zona {nombre: 'UD104', tipo_zona: 'residencial'})
      MERGE (sf7:Zona {nombre: 'UD102', tipo_zona: 'residencial'})
      MERGE (sf8:Zona {nombre: 'UD101', tipo_zona: 'residencial'})
      MERGE (sf9:Zona {nombre: 'UD103', tipo_zona: 'residencial'})
      MERGE (sf10:Zona {nombre: 'UD105', tipo_zona: 'residencial'})
      MERGE (sf11:Zona {nombre: 'UD106', tipo_zona: 'residencial'})
      MERGE (sf12:Zona {nombre: 'UD107', tipo_zona: 'residencial'})
      MERGE (sf13:Zona {nombre: 'UD108', tipo_zona: 'residencial'})
      MERGE (sf14:Zona {nombre: 'UD109', tipo_zona: 'residencial'})
      MERGE (sf15:Zona {nombre: 'UD110', tipo_zona: 'residencial'})
      MERGE (sf16:Zona {nombre: 'UD111', tipo_zona: 'residencial'})
      MERGE (sf17:Zona {nombre: 'UD112', tipo_zona: 'residencial'})
      MERGE (sf18:Zona {nombre: 'UD113', tipo_zona: 'residencial'})
      MERGE (sf19:Zona {nombre: 'UD114', tipo_zona: 'residencial'})
      MERGE (sf20:Zona {nombre: 'UD115', tipo_zona: 'residencial'})

      // Nodos de Ciudad Bolivar
      MERGE (cb1:Zona {nombre: 'CascoHistorico', tipo_zona: 'comercial'})
      MERGE (cb2:Zona {nombre: 'LaSabanita', tipo_zona: 'residencial'})
      MERGE (cb3:Zona {nombre: 'VistaHermosa', tipo_zona: 'residencial'})
      MERGE (cb4:Zona {nombre: 'ElPerro', tipo_zona: 'residencial'})
      MERGE (cb5:Zona {nombre: 'Marhuanta', tipo_zona: 'residencial'})
      MERGE (cb6:Zona {nombre: 'AguaSalada', tipo_zona: 'comercial'})
      MERGE (cb7:Zona {nombre: 'Catedral', tipo_zona: 'comercial'})
      MERGE (cb8:Zona {nombre: 'LaParagua', tipo_zona: 'residencial'})
      MERGE (cb9:Zona {nombre: 'ElZanjon', tipo_zona: 'residencial'})
      MERGE (cb10:Zona {nombre: 'ElEden', tipo_zona: 'residencial'})

      // Centros de Distribucion
      MERGE (cd1:CentroDistribucion {nombre: 'CD_PuertoOrdaz'})
      MERGE (cd2:CentroDistribucion {nombre: 'CD_CiudadBolivar'})

      // Relaciones CONECTA dentro de Puerto Ordaz
      MERGE (cd1)-[:CONECTA {tiempo_minutos: 10, trafico_actual: 'medio', capacidad: 5}]->(po1)
      MERGE (po1)-[:CONECTA {tiempo_minutos: 5, trafico_actual: 'bajo', capacidad: 3}]->(po2)
      MERGE (po2)-[:CONECTA {tiempo_minutos: 7, trafico_actual: 'bajo', capacidad: 3}]->(po3)
      MERGE (po3)-[:CONECTA {tiempo_minutos: 6, trafico_actual: 'medio', capacidad: 2}]->(po4)
      MERGE (po4)-[:CONECTA {tiempo_minutos: 8, trafico_actual: 'alto', capacidad: 2}]->(po5)
      MERGE (po5)-[:CONECTA {tiempo_minutos: 4, trafico_actual: 'bajo', capacidad: 3}]->(po6)
      MERGE (po6)-[:CONECTA {tiempo_minutos: 9, trafico_actual: 'medio', capacidad: 2}]->(po7)
      MERGE (po7)-[:CONECTA {tiempo_minutos: 5, trafico_actual: 'bajo', capacidad: 3}]->(po8)
      MERGE (po8)-[:CONECTA {tiempo_minutos: 7, trafico_actual: 'medio', capacidad: 2}]->(po9)
      MERGE (po9)-[:CONECTA {tiempo_minutos: 6, trafico_actual: 'bajo', capacidad: 3}]->(po10)
      MERGE (po10)-[:CONECTA {tiempo_minutos: 8, trafico_actual: 'medio', capacidad: 2}]->(po11)
      MERGE (po11)-[:CONECTA {tiempo_minutos: 4, trafico_actual: 'bajo', capacidad: 3}]->(po12)
      MERGE (po12)-[:CONECTA {tiempo_minutos: 9, trafico_actual: 'medio', capacidad: 2}]->(po13)
      MERGE (po13)-[:CONECTA {tiempo_minutos: 5, trafico_actual: 'bajo', capacidad: 3}]->(po14)
      MERGE (po14)-[:CONECTA {tiempo_minutos: 7, trafico_actual: 'medio', capacidad: 2}]->(po15)
      MERGE (po15)-[:CONECTA {tiempo_minutos: 6, trafico_actual: 'bajo', capacidad: 3}]->(po16)
      MERGE (po16)-[:CONECTA {tiempo_minutos: 8, trafico_actual: 'medio', capacidad: 2}]->(po17)
      MERGE (po17)-[:CONECTA {tiempo_minutos: 4, trafico_actual: 'bajo', capacidad: 3}]->(po18)
      MERGE (po18)-[:CONECTA {tiempo_minutos: 9, trafico_actual: 'medio', capacidad: 2}]->(po19)
      MERGE (po19)-[:CONECTA {tiempo_minutos: 5, trafico_actual: 'bajo', capacidad: 3}]->(po20)

      // Relaciones CONECTA dentro de San Félix
      MERGE (sf1)-[:CONECTA {tiempo_minutos: 6, trafico_actual: 'bajo', capacidad: 3}]->(sf2)
      MERGE (sf2)-[:CONECTA {tiempo_minutos: 7, trafico_actual: 'medio', capacidad: 2}]->(sf3)
      MERGE (sf3)-[:CONECTA {tiempo_minutos: 5, trafico_actual: 'bajo', capacidad: 3}]->(sf4)
      MERGE (sf4)-[:CONECTA {tiempo_minutos: 8, trafico_actual: 'medio', capacidad: 2}]->(sf5)
      MERGE (sf5)-[:CONECTA {tiempo_minutos: 4, trafico_actual: 'bajo', capacidad: 3}]->(sf6)
      MERGE (sf6)-[:CONECTA {tiempo_minutos: 9, trafico_actual: 'medio', capacidad: 2}]->(sf7)
      MERGE (sf7)-[:CONECTA {tiempo_minutos: 5, trafico_actual: 'bajo', capacidad: 3}]->(sf8)
      MERGE (sf8)-[:CONECTA {tiempo_minutos: 7, trafico_actual: 'medio', capacidad: 2}]->(sf9)
      MERGE (sf9)-[:CONECTA {tiempo_minutos: 6, trafico_actual: 'bajo', capacidad: 3}]->(sf10)
      MERGE (sf10)-[:CONECTA {tiempo_minutos: 8, trafico_actual: 'medio', capacidad: 2}]->(sf11)
      MERGE (sf11)-[:CONECTA {tiempo_minutos: 4, trafico_actual: 'bajo', capacidad: 3}]->(sf12)
      MERGE (sf12)-[:CONECTA {tiempo_minutos: 9, trafico_actual: 'medio', capacidad: 2}]->(sf13)
      MERGE (sf13)-[:CONECTA {tiempo_minutos: 5, trafico_actual: 'bajo', capacidad: 3}]->(sf14)
      MERGE (sf14)-[:CONECTA {tiempo_minutos: 7, trafico_actual: 'medio', capacidad: 2}]->(sf15)
      MERGE (sf15)-[:CONECTA {tiempo_minutos: 6, trafico_actual: 'bajo', capacidad: 3}]->(sf16)
      MERGE (sf16)-[:CONECTA {tiempo_minutos: 8, trafico_actual: 'medio', capacidad: 2}]->(sf17)
      MERGE (sf17)-[:CONECTA {tiempo_minutos: 4, trafico_actual: 'bajo', capacidad: 3}]->(sf18)
      MERGE (sf18)-[:CONECTA {tiempo_minutos: 9, trafico_actual: 'medio', capacidad: 2}]->(sf19)
      MERGE (sf19)-[:CONECTA {tiempo_minutos: 5, trafico_actual: 'bajo', capacidad: 3}]->(sf20)
      MERGE (cd1)-[:CONECTA {tiempo_minutos: 20, trafico_actual: 'medio', capacidad: 4}]->(sf1)

      // Relaciones CONECTA dentro de Ciudad Bolívar
      MERGE (cb1)-[:CONECTA {tiempo_minutos: 5, trafico_actual: 'bajo', capacidad: 3}]->(cb2)
      MERGE (cb2)-[:CONECTA {tiempo_minutos: 7, trafico_actual: 'medio', capacidad: 2}]->(cb3)
      MERGE (cb3)-[:CONECTA {tiempo_minutos: 6, trafico_actual: 'bajo', capacidad: 3}]->(cb4)
      MERGE (cb4)-[:CONECTA {tiempo_minutos: 8, trafico_actual: 'medio', capacidad: 2}]->(cb5)
      MERGE (cb5)-[:CONECTA {tiempo_minutos: 4, trafico_actual: 'bajo', capacidad: 3}]->(cb6)
      MERGE (cb6)-[:CONECTA {tiempo_minutos: 9, trafico_actual: 'medio', capacidad: 2}]->(cb7)
      MERGE (cb7)-[:CONECTA {tiempo_minutos: 5, trafico_actual: 'bajo', capacidad: 3}]->(cb8)
      MERGE (cb8)-[:CONECTA {tiempo_minutos: 7, trafico_actual: 'medio', capacidad: 2}]->(cb9)
      MERGE (cb9)-[:CONECTA {tiempo_minutos: 6, trafico_actual: 'bajo', capacidad: 3}]->(cb10)
      MERGE (cd2)-[:CONECTA {tiempo_minutos: 12, trafico_actual: 'medio', capacidad: 4}]->(cb1)

      // Relaciones entre ciudades
      MERGE (po20)-[:CONECTA {tiempo_minutos: 45, trafico_actual: 'alto', capacidad: 2}]->(sf1)
      MERGE (sf20)-[:CONECTA {tiempo_minutos: 60, trafico_actual: 'medio', capacidad: 3}]->(cb1)
      MERGE (po1)-[:CONECTA {tiempo_minutos: 70, trafico_actual: 'alto', capacidad: 2}]->(cb10)
      MERGE (sf10)-[:CONECTA {tiempo_minutos: 50, trafico_actual: 'medio', capacidad: 2}]->(po5)
      MERGE (cb5)-[:CONECTA {tiempo_minutos: 55, trafico_actual: 'bajo', capacidad: 2}]->(sf15)  
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