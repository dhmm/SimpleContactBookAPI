const express = require('express');
const cors = require('cors');
const app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

const port = 8000;

app.use(cors());

var responses = require('./responses').responses;

var router = express.Router();
require('./routes')(router,responses , upload);
app.use(router);
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.listen(port , () => {    
    console.log(`Server started at port : ${port}`);
})