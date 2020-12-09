//
//  App.js
//  BookyMe - User Service
//
//  Created by Breaking Code on 29/10/2020.
//

require('dotenv').config();

const app = require('./config/server');
const health = require('./config/health');

const PORT = process.env.PORT || process.env.APP_PORT;

app.listen(PORT, () => {

    health.verifyPublicFolders();

    health.verifyLogoFolder();
    health.verifyPhotosFolder();
    health.verifyPicturesFolder();
    health.verifyPlantsFolder();

    console.log(`Magic Port ${PORT}`)
});