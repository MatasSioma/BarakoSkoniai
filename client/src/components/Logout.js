// Logout.js
export const Logout = (navigate, toast) => {
  try {
    const logoutRequest = fetch('/auth/logout', {
      headers: {
        token: localStorage.token,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    localStorage.removeItem('token');
    clearInterval(window.tokenExpirationInterval); // Clear the interval
    navigate('/');
    toast.success('You Have Been Timed Out, Please Sign in Again if You Want.');

    return logoutRequest;
  } catch (err) {
    console.error(err.message);
    console.error("Nepavyko logout'as");
  }
};
