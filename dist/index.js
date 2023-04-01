"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cors_2 = require("./config/cors");
const db_1 = __importDefault(require("./config/db"));
const noteRoute_1 = __importDefault(require("./routes/api/v1/noteRoute"));
const userRoute_1 = __importDefault(require("./routes/api/v1/userRoute"));
const errorMiddleware_1 = __importDefault(require("./middleware/errorMiddleware"));
const authMiddleware_1 = __importDefault(require("./middleware/authMiddleware"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
(0, db_1.default)(process.env.DB_URL);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)(cors_2.corsOptions));
app.get('/', (req, res) => {
    res.send("Typescript & express");
});
//api routes middleware
//authentication route
app.use('/api/v1/user', userRoute_1.default);
//authentication middleware
app.use(authMiddleware_1.default);
//notes middleware
app.use('/api/v1/notes', noteRoute_1.default);
//errorhandling middleware
app.use(errorMiddleware_1.default);
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
