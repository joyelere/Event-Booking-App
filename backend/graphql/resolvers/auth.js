const bcrypt = require("bcrypt");
const User = require("../../models/user");
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("../../helpers/config");



module.exports = {
  createUser: async (args) => {
    try {
      // Check if a user with the provided email already exists
      const existinguser = await User.findOne({ email: args.userInput.email });

      if (existinguser) {
        throw new Error("User already exists with that email");
      }
      const hashedpassword = await bcrypt.hash(args.userInput.password, 12);
      const user = new User({
        email: args.userInput.email,
        password: hashedpassword,
      });
      const result = await user.save();
      console.log(result);
      return { ...result._doc, password: null };
    } catch (err) {
      throw err;
    }
  },

  login: async (args) => {

    const user = await User.findOne({email: args.email});

    if(!user){
      throw new Error("user doesn't exist");
    }

    const isEqual = await bcrypt.compare(args.password,user.password);

    if(!isEqual){
      throw new Error("Incorrect password. Please try again");
    }

    const token = jwt.sign({ userId: user.id, email: user.email },JWT_SECRET,{
      expiresIn: '1h'
    });

    return { userId:user.id, token: token, tokenExpiration: 1 };

  }
};
