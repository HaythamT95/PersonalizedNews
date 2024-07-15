# Personalized News Aggregator with AI

## Technologies Used
- **Backend**: Node.js, Express.js, Dapr, Microservices architecture, Docker.

- **Frontend**:React.js.

- **APIs**: Gemini API for summarized news, APILayer for news.

- **More**: Postman, Integration tests.

## Running the Project
### Prerequisites
- Docker and Docker Compose

- Node.js and npm

### Steps to Run

1. Clone the repository <br> `git clone https://github.com/HaythamT95/PersonalizedNews.git` 

2. Start the Backend <br> `docker-compose up --build`

3. Start the Frontend <br> `cd personalized-news-api` <br> `npm install` <br> `npm start`

4. Running Integration Tests <br> `cd test` <br> `npm install` <br> `npm run test-register` <br> `npm run test-login` <br> `npm run test-addpreferences` <br> `npm run test-updatepreferences` <br> `npm run test-deletepreferences` 
