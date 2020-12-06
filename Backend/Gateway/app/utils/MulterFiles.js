const multer = require('multer');
const {v4 : uuid} = require('uuid')
const path = require('path');

class MulterFiles {
    constructor(route, customPath) {
        this.route = route;
        this.upload = null;
        this.customPath = customPath;
        this._init();
    }

    _init() {
        this.upload = multer({
            dest: this.customPath !== undefined ? `./app/uploads/${this.route}/${this.customPath}` : `./app/uploads/${this.route}`,
            storage: multer.diskStorage({
                destination: (req, file, cb) => {
                    let path = this.customPath !== undefined ? `./app/uploads/${this.route}/${this.customPath}` : `./app/uploads/${this.route}`
                    cb(null, path);
                },
                filename: (req, file, cb) => {
                    let newName =  uuid();
                    let extension = path.extname(file.originalname);
                    console.log("Extension Name", path.extname(file.originalname));
                    console.log("Renaming For", newName);
                    cb(null, `${newName}${extension}`);
                }
            }),
            fileFilter: (req, file, cb) => {
                if(file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
                    cb(null, true)
                } else {
                    cb(null, false);
                    return cb(new Error("Only .png, .jpg and .jpeg formats allowed"));
                }
            }
        });
    }

    getUploader() {
        return this.upload;
    }
}


module.exports = MulterFiles;