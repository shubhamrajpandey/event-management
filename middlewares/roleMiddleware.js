//like if the role is admin and the user is trying with the user token it throw error.

//The ... (three dots) is the rest operator.
//It collects all arguments passed to the function into a single array.
exports.roleVerify = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied. You do not have permission.",
      });
    }
    next();
  };
};
