const logout = async (req, res) => {
  try {
    const userData = req.user;
    userData.tokens = userData.tokens.filter(
      (token) => token.token != req.token
    );
    await userData.save();
    res.status(204).json({ message: "logout success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const logoutAll = async (req, res) => {
  try {
    const userData = req.user;
    userData.tokens.splice(0, userData.tokens.length);
    await userData.save();
    res.status(200).json({ message: "logout all device success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { logout, logoutAll };
