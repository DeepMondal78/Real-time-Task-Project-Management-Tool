const request = require('supertest');
const app = require('./server');

describe('Auth Service API Tests', () => {
    it('should return health check status 200', async () => {
        const res = await request(app).get('/auth/health');
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toBe('Auth Service is running');
    });
});