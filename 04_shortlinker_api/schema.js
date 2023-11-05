const Joi = require('joi');

const urlScheema = Joi.object({
    longUrl: Joi.string().uri().required(),
});

module.exports = urlScheema;