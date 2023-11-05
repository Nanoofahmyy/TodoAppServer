const express = require('express');
const { PrismaClient } = require('@prisma/client');
const app = express();
const prisma = new PrismaClient();
const bodyParser = require('body-parser')
var morgan = require('morgan')
const router = require('./routes/index');
const cors = require('cors')
//const authRoutes = require('./auth');

app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(express.json())
app.use(router)
app.use(bodyParser.urlencoded({ extended: true }));
//app.use('/auth', authRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

module.exports = app