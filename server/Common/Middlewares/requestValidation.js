/* ====================== /// <==> Variables Declaration <==> /// ====================== */
const { StatusCodes } = require("http-status-codes");

/* ================ /// <==> Validate request Fucntion <==> /// ================ */
/*
//==// it's a middleware that mainly used to check the validity of sent request
from user before stage of database operations. it takes just one parameter (request schema) and
through function validate it compares between schema and sent request.
*/
const ValidateRequest = (schema) => {
  return (req, res, next) => {
    try {
      const validationErorrs = [];
      ["headers", "params", "query", "body"].forEach((key) => {
        if (schema[key]) {
          console.log(req[key]);
          let validation = schema[key].validate(req[key]);
          if (validation.error) {
            const valMesg = validation.error.details[0].message
              .split('"')
              .join();
            validationErorrs.push(valMesg);
          }
        }
      });

      if (validationErorrs.length) {
        console.log("Error in Sent req");
        res.status(StatusCodes.BAD_REQUEST).json(validationErorrs[0]);
      } else next();
    } catch (error) {
      console.log("Error In Validate req Function");
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json("Error In Validate req Function");
    }
  };
};

/* ================ /// <==> Export validate request Function <==> /// ================ */
module.exports = ValidateRequest;
