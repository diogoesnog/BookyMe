const fs = require('fs');

console.log(__dirname);

module.exports.verifyPublicFolders = () => {

    console.log("Verifying Public Directory...");
    let path = `${__dirname}/../app/public`;

    if(!fs.existsSync(path)) {
        console.log("Creating Public Folder");

        fs.mkdirSync(path);
    }
}

module.exports.verifyLogoFolder = () => {
    console.log("Verifying Logo Directory...");
    let path = `${__dirname}/../app/public/logos`;

    if(!fs.existsSync(path)) {
        console.log("Creating Logos Folder");

        fs.mkdirSync(path);
    }
}

module.exports.verifyPicturesFolder = () => {
    console.log("Verifying Pictures Directory...");
    let path = `${__dirname}/../app/public/pictures`;

    if(!fs.existsSync(path)) {
        console.log("Creating Pictures Folder");

        fs.mkdirSync(path);
    }
}

module.exports.verifyPhotosFolder = () => {
    console.log("Verifying Photos Directory...");
    let path = `${__dirname}/../app/public/photos`;

    if(!fs.existsSync(path)) {
        console.log("Creating Photos Folder");

        fs.mkdirSync(path);
    }
}

module.exports.verifyPlantsFolder = () => {
    //
    console.log("Verifying Plants Directory...");
    let path = `${__dirname}/../app/public/plants`;

    if(!fs.existsSync(path)) {
        console.log("Creating Plants Folder");

        fs.mkdirSync(path);
    }
}