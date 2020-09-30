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


}