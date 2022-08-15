/* ====================== /// <==> Variables Declaration <==> /// ====================== */
const joi = require("joi");

/* ================ /// <==> User Joi Validations <==> /// ================ */
/*
//==//userJoi is an object that contains all user apis schemas to check the validity of sent request.
this object attribures are [adduserSchema].
*/
const userJoi = {
  signupSchema: {
    body: joi
      .object()
      .required()
      .keys({
        name: joi.string().required(),
        email: joi
          .string()
          .email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net"] },
          })
          .required(),
        password: joi.string().required(),
        confirmPassword: joi.string().required(),
      }),
  },
  signinSchema: {
    body: joi
      .object()
      .required()
      .keys({
        email: joi
          .string()
          .email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net"] },
          })
          .required(),
        password: joi.string().required(),
      }),
  },
  googleSigninSchema: {
    body: joi
      .object()
      .required()
      .keys({
        email: joi
          .string()
          .email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net"] },
          })
          .required(),
        name: joi.string().required(),
      }),
  },
  updatePasswordSchema: {
    body: joi.object().required().keys({
      oldPassword: joi.string().required(),
      newPassword: joi.string().required(),
    }),
    headers: joi
      .object()
      .required()
      .keys({
        authorization: joi.string().required(),
      })
      .options({ allowUnknown: true }),
  },
};

/* ============= /// <==> Exports User Joi Validations <==> /// ============= */
module.exports = userJoi;
