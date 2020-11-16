const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const UserRoutes = require('./routes/User');
const MusicRoutes = require('./routes/Music');
const session = require('express-session');
const {decodeToken} = require('./util/middleware');
const boom=require('express-boom');
const cors = require('cors');
require('dotenv').config()

const app =express();
const {MONGO_URI,SESSION_SECRET}=process.env;
app.use(boom());
app.use(cors())
app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true
  }))
  mongoose.connect(MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true})
app.use(bodyParser.json());
app.use(decodeToken);
app.use(UserRoutes);
app.use(MusicRoutes);

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`Server Port ${PORT}`)
})

