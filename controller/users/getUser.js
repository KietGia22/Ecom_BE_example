const formatUserDataResponse = require("../../services/formatUserDataResponse");

const getUser = async (req, res) => {
  try {
    res.json({ data: formatUserDataResponse(req.user) });
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = getUser;
