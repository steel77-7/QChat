import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
    profilePic: {
      type: String,
    },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    botStatus: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateAccessToken = async function() {
  const res = await jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1h",
    }
  );
  return res;
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = parseInt(process.env.PASSWORD_HASH);
  this.password = await bcryptjs.hash(this.password, salt);
});

userSchema.methods.generateRefreshToken = async function(){
  const res = await jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );
  return res;
};

userSchema.methods.comparePassword = async function(password) {
  const res = await bcryptjs.compare(password, this.password);
  return res;
};

userSchema.methods.decodeToken = function (){
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
};

const User = new mongoose.model("user", userSchema);

export default User;
