const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/user-service');

describe('user routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'))
  });

  it('signs up a user via POST', async () => {
    const response = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        id: expect.any(String),
        email: 'h@h.com',
        password: '1234',
        profilePhotoUrl: 'www.photo.com'
      });
    expect(response.body).toEqual({
      id: expect.any(String),
      email: 'h@h.com',
      profilePhotoUrl: 'www.photo.com'
    });
  });
});
