import driver from '../config/neo4j';

export async function cleanDatabase() {
  const session = driver.session();
  try {
    await session.run('MATCH (n) DETACH DELETE n');
    return { success: true, message: 'Base de datos limpiada.' };
  } finally {
    await session.close();
  }
}