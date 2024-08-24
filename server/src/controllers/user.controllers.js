import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHanlder from "../../utils/asyncHandler.js";
import User from "../models/user.models.js";

//genreate access and refresh token
async function generateTokens(id) {
  const user = await User.findById(id);
  console.log(user);
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
  return { accessToken, refreshToken };
}

//register user
export const registerUser = asyncHanlder(async (req, res) => {
  console.log("register");
  const { username, email, password, name } = req.body;
  if (!username || !password || !email || !name) {
    return res
      .status(403)
      .json(new ApiError(403, "Please give all the credentials"));
  }

  const regUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  console.log(regUser);
  if (regUser) {
    return res.status(409).json(new ApiError(409, "User already registered"));
  }

  await User.create({
    username,
    name,
    password,
    email,
  });

  const user = await User.find({
    email,
  }).select("-password");
  if (!user) {
    return res.status(403).json(new ApiError(500, "Server error occured"));
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "User created successfully \n Please login with your credentials"
      )
    );
});

//login user
export const login = asyncHanlder(async (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier) {
    return res
      .status(403)
      .json(new ApiError(403, "Please give all the credentials"));
  }

  const user = await User.findOne({
    $or: [{ username: identifier }, { email: identifier }],
  });

  console.log(user);

  if (!user) {
    return res.status(404).json(new ApiError(404, "User not found"));
  }

  const verifyPassword = user.comparePassword(password);
  if (!verifyPassword) {
    return res
      .status(403)
      .json(new ApiError(403, "Wrong credentials \n Enter again"));
  }

  const { refreshToken, accessToken } = await generateTokens(user._id);

  console.log({ refreshToken, accessToken });
  user.refreshToken = refreshToken;
  const options = {
    httpOnly: true,
    secure: true,
  };
  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, "User logged in"));
});

//reresh the access token
export const refreshToken = asyncHanlder((req, res) => {});

//logout user
export const logout = asyncHanlder(async (req, res) => {
  const userid = req.user;
  const user = await User.findByIdAndUpdate(
    userid,
    {
      $unset: { refreshToken: 1 },
    },
    { new: true }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  res
    .status(200)
    .cookie('accessToken',options)
    .cookie('refreshToken',options)
    .json(new ApiResponse(200, "User logged out"));
});
