const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/authModel");

exports.userRegister = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const findUser = await User.findOne({ email });
    if (findUser)
      return res.status(200).json({ message: "User Already Resgister." });

    const salt = await bcrypt.genSalt(10); // this add string in the password with the 10 rounds
    const hashPass = await bcrypt.hash(password, salt); //it encrypt the password to hash

    const user = await User.create({
      name,
      email,
      password: hashPass,
      role,
    });
    res.status(201).json({
      success: true,
      message: "User Successfully Register.",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user)
        return res
          .status(404)
          .json({ message: "User Not Found. Please Register first." });

      const isMatching = await bcrypt.compare(password, user.password);
      if (!isMatching)
        return res.status(401).json({ message: "Invalid Credentials." });

      //this is for token generate according to the role.
      const token =  jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWTSECRET,
        { expiresIn: "2hr" }
      );

      res.status(200).json({
        success: true,
        message: "Successfully logged in.",
        token,
        role: user.role,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
