/* ====================== /// <==> Variables Declaration <==> /// ====================== */
const joi = require("joi");

/* ================ /// <==> Post Joi Validations <==> /// ================ */
/*
//==//postJoi is an object that contains all post apis schemas to check the validity of sent request.
this object attribures are [addPostSchema].
*/
const userJoi = {
  addPostSchema: {
    body: joi
      .object()
      .required()
      .keys({
        creator: joi.string().required(),
        title: joi.string().required(),
        message: joi.string().required(),
        tags: joi.array().items(joi.string()).required(),
        file: joi.string().required(),
        filePath: joi.string().required(),
      }),
  },
  editPostSchema: {
    body: joi
      .object()
      .required()
      .keys({
        creator: joi.string().required(),
        title: joi.string().required(),
        message: joi.string().required(),
        tags: joi.array().items(joi.string()).required(),
      }),
      params: joi
      .object()
      .required()
      .keys({
        id: joi.string().required(),
      }),

  },
};

/* ============= /// <==> Exports User Joi Validations <==> /// ============= */
module.exports = userJoi;
