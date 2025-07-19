import driver from '../config/neo4j';

// 1. Cierre temporal: desactiva una relación (puedes borrarla o marcarla como cerrada)
export async function closeStreet(origen: string, destino: string) {
  const session = driver.session();
  try {
    // Verificar si la relación existe
    const result = await session.run(
      `
      MATCH (a {nombre: $origen})-[r:CONECTA]->(b {nombre: $destino})
      RETURN r
      `,
      { origen, destino }
    );
    if (result.records.length === 0) {
      return { success: false, message: `La calle de ${origen} a ${destino} no existe.` };
    }
    // Marca la relación como cerrada
    await session.run(
      `
      MATCH (a {nombre: $origen})-[r:CONECTA]->(b {nombre: $destino})
      SET r.cerrada = true
      RETURN a.nombre, b.nombre, r.cerrada
      `,
      { origen, destino }
    );
    return { success: true, message: `Calle de ${origen} a ${destino} cerrada temporalmente` };
  } finally {
    await session.close();
  }
}

// 2. Reapertura de calle
export async function openStreet(origen: string, destino: string) {
  const session = driver.session();
  try {
    // Verificar si la relación existe
    const result = await session.run(
      `
      MATCH (a {nombre: $origen})-[r:CONECTA]->(b {nombre: $destino})
      RETURN r
      `,
      { origen, destino }
    );
    if (result.records.length === 0) {
      return { success: false, message: `La calle de ${origen} a ${destino} no existe.` };
    }
    await session.run(
      `
      MATCH (a {nombre: $origen})-[r:CONECTA]->(b {nombre: $destino})
      REMOVE r.cerrada
      RETURN a.nombre, b.nombre, r.cerrada
      `,
      { origen, destino }
    );
    return { success: true, message: `Calle de ${origen} a ${destino} reabierta` };
  } finally {
    await session.close();
  }
}

// 3. Agregar nueva zona o centro y conexiones
export async function addZone(nombre: string, tipoZona: string, conexiones: { destino: string, tiempo: number, trafico: string, capacidad: number }[]) {  
  const session = driver.session();  
  try {  
    // Usar MERGE para crear el nodo zona y verificar si ya existía  
    const createZoneResult = await session.run(  
      `  
      MERGE (z:Zona {nombre: $nombre})  
      ON CREATE SET z.tipo_zona = $tipoZona  
      RETURN z, CASE WHEN z.tipo_zona IS NULL THEN 'matched' ELSE 'created' END AS status // Invertir la lógica para reflejar si fue creado o emparejado  
      `,  
      { nombre, tipoZona }  
    );  
  
    const status = createZoneResult.records[0].get('status');  
      
    if (status === 'matched') {  
        // Si la zona ya existe, retornar un mensaje específico  
        return { success: false, message: `La zona '${nombre}' ya existe.` };  
    }  
  
    // Crear conexiones (el resto del código permanece igual)  
    for (const { destino, tiempo, trafico, capacidad } of conexiones) {  
      // Verificar si la conexión ya existe para evitar duplicados  
      const checkConnectionResult = await session.run(  
        `  
        MATCH (z:Zona {nombre: $nombre}), (d {nombre: $destino})  
        OPTIONAL MATCH (z)-[r:CONECTA]->(d)  
        RETURN r IS NOT NULL AS connectionExists  
        `,  
        { nombre, destino }  
      );  
  
      if (checkConnectionResult.records[0].get('connectionExists')) {  
        // Si la conexión ya existe, puedes decidir si la actualizas o la ignoras  
        // Por ahora, retornamos un mensaje específico para la conexión  
        return { success: false, message: `La zona '${nombre}' ya existe y ya está conectada a '${destino}'.` };  
      }  
  
      await session.run(  
        `  
        MATCH (z:Zona {nombre: $nombre}), (d {nombre: $destino})  
        CREATE (z)-[:CONECTA {tiempo_minutos: $tiempo, trafico_actual: $trafico, capacidad: $capacidad}]->(d)  
        `,  
        { nombre, destino, tiempo, trafico, capacidad }  
      );  
    }  
    return { success: true, message: `Zona '${nombre}' agregada con conexiones.` }; // Mensaje de éxito solo si se creó  
  } catch (error: any) {  
    // Capturar errores específicos de Neo4j si es necesario, o un error genérico  
    if (error.code === 'Neo.ClientError.Schema.ConstraintValidationFailed') {  
        return { success: false, message: `Error de validación de esquema: ${error.message}` };  
    }  
    return { success: false, message: `Error al agregar la zona: ${error.message}` };  
  } finally {  
    await session.close();  
  }  
}

export async function addCentro(nombre: string, conexiones: { destino: string, tiempo: number, trafico: string, capacidad: number }[]) {
  const session = driver.session();
  try {
    await session.run(
      `CREATE (c:CentroDistribucion {nombre: $nombre})`,
      { nombre }
    );
    for (const { destino, tiempo, trafico, capacidad } of conexiones) {
      await session.run(
        `
        MATCH (c:CentroDistribucion {nombre: $nombre}), (d {nombre: $destino})
        CREATE (c)-[:CONECTA {tiempo_minutos: $tiempo, trafico_actual: $trafico, capacidad: $capacidad}]->(d)
        `,
        { nombre, destino, tiempo, trafico, capacidad }
      );
    }
    return { success: true, message: `Centro ${nombre} agregado con conexiones` };
  } finally {
    await session.close();
  }
}

// 4. Actualizar tiempo de tránsito de una calle
export async function updateStreetTime(origen: string, destino: string, nuevoTiempo: number) {
  const session = driver.session();
  try {
    await session.run(
      `
      MATCH (a {nombre: $origen})-[r:CONECTA]->(b {nombre: $destino})
      SET r.tiempo_minutos = $nuevoTiempo
      RETURN a.nombre, b.nombre, r.tiempo_minutos
      `,
      { origen, destino, nuevoTiempo }
    );
    return { success: true, message: `Tiempo de tránsito actualizado para calle de ${origen} a ${destino}` };
  } finally {
    await session.close();
  }
}