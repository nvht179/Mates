const pool = require("../config/db");

class UserDB {
  getAllUsersDB = async () => {
    const { rows: users } = await pool.query("SELECT * FROM Person");
    return users;
  };

  createUserDB = async (name, email, password, phone, avatar) => {
    const { rows: user } = await pool.query(
      `
      INSERT INTO Person(name, email, password, phone, avatar)
      VALUES($1, $2, $3, $4, $5)
      returning id, name, email, password, phone, avatar `[
        (name, email, password, phone, avatar)
      ],
    );
    return user[0];
  };

  getUserByEmailDB = async (email) => {
    const { rows: user } = await pool.query(
      `SELECT id, email, password FROM public.person WHERE email = ($1)`,
      [email],
    );
    return user[0];
  };

  getUserByIdDB = async (id) => {
    const { rows: user } = await pool.query(
      `SELECT * FROM public.person WHERE id = ($1)`,
      [id],
    );
    return user[0];
  };

  createUserDB = async (name, email, password, phone, avatar) => {
    const { rows: user } = await pool.query(
      `INSERT INTO public.person (name, email, password, phone, avatar) 
      VALUES ($1, $2, $3, $4, $5)`,
      [name, email, password, phone, avatar],
    );
    return user[0];
  };
}

module.exports = new UserDB();

