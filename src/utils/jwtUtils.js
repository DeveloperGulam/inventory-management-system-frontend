import jwtDecode from 'jwt-decode';

export const getUserFromToken = async () => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken;
    }
    return null;
  } catch (error) {
    console.log('Error decoding token:', error);
    return null;
  }
};