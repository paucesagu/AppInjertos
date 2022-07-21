export const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "INJERTOS API",
      version: "1.0.0",
      description: "A simple express library API",
    },
    servers: [
      {
        url: "http://localhost:8000",
      },
    ],
  },
  apis: ["./src/routes/**/*.js"],
};
