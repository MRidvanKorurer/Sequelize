"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const connect_1 = require("./db/connect");
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const index_1 = __importDefault(require("./routes/index"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 6000;
// midllewares
app.use(express_1.default.json());
// routing
app.use("/api", index_1.default);
// error
app.use(errorHandler_1.default);
app.listen(port, () => {
    (0, connect_1.connect)();
    console.log(`Server is running on port: ${port}`);
});
