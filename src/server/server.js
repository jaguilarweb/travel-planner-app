//Config server express
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

app.use(express.static('dist'));

const port = 8080;
app.listen(port, () => {
  console.log("server running...");
  console.log(`running on localhost:${port}`)
});


