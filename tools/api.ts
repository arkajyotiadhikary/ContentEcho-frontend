import axios from "axios";

export const registerUser = async (user: { username: string; email: string; password: string }) => {
      console.log("user", user);
      try {
            const response = await axios.post(
                  "http://localhost:1337/api/auth/local/register",
                  user
            );
            return response;
      } catch (error) {
            console.error(error);
      }
};

export const authenticateUser = async (user: { identifier: string; password: string }) => {
      try {
            const response = await axios.post("http://localhost:1337/api/auth/local", user);
            return response;
      } catch (error) {
            console.error(error);
      }
};
