const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8001;

app.use(cors());
app.use(express.json());
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("Mongodb database connection established successfully!!");
})

const exercisesRouter = require('./routes/exercises');

const usersRouter = require('./routes/users');

app.get("/",(req,res)=>res.status(200).send("HELLO WORLD!"));

app.use('/exercises', exercisesRouter);

app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
})

