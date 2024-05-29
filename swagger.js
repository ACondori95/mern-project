const swaggerAutogen = require("swagger-autogen");

const doc = {
  info: {
    title: "Store API",
    description:
      "This is an API to be used by stores, to keep track of products, clients, and providers",
  },
  host: "mern-project-o7f1.onrender.com",
  schemes: ["https", "http"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

// this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
