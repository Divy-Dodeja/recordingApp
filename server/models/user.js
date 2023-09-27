const mongoose = require("mongoose");
const { Schema } = mongoose;
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
});

userSchema.methods.generateJWT = function () {
  return jwt.sign(
    {
      id: this._id,
      name: this.name,
      email: this.email,
    },
    process.env.JWT_SECRET
  );
};

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
