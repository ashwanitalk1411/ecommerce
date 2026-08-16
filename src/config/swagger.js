const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Role-Based E-Commerce Cart REST API",
      version: "1.0.0",
      description:
        "Machine-test-ready REST API built with Node.js, Express, Sequelize, MySQL, JWT & Joi.",
      contact: {
        name: "API Support"
      }
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Local Development Server"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter your JWT token in the format: Bearer <token>"
        }
      },
      schemas: {
        SuccessResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            statusCode: { type: "integer", example: 200 },
            message: { type: "string", example: "Operation successful" },
            data: { type: "object", nullable: true }
          }
        },
        ErrorResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            statusCode: { type: "integer", example: 400 },
            message: { type: "string", example: "Error message" },
            details: { type: "object", nullable: true }
          }
        },
        User: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "Ashwani" },
            email: { type: "string", example: "user@example.com" },
            role: { type: "string", enum: ["user", "admin"], example: "user" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" }
          }
        },
        Product: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "Pro Gaming Laptop" },
            price: { type: "number", format: "float", example: 1299.99 },
            stock: { type: "integer", example: 15 },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" }
          }
        },
        CartItem: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            cartId: { type: "integer", example: 1 },
            productId: { type: "integer", example: 1 },
            quantity: { type: "integer", example: 2 },
            Product: { $ref: "#/components/schemas/Product" }
          }
        }
      }
    }
  },
  apis: ["./src/routes/*.js", "./src/app.js"]
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
