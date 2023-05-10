import axios from 'axios';




export const getFilteredCards = async (urlParam,filters) => {
  const BASE_URL = `https://${urlParam}`;
  return new Promise((resolve, reject) => {
    axios
      //.get(`${BASE_URL}/metadata/filter`, filters)
      .get(`${BASE_URL}`, filters)
      .then((response) => {
        resolve(response.data);
      })
      .catch((e) => {
        reject(e.message);
      });
  });
};
