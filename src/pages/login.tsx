const login = async () => {
  try {
    const res = await api.post(
      "/auth/login",
      {
        email,
        password,
      }
    );

    localStorage.setItem(
      "token",
      res.data.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(res.data.user)
    );

    navigate("/dashboard");
  } catch (error) {
    console.error(error);
    alert("Login Failed");
  }
};