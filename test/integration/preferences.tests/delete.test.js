
import axios from "axios"
import chai from "chai"

const expect = chai.expect;
const authUrl = 'http://localhost:5556';
const preferencesUrl = 'http://localhost:5557';

describe('Preference Service Integration Tests', function () {
    it('should delete preference fields', async function () {

        const user = {
            email: 'aaabbb@gmail.com',
            password: '123'
        };

        const userData = await axios.post(`${authUrl}/auth/login`, user);

        const { newsCategories: oldCategories, techUpdates: oldTechs } = userData.data.user.user.preferences;

        const preferences = {
            type: "tech",
            preferences: ["Apple"]
        };

        const response = await axios.delete(`${preferencesUrl}/user/delete-preferences/${userData.data.user.user._id}`, { data: preferences });

        expect(response.status).to.equal(200);

        const { newsCategories, techUpdates } = response.data.user.preferences;

        //to make sure previous preferences weren't changed
        expect(newsCategories[0]).to.equal(oldCategories[0]);
        expect(techUpdates[0]).to.equal(oldTechs[0]);

        expect(newsCategories[1]).to.equal(oldCategories[1]);

    });
});