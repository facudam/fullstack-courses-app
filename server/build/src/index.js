"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const crypto_1 = __importDefault(require("crypto"));
const authors_routes_1 = __importDefault(require("./routes/authors.routes"));
const course_languages_routes_1 = __importDefault(require("./routes/course_languages.routes"));
const course_types_routes_1 = __importDefault(require("./routes/course_types.routes"));
const technologies_routes_1 = __importDefault(require("./routes/technologies.routes"));
const courses_routes_1 = __importDefault(require("./routes/courses.routes"));
const rating_routes_1 = __importDefault(require("./routes/rating.routes"));
const comments_routes_1 = __importDefault(require("./routes/comments.routes"));
const creadoPor_routes_1 = __importDefault(require("./routes/creadoPor.routes"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const config_1 = require("./config");
const app = (0, express_1.default)();
app.use(express_1.default.json()); //Transformamos la req.body en json
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
const secret = crypto_1.default.randomBytes(64).toString('hex');
app.use((0, express_session_1.default)({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}));
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    credentials: true,
}));
app.get('/', (_req, res) => { res.send('inicio'); });
app.use(authors_routes_1.default);
app.use(course_languages_routes_1.default);
app.use(course_types_routes_1.default);
app.use(technologies_routes_1.default);
app.use(courses_routes_1.default);
app.use(rating_routes_1.default);
app.use(comments_routes_1.default);
app.use(creadoPor_routes_1.default);
app.use(users_routes_1.default);
app.listen(config_1.PORT, () => {
    console.log('Server is listening on port', config_1.PORT);
});
