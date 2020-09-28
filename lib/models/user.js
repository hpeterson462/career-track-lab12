const pool = require('../utils/pool');

module.exports = class User {
  id;
  email;
  password_hash;
  profile_photo_url;

  constructor(row) {
    this.id = row.id;
    this.email = row.email;
    this.password_hash = row.password_hash;
    this.profile_photo_url = row.profile_photo_url;
  }

  static async insert(user) {
    const { rows } = await pool.query(
      `INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *`,
      [user.email, user.password_hash]
    );

    return new User(rows[0]);
  };
};