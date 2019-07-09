require("dotenv").config({ path: __dirname + "/../.env" });
const express = require("express");
const session = require("express-session");
const checkForSession = require('./middlewares/checkForSession')
const sc = require('./controller/swagController')
const ac = require('./controller/authController')
const cc = require('./controller/cartController')
const schC = require('./controller/searchController')

const app = express();

const { SERVER_PORT, SESSION_SECRET } = process.env;

app.use(express.json());
app.use(express.static(__dirname + '/../build'))

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);

app.use(checkForSession)


app.post('/api/login', ac.login)
app.post('/api/register', ac.register)
app.post('/api/signout', ac.signout)
app.get('/api/user', ac.getUser)

app.get('/api/swag', sc.read)

app.post('/api/cart/checkout',cc.checkout)
app.post('/api/cart/:id',cc.add)
app.delete('/api/cart/:id',cc.delete)

app.get('/api/search', schC.search)


app.listen(SERVER_PORT, () => {
  console.log(`listening on port ${SERVER_PORT}`);
});
