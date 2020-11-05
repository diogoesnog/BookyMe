//
//  App.js
//  BookyMe - User Service
//
//  Created by Breaking Code on 29/10/2020.
//

require('dotenv').config();

const app = require('./config/server');

const PORT = process.env.PORT || process.env.APP_PORT;

app.listen(PORT, () => console.log(`Magic Port ${PORT}`));