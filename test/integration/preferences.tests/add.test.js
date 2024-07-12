import axios from "axios"
import chai from "chai"

const expect = chai.expect;
const authUrl = 'http://localhost:5556';
const preferencesUrl = 'http://localhost:5557';

describe('Preference Service Integration Tests', function () {
    it('should add preference fields', async function () {

        const user = {
            email: 'aaabbb@gmail.com',
            password: '123'
        };
        const userData = await axios.post(`${authUrl}/auth/login`, user);

        const preferences = {
            newsCategories: ["Football"],
            techUpdates: ["Samsung"]
        };

        const response = await axios.post(`${preferencesUrl}/user/add-preferences/${userData.data.user._id}`, preferences);

        expect(response.status).to.equal(200);

        await new Promise(resolve => setTimeout(resolve, 10)); //Added this to make sure data been added to db because it is implemented in pub/sub

        const userPreferences = await axios.post(`${authUrl}/auth/login`, user);

        const { newsCategories, techUpdates } = userPreferences.data.user.preferences;
        expect(newsCategories[0]).to.equal("Football");
        expect(techUpdates[0]).to.equal("Samsung");

    });
});