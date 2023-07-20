const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

const client = {
  query: async (text, params) => {
    const connection = await pool.connect();
    try {
      // console.log(text, params);
      return connection.query(text, params);
    } catch (error) {
      console.log(error.message);
      throw error;
    } finally {
      connection.release();
    }
  },
};

module.exports = client;
