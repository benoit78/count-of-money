const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const googleStrategy = require("./config/passport-setup");
const passport = require("passport");
const session = require('express-session');

const helmet = require("helmet");
const morgan = require("morgan");
const cors = require('cors');

const app = express();

require('./config/passport')(passport);

app.use(cors());

const userRouter = require("./routes/userRoutes");
const feedRouter = require("./routes/feedRoutes");
const cryptoRouter = require("./routes/cryptoRoutes");

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());


app.use(helmet());

morgan.token("idUser", (req, _res, _next) =>
req.user ? req.user._id : "no id"
);
morgan.token("currentTime", (_req, _res, _next) =>
new Date().toLocaleString()
);
morgan.token("body", (req, _res, _next) => {
// eslint-disable-next-line no-unused-vars
// const { password, passwordConfirm, ...body } = req.body;
// if (body.projectPhases) body.projectPhases = [];

// return JSON.stringify(body);
});
morgan.token("query", (req, _res, _next) => JSON.stringify(req.query));
morgan.token("endpoint", (req, _res, _next) => `${req.baseUrl}${req.path}`);
app.use(
morgan("-----------------------------------------------------------")
);
app.use(morgan("dev"));
app.use(morgan("endpoint : :endpoint"));
app.use(morgan("body : :body"));
app.use(morgan("query : :query"));
app.use(
morgan(
  "id_user : :idUser - current_time : :currentTime\n-----------------------------------------------------------\n"
)
);


app.use(session({
  secret: 'k7^gzdq!z8-e!qog&*7hj7+)wk0e9+9x&*9z%$h^pt0x-u^888',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Define routes
// app.use("/api/auth", authRouter)
// app.get('/yoo', (req, res) => res.json({msg: 'yoo'}));
app.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect(`http://localhost:3000/`);
  });

app.use('/api/users', userRouter);
app.use('/api/feed', feedRouter);
app.use('/api/crypto', cryptoRouter);

// DB Config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
