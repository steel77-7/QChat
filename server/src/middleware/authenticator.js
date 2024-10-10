import jwt from "jsonwebtoken";
import ApiError from "../../utils/ApiError.js";
import asyncHanlder from "../../utils/asyncHandler.js";
import User from "../models/user.models.js";

export const authenticator = asyncHanlder(
  asyncHanlder(async (req, res, next) => {
    try {
      const token = req.cookies?.accessToken;
      console.log("authenicator");
      // console.log('access token',req.cookies)

      if (!token) {
        return res.status(404).json(new ApiError(401, "Token not found"));
      }

      const decoded = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, res) => {
          if (err) {
            throw new Error();
          }
          console.log("decoded", res);
          return res;
        }
      );
      const user = await User.findById(decoded._id);

      // console.log("user", user);
      if (!user)
        return res.status(404).json(new ApiError(404, "User not found"));

      req.user = user._id;
      next();
    } catch (error) {
      // console.log(error)
      return res.status(401).json(new ApiError(401, "Invalid token"));
    }
  })
);
