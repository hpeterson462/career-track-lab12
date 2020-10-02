const pool = require('../utils/pool');

module.exports = class Post {
  user_id;
  photo_url;
  caption;
  tags;

  constructor(row) {
    this.userId = row.user_id;
    this.photoUrl = row.photo_url;
    this.caption = row.caption;
    this.tags = row.tags;
  }

  static async insert(post) {
    const { rows } = await pool.query(
      `INSERT INTO posts (user_id, photo_url, caption, tags)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [post.user_id, post.photo_url, post.caption, post.tags]
    );

    return new Post(rows[0]);
  }
}