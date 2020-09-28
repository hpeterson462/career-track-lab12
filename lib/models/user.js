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
      `INSERT INTO users (email, password_hash, profile_photo_url) VALUES ($1, $2, $3) RETURNING *`,
      [user.email, user.password_hash, user.profile_photo_url]
    );

    return new User(rows[0]);
  }

  toJSON() {
    return {
      id: this.id,
      email: this.email,
      password_hash: this.password_hash,
      profile_photo_url: this.profile_photo_url
    };
  }
};