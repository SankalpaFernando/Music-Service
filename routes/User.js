const Router = require("express").Router();
const {SignIn,LogIn} = require('../controllers/User');

Router.post("/sign", SignIn);
Router.post("/login",LogIn);


module.exports = Router;
