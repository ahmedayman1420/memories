// ====== --- ====== > Variables Declarations < ====== --- ====== //
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const userRbac = require("../Rbac/rbac");

// ====== --- ====== > Authorization Function < ====== --- ====== //
/*
//==// it's a middleware that mainly used to check the Authority of sent req
from user before stage of database operations. it takes just one parameter (req endpoint).
*/

const isAuthorized = (endPoint) => {
  return async (req, res, next) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];

        if (token) {
          const decoded = jwt.verify(token, process.env.ENCRYPT_KEY);
          const isAllowed = await userRbac.can(
            decoded.role.toString(),
            endPoint
          );

          if (isAllowed) {
            req.decoded = decoded;
            next();
          } else {
            res.status(StatusCodes.UNAUTHORIZED).json({
              Message: "UNAUTHORIZED",
            });
          }
        } else {
          res.status(StatusCodes.UNAUTHORIZED).json({
            Message: "Invalid Token",
          });
        }
      } else {
        res.status(StatusCodes.BAD_req).json({
          Message: "Token is required",
        });
      }
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        Message: "Error In Is Autorized Function",
      });
    }
  };
};

// ====== --- ====== > Exports Authorization Function < ====== --- ====== //
module.exports = isAuthorized;
