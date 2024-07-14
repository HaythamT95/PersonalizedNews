
import axios from "axios"
import chai from "chai"

const expect = chai.expect;
const authUrl = 'http://localhost:5556';
const preferencesUrl = 'http://localhost:5557';

describe('Preference Service Integration Tests', function () {
    it('should update preference fields', async function () {

        const user = {
            email: 'aaabbb@gmail.com',
            password: '123'
        };

        const userData = await axios.post(`${authUrl}/auth/login`, user);

        const preferences = {
            newsCategories: ["Basketball"],
            techUpdates: ["Apple"]
        };

        const response = await axios.patch(`${preferencesUrl}/user/update-preferences/${userData.data.user.user._id}`, preferences);

        expect(response.status).to.equal(200);

        const { newsCategories, techUpdates } = response.data.user.preferences;
        
        //to make sure previous preferences weren't changed
        expect(newsCategories[0]).to.equal("Football");
        expect(techUpdates[0]).to.equal("Samsung");

        expect(newsCategories[1]).to.equal("Basketball");
        expect(techUpdates[1]).to.equal("Apple");

    });
});