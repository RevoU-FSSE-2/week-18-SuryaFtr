const User = require('../models/User');
const cache = require('memory-cache');

exports.login_session = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.get({ username: username });
  const isAuth = await User.authenticate(user.username, password);
  console.log(isAuth);
  if (!user || !isAuth) {
    res.status(401).json({ error: "Invalid username or password" });
    return;
  }
  const { accesToken, expireAt, refreshToken, refreshExpireAt } = User.generateToken(user);
  res.cookie('accesToken', accesToken, { httpOnly: true, expire: expireAt });
  res.cookie('refreshToken', refreshToken, { httpOnly: true, expire: refreshExpireAt });
  res.json({ message: "You Have Successfully Login!" });
};

exports.logout_session = async (req, res) => {
  res.clearCookie('accesToken');
  res.clearCookie('refreshToken');
  res.json({ message: "You Has Logout!" });
};