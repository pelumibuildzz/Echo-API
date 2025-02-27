const mongoose = require('mongoose');
const AuthenticationService = require('../services/AuthServices');
const user = require('../models/user');

describe('AuthenticationService', () => {
    let authService;

    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/echodb_test', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        authService = new AuthenticationService();
    });

    afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
    });

    it('should register a new user', async () => {
        const userData = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'password123'
        };
        const result = await authService.registerUser(userData);
        expect(result.success).toBe(true);
        expect(result.data).toHaveProperty('name', 'John Doe');
        expect(result.data).toHaveProperty('email', 'john.doe@example.com');
    });

    // Add more tests for other functions as needed
});