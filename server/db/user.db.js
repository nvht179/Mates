const pool = require("../config");

const getAllUsersDB = async () => {
  const { rows: users } = await pool.query("SELECT * FROM Person");
  return users;
};

const createUserDB = async (name, email, password, phone, avatar) => {
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

const getUserByEmailDB = async (email) => {
  const { rows: user } = await pool.query(
    `SELECT id, email, password FROM "Person" WHERE email = ($1)`,
    [email],
  );
  return user[0];
};

module.exports = {
  getAllUsersDB,
  createUserDB,
  getUserByEmailDB,
};
