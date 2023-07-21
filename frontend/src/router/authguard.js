const isAuthenticated = () => {
    const token = localStorage.getItem('jwt');
    return !!token;
};
  
export default isAuthenticated;