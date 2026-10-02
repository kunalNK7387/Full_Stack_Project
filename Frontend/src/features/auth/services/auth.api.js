import axois from "axios";

export async function register({ username, email, password }) {
  try {
    const response = await axois.post(
      "http://localhost:3000/api/auth/register",
      {
        username,
        email,
        password,
      },
      {
        withCredentials: true,
      },
    );
  } catch (err) {
    console.log(err);
  }
}
