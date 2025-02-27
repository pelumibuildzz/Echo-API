const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');
require('dotenv').config({ path: '.env.test' });

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

afterAll(async () => {
    await mongoose.connection.dropDatabase(); // Clear test data
    await mongoose.connection.close();
});

describe('Auth API Endpoints', () => {
    it('should register a new user and return a user object', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'JohnDoe',
                email: 'john.doe@example.com',
                password: 'password'
            });

        expect(res.statusCode).toBe(200);
    });
});

describe('Auth API Endpoints', () => {
    let testUser = {
        name: 'JohnDoe',
        email: 'john.doe@example.com',
        password: 'password'
    };

    beforeAll(async () => {
        // Register a test user before login test
        await request(app).post('/api/auth/register').send(testUser);
    });

    it('should login a user and return a token', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: testUser.email,
                password: testUser.password
            });

        expect(res.statusCode).toBe(200);
    });

    it('should not login with incorrect password', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: testUser.email,
                password: 'wrongpassword'
            });

        expect(res.statusCode).toBe(400);
    });

    it('should not login with unregistered email', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'notfound@example.com',
                password: 'password'
            });

        expect(res.statusCode).toBe(400);
    });
});

