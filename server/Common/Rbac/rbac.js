// ====== --- ====== > Modules endpoints < ====== --- ====== //
const Rbac = require("easy-rbac");
const postEndpoints = require("../../modules/posts/post-endpoints");
const userEndpoints = require("../../modules/users/user-endpoints");
const roles = require("../Enum/roles");

// ====== --- ====== > Roles policies < ====== --- ====== //
const userPolicies = [
  postEndpoints.AddPost,
  postEndpoints.editPost,
  postEndpoints.deletePost,
  postEndpoints.likePost,
  postEndpoints.searchPost,
];
const adminPolicies = [];
const superAdminPolicies = [];

// ====== --- ====== > Match Between Roles & Them EndPoints < ====== --- ====== //
const opts = {
  [roles.USER]: {
    can: userPolicies,
  },
  [roles.ADMIN]: {
    can: adminPolicies,
    inherits: [roles.USER],
  },
  [roles.SUPER_ADMIN]: {
    can: superAdminPolicies,
    inherits: [roles.ADMIN, roles.USER],
  },
};

// ====== --- ====== > Create rbac of user module < ====== --- ====== //
userRbac = Rbac.create(opts);

// ====== --- ====== > Exports userRabac < ====== --- ====== //
module.exports = userRbac;
