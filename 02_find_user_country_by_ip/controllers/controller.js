const findCountry = require('../db');


const getRequest = async (req, res, next) => {
    const { ip } = req.body;

    try {
        const data = await findCountry(ip);

        console.log("result: ", data);
        
        res.status(200).json({
            success: true,
            data
        });
    } catch (e) {
        res.status(400).json({ success: false, message: "IP is not found" });
    } 
}

module.exports = getRequest;