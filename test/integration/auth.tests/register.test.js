import axios from "axios"
import chai from "chai"

const expect = chai.expect;
const authUrl = 'http://localhost:5556';

describe('Register Service Integration Tests', function () {
    it('should register a new user', async function () {
        const user = {
            firstName: 'AAA',
            lastName: 'BBB',
            email: 'aaabbb@gmail.com',
            password: '123'
        };

        const response = await axios.post(`${authUrl}/auth/register`, user);
        expect(response.status).to.equal(200);
    });

    it('should not register a user with an empty field', async function () {
        const user = {
            firstName: '',
            lastName: 'BBB2',
            email: 'aaabbb2@gmail.com',
            password: '123'
        };

        try {
            await axios.post(`${authUrl}/auth/register`, user);
        } catch (error) {
            expect(error.response.status).to.equal(400);
            expect(error.response.data).to.have.property('error', 'firstName is required');
        }
    });
});