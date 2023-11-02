const { addFile, getFile } = require("./service");

const recieveAndStoreJsonFile = async (req, res, next) => {
    const { path } = req.params;
    try {
        const fileAdd = await addFile(path);

        res.status(200).json({
            success: true,
            message: fileAdd
        });
    } catch (e) {
        res.status(400).json({
            success: false,
            message: "400 Bad Request"
        });
    }
    
}

const getJsonFile = async (req, res, next) => {
    const { path } = req.params;

    try {
        console.log("from controller: ", path)
        const data = await getFile(path);

        res.status(200).json({
            success: true,
            data: data ? data : "File is not exist"
        });
    } catch (e) {
        res.status(400).json({
            success: false,
            message: "400 Bad Request"
        });
    }
}

module.exports = {
    recieveAndStoreJsonFile,
    getJsonFile
}