const generateState = () => {
  return `${Math.random()
    .toString(36)
    .substring(2, 15)}${Math.random()
    .toString(36)
    .substring(2, 15)}`;
};

const setExpiry = () => {
  let expires = new Date();
  expires.setSeconds(expires.getSeconds() + 3599);
  return expires;
};

module.exports = {
  generateState,
  setExpiry
};
