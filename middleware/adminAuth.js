const adminAuth = async (req, res, next) => {
  try {
    if (req.user.role !== "admin")
      return res
        .status(403)
        .send({ error: "You don't have permission for this action" });
    next();
  } catch (error) {
    res.status(401).send({ error: "Unauthorized" });
  }
};

module.exports = adminAuth;
