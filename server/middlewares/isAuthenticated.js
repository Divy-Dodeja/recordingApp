const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  const accessToken = req.session.accessToken;
  if (accessToken) {
    jwt.verify(
      accessToken,
      process.env.JWT_SECRET,
      async (err, decodedToken) => {
        if (err) {
          req.user = null;
          return res.json({ error: "not logged in" });
        } else {
          req.user = decodedToken;
          next();
        }
      }
    );
  } else {
    return res.json({ error: "not logged in" });
  }
};

module.exports = {authentication}
