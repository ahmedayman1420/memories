// ====== --- ====== > Import Modules & Variables Declaration < ====== --- ====== //
const users = require("../model/user-model");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

// ====== --- ====== > User Methods < ====== --- ====== //

/*
//==// signUp: is the logic of '/signup' api that used to create new user with (name, email, password, age) fields.
the response of this function in success (Sign up Successfully), in failure (show error message).
*/
const signUp = async (req, res) => {
  try {
    let { name, email, password, age } = req.body;

    const oldUser = await users.findOne({ email, isDeleted: false });
    if (!oldUser) {
      const newUser = new users({ name, email, password, age });
      const data = await newUser.save();

      var token = jwt.sign(
        { email: data.email, role: data.role },
        process.env.ENCRYPT_KEY
      );

      res
        .status(StatusCodes.CREATED)
        .json({ Message: "Sign up Successfully", data: { token } });
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ Message: "Email is Already Found" });
    }
  } catch (error) {
    console.log({ error });
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};

/*
//==// signin: is the logic of '/signin' api that used to sign in to website.
the response of this function in success (Sign in Successfully), in failure (show error message).
*/
const signIn = async (req, res) => {
  try {
    let { email, password } = req.body;
    const oldUser = await users.findOne({ email, isDeleted: false });
    if (oldUser) {
      let match = bcrypt.compare(
        password,
        oldUser.password,
        function (err, result) {
          if (result) {
            var token = jwt.sign(
              { email: oldUser.email, role: oldUser.role },
              process.env.ENCRYPT_KEY
            );
            res
              .status(StatusCodes.OK)
              .json({ Message: "Sign in Successfully", Data: { token } });
          } else {
            res
              .status(StatusCodes.BAD_REQUEST)
              .json({ Message: "Incorrect Password !" });
          }
        }
      );
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({ Message: "User Not Found !" });
    }
  } catch (error) {
    console.log({ error });
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};

/*
//==// Update password: is the logic of '/user-update-password' api that used to update user password.
the response of this function in success (User updated Successfully), in failure (show error message).
*/
const updatePassword = async (req, res) => {
  try {
    let { oldPassword, newPassword } = req.body;
    let { email, role } = req.decoded;
    const oldUser = await users.findOne({ email, isDeleted: false });
    if (oldUser) {
      let match = bcrypt.compare(
        oldPassword,
        oldUser.password,
        async function (err, result) {
          if (result) {
            let password = await bcrypt.hash(newPassword, 7);
            const data = await users.updateOne(
              { email, isDeleted: false },
              { password }
            );

            res
              .status(StatusCodes.OK)
              .json({ Message: "Password updated Successfully" });
          } else {
            res
              .status(StatusCodes.BAD_REQUEST)
              .json({ Message: "Incorrect Password !" });
          }
        }
      );
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({ Message: "User Not Found !" });
    }
  } catch (error) {
    console.log({ error });
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};

// ====== --- ====== > Export Module < ====== --- ====== //
module.exports = {
  signUp,
  signIn,
  updatePassword,
};
