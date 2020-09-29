const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/user-service');
const { response } = require('../lib/app');

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

  it('logs a user in via POST', async () => {
    const user = await UserService.createUser({
      email: 'h@h.com',
      password: '1234',
      profilePhotoUrl: 'www.photo.com'
    });
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'h@h.com',
        password: '1234',
        profilePhotoUrl: 'www.photo.com'
      });
    expect(response.body).toEqual({
      id: user.id,
      email: 'h@h.com',
      profilePhotoUrl: 'www.photo.com'
    });
  });

  it('verifies user via GET', async () => {
    const agent = request.agent(app);
    await agent
      .post('/api/v1/auth/signup')
      .send({
        email: 'h@h.com',
        password: '1234',
        profilePhotoUrl: 'www.photo.com'
      });
    const response = await agent
      .get('/api/v1/auth/verify');

    expect(response.body).toEqual({
      id: expect.any(String),
      email: 'h@h.com',
      profilePhotoUrl: 'www.photo.com'
    });
    const responseWithoutUser = await request(app)
      .get('/api/v1/auth/verify');

    expect(responseWithoutUser.body).toEqual({
      status: 500,
      message: 'jwt must be provided'
    });
  });
});
