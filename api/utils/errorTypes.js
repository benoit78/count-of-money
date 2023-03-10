const errorTypes = {
  MISSING_PARAM: { type: "MissingParam", statusCode: 400 },
  MISSING_EMAIL_OR_PASS: { type: "MissingEmailOrPass", statusCode: 400 },
  DUPLICATE_KEY: { type: "DuplicateKey", statusCode: 400 },
  BAD_FORMAT: { type: "BadFormat", statusCode: 400 },
  INVALID_PASS_CONFIRM: { type: "InvalidPassConfirm", statusCode: 400 },
  INVALID_MONGOOSE_ID: { type: "InvalidMongooseId", statusCode: 400 },
  WRONG_ROUTE: { type: "WrongRoute", statusCode: 400 },
  BAD_CREDENTIALS: { type: "BadCredentials", statusCode: 401 },
  WRONG_PASSWORD: { type: "WrongPassword", statusCode: 401 },
  MISSING_TOKEN: { type: "MissingToken", statusCode: 401 },
  INVALID_TOKEN: { type: "InvalidToken", statusCode: 401 },
  EXPIRED_TOKEN: { type: "ExpiredToken", statusCode: 401 },
  NO_USER_RELATED: { type: "NoUserRelated", statusCode: 401 },
  USER_CHANGED_PASS: { type: "UserChangedPass", statusCode: 401 },
  RESTRICTED_ACCESS: { type: "RestrictedAccess", statusCode: 403 },
  CANNOT_DELETE_CAUSE_HAS_DATA: {
    type: "CannotDeleteCauseHasData",
    statusCode: 403,
  },
  NOT_IN_SAME_ENTITY: { type: "NotInSameEntity", statusCode: 403 },
  UNAUTHORIZED_ROLE: { type: "UnauthorizedRole", statusCode: 403 },
  NOT_IN_PENDING: { type: "NotInPending", statusCode: 403 },
  MILESTONE_PAID: { type: "MilestonePaid", statusCode: 403 },
  UNAUTHORIZED_USER_DELETE: { type: "UnauthorizedUserDelete", statusCode: 403 },
  NOT_FOUND: { type: "NotFound", statusCode: 404 },
  NOT_IMPLEMENTED_YET: { type: "NotImplementedYet", statusCode: 404 },
  UNDEFINED_ROUTE: { type: "UndefinedRoute", statusCode: 404 },
  SOMETHING_WENT_WRONG: { type: "SomethingWentWrong", statusCode: 500 },
};

module.exports = errorTypes;
