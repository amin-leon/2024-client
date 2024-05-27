// AuthService.js
export const setToken = (token) => {
    sessionStorage.setItem('authToken', token);
  };
  
  export const getToken = () => {
    return sessionStorage.getItem('authToken');
  };
  