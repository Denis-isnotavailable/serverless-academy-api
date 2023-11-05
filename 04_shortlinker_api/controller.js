const db = require('./db');
const shortId = require('shortid');
const url = require('url');
require('dotenv').config();

const postUrlController = async (req, res) => {
    try {
        const { longUrl } = req.body;
        const query = await db.query(`SELECT * FROM urls WHERE long_url = $1`, [longUrl]);
        const urlFounded = query.rows[0];
        
        if (urlFounded) {
            throw new Error(`URL is already exist by short link: ${createShortUrl(urlFounded.short_url)}`);
        }

        const short_url = shortId.generate();

        await db.query(
            `INSERT INTO urls (long_url, short_url) VALUES ($1, $2) RETURNING *`, [ longUrl, short_url ]
        );


        res.status(200).json({
            success: true,
            data: {
                short_url: createShortUrl(short_url)
            },
        });
    } catch (e) {
        res.status(500).json({ success: false, message: e.message});
    }
    
}

const showUrlController = async (req, res) => {
    try {
        const { short_url } = req.params;
        const query = await db.query(`SELECT * FROM urls WHERE short_url = $1`, [short_url]);
        const urlFounded = query.rows[0];

        if (urlFounded) {
            return res.status(200).redirect(urlFounded.long_url);
        }

        res.status(404).json({ error: "Page not found" });
    } catch (e) {
        res.status(500).json({ success: false, message: e.message});
    }
}

const createShortUrl = (short_url) => {
    return url.format({
        protocol: process.env.PROTOCOL || 'http',
        hostname: process.env.DB_HOST || 'localhost',
        port: process.env.PORT || 8080,
        pathname: short_url,
    });
}

module.exports = {
    postUrlController,
    showUrlController
}