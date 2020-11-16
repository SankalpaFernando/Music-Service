const User = require("../models/User");
const { hashPassword, comparePassword } = require("../util/hash");

const _ = require("lodash");
const SignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.find()
      .where("email")
      .equals(email)
      .select("+password");
    if (_.isEmpty(user)) {
      const passwordHash = await hashPassword(password);
      const user = User({ email, password: passwordHash });
      const u=await user.save();
      req.session.uid = u._id;
        req.session.logIn = true;
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch {
    res.json({ success: false });
  }
};
const LogIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.find()
      .where("email")
      .equals(email)
      .select("+password");
    if (!_.isEmpty(user)) {
      if (await comparePassword(password, user[0].password)) {
        console.log(user);
        req.session.uid = user._id;
        req.session.logIn = true;
        req.json({ success: true });
        return;
      }
      res.json({ success: false });
      return;
    }
    res.json({ success: false });
    return;
  } catch {
    res.json({ success: false });
  }
};

module.exports = { SignIn, LogIn };
