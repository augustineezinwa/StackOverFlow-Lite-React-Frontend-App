const obtainToken = () => {
  try {
    const item = localStorage.getItem('user');
    const user = JSON.parse(item);
    return user.token;
  } catch (err) {
    return null;
  }
};

export default obtainToken;
