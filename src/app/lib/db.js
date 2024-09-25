import mysql from 'mysql2/promise';

async function createDatabaseIfNotExists() {
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD
  });

  try {
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.MYSQL_DATABASE}\``);
  } catch (error) {
    console.error("Error creating database:", error);
  } finally {
    await connection.end();
  }
}

export default async function executeQuery({ query, values }) {
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST ,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD
  });

  try {
    // Ensure the database exists before setting it in the config
    await createDatabaseIfNotExists();

    const [rows] = await connection.execute(query, values);
    return rows;
  } catch (error) {
    console.error("Error executing query:", error);
    return { error };
  } finally {
    await connection.end();
  }
}
