const fs = require('fs');
const path = require('path');
const axios = require('axios');

async function getFile(pathFromUser) {
    let result = null
    fs.readdirSync("./uploads").find((file) => {
        console.log("file: ", file)
        const currentFile = fs.readFileSync("./uploads/" + file, "utf8");        
        const parsedFile = JSON.parse(currentFile);

        if (parsedFile.name === pathFromUser) {
            result = parsedFile.data;
            return file;
        }        
    });

    return result;
};

async function addFile(pathFromUser) {
    try {
        const { data } = await axios.get(pathFromUser);  

        const isExist = await checkFileOnExisting(pathFromUser, data);
        if (isExist) return "File was rewrited";
        
        const fileName = Date.now().toString();
        const filePath = path.join("./uploads", fileName + ".txt");
        const fileToWrite = {
            name: pathFromUser,
            data
        }
        fs.writeFileSync(filePath, JSON.stringify(fileToWrite));

        return "File was added successfully";
    } catch (e) {
        return "File was not added: " + e.message;
    }
    
};

async function checkFileOnExisting(pathFromUser, data) {
    
    let result = false
    fs.readdirSync("./uploads").find((file) => {
        const currentFile = fs.readFileSync("./uploads/" + file, "utf8");        
        const parsedFile = JSON.parse(currentFile);

        if (parsedFile.name === pathFromUser) {
            const filePath = path.join("./uploads", file);
            parsedFile.data = data;
            fs.writeFileSync(filePath, JSON.stringify(parsedFile));
            result = true;
            return file;
        }        
    });

    return result;
}


module.exports = {
    getFile,
    addFile
}