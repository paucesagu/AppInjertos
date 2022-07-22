import express from "express";
import cors from "cors";
import morgan from "morgan";

import injertosRoutes from "./routes/injertosRoutes";
import usuarioRoutes from "./routes/usuariosRoutes";
import autenticacionRoutes from "./routes/autenticacionRoutes";
//import reentrenarRoutes from "./routes/reentrenarRoutes";

import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import { options } from "./swaggerOptions";

const app = express();
const specs = swaggerJSDoc(options);

app.set("port", 8000);

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(autenticacionRoutes);
app.use(injertosRoutes);
app.use(usuarioRoutes);
//app.use(reentrenarRoutes);

app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));

export default app;
