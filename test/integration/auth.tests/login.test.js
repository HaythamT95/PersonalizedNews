import axios from "axios"
import chai from "chai"

const expect = chai.expect;
const authUrl = 'http://localhost:5556';

describe('Login Service Integration Tests', function () {
    it('should retrieve user fields', async function () {
        const user = {
            firstName: 'AAA',
            lastName: 'BBB',
            email: 'aaabbb@gmail.com',
            password: '123'
        };
        const response = await axios.post(`${authUrl}/auth/login`, user);
        expect(response.status).to.equal(200);
        expect(response.data.user.user.firstName).to.equal(user.firstName);
        expect(response.data.user.user.lastName).to.equal(user.lastName);
        expect(response.data.user.user.email).to.equal(user.email);
    });

    it('should return not found', async function () {
        const user = {
            email: 'not_registered@gmail.com',
            password: '123'
        };
        try {
            await axios.post(`${authUrl}/auth/login`, user);
        } catch (error) {
            expect(error.response.status).to.equal(404);
            expect(error.response.data).to.have.property('error', 'User not found');
        }
    });

    it('should return wrong password', async function () {
        const user = {
            email: 'aaabbb@gmail.com',
            password: '1'
        };
        try {
            await axios.post(`${authUrl}/auth/login`, user);
        } catch (error) {
            expect(error.response.status).to.equal(401);
            expect(error.response.data).to.have.property('error', 'Wrong password');
        }
    });
});