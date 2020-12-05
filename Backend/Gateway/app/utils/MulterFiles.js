const multer = require('multer');

class MulterFiles {
    constructor(route) {
        this.route = route;
        this.upload = null;
        this._init();
    }

    _init() {
        this.upload = multer({
            storage: multer.diskStorage({
                destination: (req, file, cb) => {
                    cb(null, `./app/temp/${this.route}`)
                },
                filename: (req, file, cb) => {
                    cb(null, `${file.originalname}`);
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