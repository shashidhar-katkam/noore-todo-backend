import express from "express";
import routes from "./routes/index";
import dotenv from "dotenv";
import cors from "cors";
import compression from "compression";
import bodyParser from "body-parser";

dotenv.config();

const app = express();

app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", routes);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is up and running at: http://localhost:${port}`);
});
