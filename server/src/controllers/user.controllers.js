import ApiResponse from "../../utils/ApiResponse.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHanlder from "../../utils/asyncHandler.js";
import User from "../models/user.models.js";
import jwt from "jsonwebtoken";
//genreate access and refresh token
async function generateTokens(id) {
  const user = await User.findById(id);
  //console.log(user);
  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();
  return { accessToken, refreshToken };
}

//register user
export const registerUser = asyncHanlder(async (req, res) => {
  console.log("register");
  const { username, email, password } = req.body;
  if (!username || !password || !email) {
    return res
      .status(403)
      .json(new ApiResponse(403, "Please give all the credentials"));
  }

  const regUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  console.log(regUser);
  if (regUser) {
    return res.status(409).json(new ApiResponse(409, "User already registered"));
  }

  await User.create({
    username,
    password,
    email,
  });

  const user = await User.find({
    email,
  }).select("-password");
  if (!user) {
    return res.status(403).json(new ApiResponse(500, "Server error occured"));
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
  console.log(identifier, password);
  if (!identifier) {
    return res
      .status(403)
      .json(new ApiResponse(403, "Please give all the credentials"));
  }

  const user = await User.findOne({
    $or: [{ username: identifier }, { email: identifier }],
  });

  console.log(user);

  if (!user) {
    return res.status(404).json(new ApiResponse(404, "User not found"));
  }

  const verifyPassword = await user.comparePassword(password);
  if (!verifyPassword) {
    return res.status(403).json(new ApiResponse(405, "Wrong credentials"));
  }

  console.log(verifyPassword);

  const { refreshToken, accessToken } = await generateTokens(user._id);
  //making a new refresh token for everytime a user logs in and then storing it in the db
  user.refreshToken = refreshToken;
  await user.save();

  console.log({ refreshToken, accessToken });
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

export const getUser = asyncHanlder(async (req, res) => {
  // console.log('refresh token',req.cookies)
  //console.log(req.user)
  const user = await User.findById(req.user).select("-password -refreshToken");
  //console.log(user)
  if (!user) return res.status(404).json(new ApiResponse(404, "User not found"));

  return res.status(200).json(new ApiResponse(200, { user }));
});

//refresh the access token
export const refreshToken = asyncHanlder(async (req, res) => {
  // console.log('refreshTokne')
  // console.log('refresh token',req.cookies)
  //const refreshToken = req.cookies.refreshToken;
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json(new ApiResponse(401, "Token not present"));
  }
//console.log(refreshToken)
  const user = await User.find({ refreshToken });
  if (!user) return res.status(404).json(new ApiResponse(404, "User not found"));
  console.log(refreshToken);
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) {
        console.log('error')
        return res.status(500).json(new ApiResponse(500, err));
      }

      const user = await User.findById(decoded._id);
      if (!user)
        return res.status(404).json(new ApiResponse(404, "User not found"));
      const { refreshToken, accessToken } = await generateTokens(user._id);
      user.refreshToken = refreshToken;
      await user.save();
      const options = {
        httpOnly: true,
        secure: true,
      };
      res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options).json(new ApiResponse(200,""));
    }
  );
});

//logout user
export const logout = asyncHanlder(async (req, res) => {
  const userid = req.user;

  console.log('logout')
  const user = await User.findByIdAndUpdate(
    userid,
    {
      $unset: { refreshToken: null },
    },
    { new: true }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  res
    .status(200)
    .clearcookie("accessToken", options)
    .clearcookie("refreshToken", options)
    .json(new ApiResponse(200, "User logged out"));
});
