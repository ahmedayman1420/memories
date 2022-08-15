// ====== --- ====== > Import Modules & Variables Declaration < ====== --- ====== //
const users = require("../model/user-model");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const { generatePassword } = require("./services");

// ====== --- ====== > User Methods < ====== --- ====== //

/*
//==// signUp: is the logic of '/signup' api that used to create new user with (name, email, password, age) fields.
the response of this function in success (Sign up Successfully), in failure (show error message).
*/
const signUp = async (req, res) => {
  try {
    let { name, email, password, confirmPassword } = req.body;

    const oldUser = await users.findOne({ email, isDeleted: false });
    if (!oldUser) {
      if (password === confirmPassword) {
        const newUser = new users({ name, email, password });
        const data = await newUser.save();

        var token = jwt.sign(
          { name: data.name, email: data.email, role: data.role },
          process.env.ENCRYPT_KEY
        );

        res.status(StatusCodes.CREATED).json({
          message: "Sign up Successfully",
          data: { token, user: newUser },
        });
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Password not matched confirm passwords" });
      }
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Email is Already Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
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
              { name: oldUser.name, email: oldUser.email, role: oldUser.role },
              process.env.ENCRYPT_KEY
            );
            res.status(StatusCodes.OK).json({
              message: "Sign in Successfully",
              data: { token, user: oldUser },
            });
          } else {
            res
              .status(StatusCodes.BAD_REQUEST)
              .json({ message: "Incorrect Password !" });
          }
        }
      );
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({ message: "User Not Found !" });
    }
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

/*
//==// Google signin: is the logic of '/google' api that used to continue with google.
the response of this function in success (User login with google success), in failure (show error message).
*/
const googleSignIn = async (req, res) => {
  try {
    let { name, email } = req.body;
    const oldUser = await users.findOne({ email, isDeleted: false });
    if (oldUser) {
      var token = jwt.sign(
        { name: oldUser.name, email: oldUser.email, role: oldUser.role },
        process.env.ENCRYPT_KEY
      );
      res.status(StatusCodes.OK).json({
        message: "Sign in Successfully with Google",
        data: { token, user: oldUser },
      });
    } else {
      const randomPassword = generatePassword();
      const newUser = new users({ name, email, password: randomPassword });
      const data = await newUser.save();

      var token = jwt.sign(
        { name: data.name, email: data.email, role: data.role },
        process.env.ENCRYPT_KEY
      );

      res.status(StatusCodes.CREATED).json({
        message: "Sign up Successfully with Google",
        data: { token, user: newUser },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
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
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

// ====== --- ====== > Export Module < ====== --- ====== //
module.exports = {
  signUp,
  signIn,
  googleSignIn,
  updatePassword,
};
