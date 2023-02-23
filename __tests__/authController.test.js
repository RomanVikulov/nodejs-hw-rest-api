const { Unauthorized } = require('http-errors');
const { signup } = require('../controllers/authController');
const service = require('../service/authService');

describe('Auth Controller', () => {
  describe('sign-up process', () => {
    it('should throw an error if the user email already exists', async () => {
      service.signup = jest.fn(data => {
        throw new Unauthorized('Email is already in use');
      });
      const mReq = {
        body: {
          username: 'user',
          email: 'user@gmail.com',
          password: 'user123',
          avatarURL: 'gravatarURL',
        },
      };
      const mRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(data => data),
      };
      const mNext = jest.fn();

      await signup(mReq, mRes, mNext);

      expect(service.signup).rejects.toThrow('Email is already in use');
      expect(mNext).toBeCalledTimes(1);
    });

    it('should register a new user with unique email', async () => {
      service.signup = jest.fn(data => data);
      const mReq = {
        body: {
          username: 'user',
          email: 'user@gmail.com',
          password: 'user2123',
        },
      };
      const mRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(data => data),
      };

      await signup(mReq, mRes);
      expect(201);
      expect(mReq.body).toMatchObject({
        username: 'user',
        email: 'user@gmail.com',
        password: 'user2123',
      });
    });
  });
});