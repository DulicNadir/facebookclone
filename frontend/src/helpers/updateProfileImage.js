import axios from 'axios';
export const updateProfileImage = async (url, token) => {
  try {
    await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/updateProfilePicture`,
      {
        url,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return 'Zavrsio';
  } catch (error) {
    return error.response.data.message;
  }
};
export const removeProfilePicture = async (token) => {
  try {
    await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/removeProfilePicture`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return 'Zavrsio';
  } catch (error) {
    return error.response.data.message;
  }
};
