const swaggerAutogen = require("swagger-autogen");

const doc = {
  info: {
    title: "Users API",
    description: "User API",
  },
  host: "localhost:8000",
  schemes: ["https", "http"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

// this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
