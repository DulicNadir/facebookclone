import axios from 'axios';
export const updateCoverPicture = async (url, token) => {
  try {
    await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/updateCoverPicture`,
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

export const removeCoverPicture = async (token) => {
  try {
    await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/removeCoverPicture`,
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
