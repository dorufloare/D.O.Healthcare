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

app.put('/updateExcluded/:id/:excluded', (req, res) => {
  const { id, excluded } = req.params;
  console.log("EXCLUDE " + id + " " + excluded);
  const query = `
    UPDATE account
    SET excluded = ?
    WHERE id = ?;
  `;

  db.query(query, [excluded, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to update the excluded column' });
    }

    return res.status(200).json({ message: 'Excluded column updated successfully' });
  });
});

app.put('/updateAge/:id/:age', (req, res) => {
  const { id, age } = req.params;
  console.log("AGE " + id + " " + age);
  const query = `
    UPDATE account
    SET age = ?
    WHERE id = ?;
  `;

  db.query(query, [age, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to update the age column' });
    }

    return res.status(200).json({ message: 'Age column updated successfully' });
  });
});

app.put('/updateHeight/:id/:height', (req, res) => {
  const { id, height } = req.params;
  console.log("height " + id + " " + height);
  const query = `
    UPDATE account
    SET height = ?
    WHERE id = ?;
  `;

  db.query(query, [height, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to update the height column' });
    }

    return res.status(200).json({ message: 'height column updated successfully' });
  });
});

app.put('/updateWeight/:id/:weight', (req, res) => {
  const { id, weight } = req.params;
  console.log("weight " + id + " " + weight);
  const query = `
    UPDATE account
    SET weight = ?
    WHERE id = ?;
  `;

  db.query(query, [weight, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to update the weight column' });
    }

    return res.status(200).json({ message: 'weight column updated successfully' });
  });
});


app.get("/getUser", (req, res) => {
  res.send(req.user);
});

app.get('/getUserAge/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT age FROM account WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to retrieve age' });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const age = result[0].age;
    return res.status(200).json({ age });
  });
});

app.get('/getUserHeight/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT height FROM account WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to retrieve height' });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const height = result[0].height;
    return res.status(200).json({ height });
  });
});

app.get('/getUserWeight/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT weight FROM account WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to retrieve weight' });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const weight = result[0].weight;
    return res.status(200).json({ weight });
  });
});

app.get('/getUserExcluded/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT excluded FROM account WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to retrieve excluded' });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const excluded = result[0].excluded;
    return res.status(200).json({ excluded });
  });
});

app.listen(3001, () => {
  console.log("Server started on port 3001");
});