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
        postName: joi.string().required(),
        title: joi.string().required(),
        message: joi.string().required(),
        tags: joi.array().items(joi.string()).required(),
        file: joi.string().required(),
        filePath: joi.string().required(),
      }),
    headers: joi
      .object()
      .required()
      .keys({
        authorization: joi.string().required(),
      })
      .options({ allowUnknown: true }),
  },
  editPostSchema: {
    body: joi
      .object()
      .required()
      .keys({
        userId: joi.string().required(),
        postName: joi.string().required(),
        title: joi.string().required(),
        message: joi.string().required(),
        tags: joi.array().items(joi.string()).required(),
      }),
    params: joi.object().required().keys({
      id: joi.string().required(),
    }),
    headers: joi
      .object()
      .required()
      .keys({
        authorization: joi.string().required(),
      })
      .options({ allowUnknown: true }),
  },
  deletePostSchema: {
    body: joi.object().required().keys({
      userId: joi.string().required(),
    }),
    params: joi.object().required().keys({
      id: joi.string().required(),
    }),
    headers: joi
      .object()
      .required()
      .keys({
        authorization: joi.string().required(),
      })
      .options({ allowUnknown: true }),
  },
  likePostSchema: {
    params: joi.object().required().keys({
      id: joi.string().required(),
    }),
    headers: joi
      .object()
      .required()
      .keys({
        authorization: joi.string().required(),
      })
      .options({ allowUnknown: true }),
  },
  searchPostSchema: {
    query: joi.object().required().keys({
      titles: joi.string().required(),
      tags: joi.string().required(),
      page: joi.string().required(),
    }),
    headers: joi
      .object()
      .required()
      .keys({
        authorization: joi.string().required(),
      })
      .options({ allowUnknown: true }),
  },

  getPostsSchema: {
    query: joi.object().required().keys({
      page: joi.string().required(),
    }),
  },

  getPostSchema: {
    params: joi.object().required().keys({
      id: joi.string().required(),
    }),
    headers: joi
      .object()
      .required()
      .keys({
        authorization: joi.string().required(),
      })
      .options({ allowUnknown: true }),
  },

  addCommentSchema: {
    params: joi.object().required().keys({
      id: joi.string().required(),
    }),
    body: joi.object().required().keys({
      comment: joi.string().required(),
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
