import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options ={
    swaggerDefinition:{
        openapi:"3.0.0",
        info:{
            title: "Opinions Hub web API - Backend",
            version: "1.0.0",
            description: "API gestión de opiniones similar a las publicaciones de Facebook, con funcionalidades específicas centradas en la interacción y expresión de opiniones por parte de los usuarios.",
            contact:{
                name: "Anthony Escobar",
                email: "anthonyescobarponce@outlook.com"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3001/publicationsHubManager/v1"
            }
        ]
    },
    apis:[
        "./src/auth/auth.routes.js",
        "./src/user/user.routes.js",
        "./src/category/category.routes.js",
        "./src/publication/publication.routes.js",
        "./src/comment/comment.routes.js"
    ]
}

const swaggerDocs = swaggerJSDoc(options)

export { swaggerDocs, swaggerUi}