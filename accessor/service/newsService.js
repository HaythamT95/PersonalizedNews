import axios from "axios";
import dotenv from "dotenv"
dotenv.config();

const getCurrentDateMinusTwoDays = () => {
    const currentDate = new Date();

    currentDate.setDate(currentDate.getDate() - 2);

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day} 00:00:00`;
    return formattedDate;
};

const fetchNews = async (category, earliestPublishedDate) => {
    const response = await axios.get("https://api.apilayer.com/world_news/search-news", {
        headers: {
            'apikey': process.env.NEWS_API,
        },
        params: {
            text: category ? category : '',
            language: 'en',
            'earliest-publish-date': earliestPublishedDate,
            number: '2'
        },
    });
    return response.data;
}

export { getCurrentDateMinusTwoDays, fetchNews };