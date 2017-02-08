const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const path = require('path');
const process = require('process');

const app = express();
app.use(express.static(path.join(__dirname , "app/dist/")));
app.listen(process.env.port || 3100);



