const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node.js API",
      version: "1.0.0",
      description: "A simple Express API",
    },
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "x-auth-token",
          description: "Custom API key header for JWT",
        },
      },
      schemas: {
        Product: {
          type: "object",
          required: ["name", "price"],
          properties: {
            id: {
              type: "string",
              description: "Product ID",
            },
            name: {
              type: "string",
              description: "Product name",
            },
            price: {
              type: "number",
              description: "Product price",
            },
          },
        },
        Category: {
          type: "object",
          required: ["name"],
          properties: {
            id: {
              type: "string",
              description: "Category ID",
            },
            name: {
              type: "string",
              description: "Category name",
            },
          },
        },
        Order: {
          type: "object",
          required: ["user", "products"],
          properties: {
            id: {
              type: "string",
              description: "Order ID",
            },
            user: {
              type: "string",
              description: "User ID",
            },
            products: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  productId: {
                    type: "string",
                    description: "Product ID",
                  },
                  quantity: {
                    type: "number",
                    description: "Quantity of the product",
                  },
                },
              },
            },
            orderDate: {
              type: "string",
              format: "date-time",
              description: "Date when the order was created",
            },
          },
        },
      },
    },
    security: [
      {
        ApiKeyAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;