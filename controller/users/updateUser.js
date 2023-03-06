const User = require("../../models/user.model");
const formatUserDataResponse = require("../../services/formatUserDataResponse");
require("dotenv").config();
const adminRegisterKey = process.env.adminRegisterKey;

const updateUser = async (req, res) => {
  try {
    const { first_name, last_name, phone_number, avatar_img, admin_key } =
      req.body;
    const oldUser = await User.findOne({ _id: req.user._id });
    const role =
      admin_key === "" || !Boolean(admin_key)
        ? oldUser.role
        : admin_key === adminRegisterKey
        ? "admin"
        : "user";
    const userUpdate = await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        first_name,
        last_name,
        phone_number,
        avatar_img,
        role,
      },
      { new: true }
    );
    res.status(200).json({
      message: "Update user success",
      data: formatUserDataResponse(userUpdate),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = updateUser;
