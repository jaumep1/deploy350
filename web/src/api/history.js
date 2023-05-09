import axios from 'axios';

const getHistory = async () => {
  try {
    const response = await axios.get('http://localhost:8080/orders');
    return response.data;
  } catch (error) {
    return error;
  }
};

export default getHistory;
