const swaggerJsDoc = require('swagger-jsdoc');

// Swagger Configuration
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "BookyMe Gateway",
            description: "BookyMe Gateway connects the client to every micro-service.",
            contact: {
                name: "BreakingCode"
            },
            servers: ["http://localhost:5000"]
        }
        /*host: `${process.env.APP_HOST}:${process.env.APP_PORT}/v1/api`,
        basePath: '/'*/
    },

    apis: [ "./app/routes/api/user.js" ]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;