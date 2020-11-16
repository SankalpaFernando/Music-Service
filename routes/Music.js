const Router = require("express").Router();
const { upload } = require("../util/upload");
const {GetMusic,PostYoutube,PostUpload} = require('../controllers/Music');
const {userLogIn} = require('../util/middleware')
Router.use(userLogIn);
Router.get("/music",GetMusic);
Router.post("/youtube",PostYoutube);

module.exports = Router;