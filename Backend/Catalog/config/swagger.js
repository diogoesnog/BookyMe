const swaggerDoc = require('swagger-jsdoc');

// Swagger Configuration
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "User Micro-Service",
            description: "Handles registration of new users and existing users authentication.",
            servers: ["http://localhost:3000"]
        }
        /*host: `${process.env.APP_HOST}:${process.env.APP_PORT}/v1/api`,
        basePath: '/'*/
    },

    apis: [ "./../app/routes/api/*.js" ]
};

module.exports = swaggerDoc(swaggerOptions);