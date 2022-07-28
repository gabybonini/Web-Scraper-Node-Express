const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

site = 'https://www.news.sky.com'

try {
    axios(site).then(res => {
        const data = res.data
        const $ = cheerio.load(data);

        let content = []

        $('.sdc-site-tile__headline', data).each(function () {
            const title = $(this).text();
            const url = $(this).find('a').attr('href');

            content.push({
                title,
                url,
            });

            app.get('/', (req, res) => {
                res.json(content);
            });
        });
    });
} catch(error){
    console.log(error, error.message)
}

app.listen(PORT, () => {
    console.log(`server running on PORT :${PORT}`)})