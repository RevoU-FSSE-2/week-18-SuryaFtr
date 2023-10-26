const express = require('express');
const app = express();
const applyMiddleware = require('./middleware');

const User = require('./models/User');
const { attachPerm, detachPerm } = require('./models/permissions_utils');
const { PermissionMongo } = require('./models/UserMongo');
const todolistrouter = require('./route/todolist');
const controller = require('./controller/usercontroller');
const permissons = require('./permission');
const mongoose = require("mongoose");
const { loginLimiter, todolistLimiter } = require('./middleware/ratelimit')
require('dotenv').config()

const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Successfully connect to MongoDB."))
    .catch(err => console.error("Connection error", err));


app.use((req, res, next) => {
    const allowedOrigins = [
        'https://week-17-suryafaturohman.web.app', 'http://localhost:5173'
    ];
    const origin = req.headers.origin;


    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);

        if (origin === 'https://week-17-suryafaturohman.web.app' || 'http://localhost:5173') {
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        }

        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); 4
    }

    next();
});

applyMiddleware(app);

app.get('/', (req, res) => {
    res.send('Hello, this is backend server!');
});

// register new user
app.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password });
    const userPerm = await PermissionMongo.findOne({ name: "user" });
    await attachPerm(user, userPerm);
    const responseToken = User.generateToken(user);
    res.status(201).json(responseToken);
});

// regular login without session & cookie
app.post("/login", loginLimiter, async (req, res) => {
    const { username, password } = req.body;
    const user = await User.get({ username });
    const is_authenticated = await User.authenticate(username, password);
    if (!user || !is_authenticated) {
        res.status(401).json({ error: "Invalid username or password" });
        return;
    }
    const responseToken = User.generateToken(user);
    res.json(responseToken);
});

// login with session & cookie
app.post("/login_session", loginLimiter, controller.login_session);

// logout session & clearing cookie
app.post("/logout_session", controller.logout_session);

// add/update permission to user
app.post("/attachperm", async (req, res) => {
    const { username, permission } = req.body;
    const perm = await PermissionMongo.findOne({ name: permission });
    const user = await User.get({ username });
    await attachPerm(user, perm);
    res.json({ message: "success" });
});

// remove permission to user 
app.post("/detachperm", async (req, res) => {
    const { username, permission } = req.body;
    const perm = await PermissionMongo.findOne({ name: permission });
    const user = await User.get({ username });
    await detachPerm(user, perm);
    res.json({ message: "success" });
});

// get user info
app.get("/user", permissons.is_authenticated, async (req, res) => {
    const user = req.user;
    res.json(user);
});

// get protected admin user info
app.get("/admin", permissons.is_superuser, async (req, res) => {
    const user = req.user;
    res.json(user);
});

// re-new login token session, without login manually
app.post("/refresh", async (req, res) => {
    const { refreshToken } = req.body;
    const user = await User.parseTokenSafe(refreshToken);
    if (!user) return res.status(401).json({ message: "Invalid token" });
    const responseToken = User.generateToken(user);
    res.json(responseToken);
});

// feature CRUD for todolist 
app.use("/task", todolistLimiter, todolistrouter);

const server = app.listen(port, () => {
    console.log('Example app listening on port ' + port);
});
module.exports = server;