const User = require("../models/user");

const registerLoginUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    // Check if name and email are entered
    if (!name || !email) {
      return res.json({ error: "Enter name and email" });
    }
    // check email if it exists
    const exist = await User.findOne({ email });
    if (exist) {
      if (name == exist.name) {
        req.session.accessToken = exist.generateJWT();
        return res.json(exist);
      } else {
        return res.json({
          error: "Email already taken",
        });
      }
    }
    const user = await User.create({ name, email });
    req.session.accessToken = user.generateJWT();
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { registerLoginUser };
