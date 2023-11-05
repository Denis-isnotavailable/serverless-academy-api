const urlSchema = require('./schema');

const postUrlValidator = async (req, res, next) => {
    const { error } = urlSchema.validate(req.body);
    
    if (error) {
        return res.status(400).json({
            error: "Invalid parameter: longUrl",
        });
    }
    next();
} 

module.exports = postUrlValidator;