const express = require('express');
const app = express()
const axios = require('axios');
const cheerio = require('cheerio');

app.post('/get-links', async (req, res) => {
    try {
        const query = req.query.search;
        const searchUrl = `https://www.google.com/search?q=${query}`;
        const response = await axios.get(searchUrl);

        if (response.status === 200) {
            const $ = cheerio.load(response.data);
            const links = [];
            $('a[href^="/url"]').each((index, element) => {
                const href = $(element).attr('href');
                const url = decodeURIComponent(href.split('/url?q=')[1].split('&')[0]);
                links.push(url);
            });

            res.json(links);
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


app.listen(3003, () => {
    console.log("Server running on 3033");
})