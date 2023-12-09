export const Logout = async (navigate, toast) => {
    try {
      const logoutRequest = fetch('http://localhost:3001/auth/logout', {
        headers: {
          token: localStorage.token,
          "Content-Type": "application/json",
        },
        method: "POST",
      });
  
      localStorage.removeItem("token");
      navigate('/login');
      toast.success("Logged out Successfully");
  
      await logoutRequest;
    } catch (err) {
      console.error(err.message);
      console.error("Nepavyko logout'as");
    }
  };