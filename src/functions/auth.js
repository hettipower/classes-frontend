// Function to set the login data in local storage with expiration
export const setLoginData = (tokenVal, expiresIn) => {
  const currentTime = Date.now();
  const expirationTime = currentTime + expiresIn; // Expire time in milliseconds
  const loginData = { token: tokenVal, expiration: expirationTime };

  localStorage.setItem('loginData', JSON.stringify(loginData));
};

// Function to check if the login session is still valid
export const isLoginValid = () => {
  const loginData = JSON.parse(localStorage.getItem('loginData'));

  if (!loginData) {
    return false;
  }

  const currentTime = Date.now();
  return currentTime < loginData.expiration;
};

export const getLoginData = () => {
  const loginData = JSON.parse(localStorage.getItem('loginData'));

  return loginData ?? false;
};

export const removeLoginData = () => {
  localStorage.removeItem('loginData');
  localStorage.removeItem('storageCaseMember');
  localStorage.removeItem('storageCases');
  return true;
};