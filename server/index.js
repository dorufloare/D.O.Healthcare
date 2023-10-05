const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const db = require("./db");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSession({secret:'mySecretKey', resave:false, saveUninitialized:false}));

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(cookieParser('mySecretKey'));

app.use(passport.initialize())
app.use(passport.session());

require("./passportConfig")(passport);

app.get('/', (req, res) => {
  res.send('Hello');
});

app.post('/register', (req, res) => {
  console.log("REGISTER");

  const username = req.body.username;
  const password = req.body.password;

  const query = "INSERT INTO account (`username`, `password`) VALUES (?, ?)";
  const query2 = "SELECT * FROM account WHERE username = ?";

  db.query(query2, [username], (err, result) => {
    if (err) {throw err; }
    if (result.length > 0) {
      res.send({message: "Username already exists"});
    }
    if (result.length === 0) {
      const hashedPassword = bcrypt.hashSync(password, 10);
      db.query(query, [username, hashedPassword], (err, result) => {
        if (err) {throw err;}
        res.send({message:"user created"});
      });
    }
  });
});

app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {throw err;}
    if (!user) {res.send("Nu exista utilizatorul");}
    if (user) {
      req.login(user, (err)=> {
        if (err) {throw err;}
        res.send("User logged in");
        console.log(user);
      })
    }
  })(req, res, next);
});

app.post('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});
app.get("/getUser", (req, res) => {
  res.send(req.user);
});


app.listen(3001, () => {
  console.log("Server started on port 3001");
});