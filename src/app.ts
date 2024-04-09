import "express-async-errors";
import express, {Express} from "express";
import dotenv from "dotenv";
import {connect} from "./db/connect";
import errorHandlerMiddleware from "./middlewares/errorHandler";
import indexRoute from "./routes/index";


dotenv.config();

const app: Express = express();
const port = process.env.PORT || 6000;


// midllewares
app.use(express.json());


// routing
app.use("/api", indexRoute);


// error
app.use(errorHandlerMiddleware);


app.listen(port, () => {
    connect();
    console.log(`Server is running on port: ${port}`);
})

