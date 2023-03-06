const formatUserDataResponse = (userData) => {
  return {
    id: userData.id,
    email: userData.email,
    role: userData.role,
    first_name: userData.first_name,
    last_name: userData.last_name,
    phone_number: userData.phone_number,
    avatar_img: userData.avatar_img || null,
  };
};

module.exports = formatUserDataResponse;
