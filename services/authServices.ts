import apiClient from "./apiClient";

export const authService = {
      async register(email: string, username: string, password: string) {
            const response = await apiClient.post("/api/register", {
                  email,
                  username,
                  password,
            });
            const data = response.data;

            if (data.user) {
                  return data.user;
            } else {
                  throw new Error("login faild");
            }
      },
      async login(email: string, password: string) {
            const response = await apiClient.post("/api/login", {
                  identifier: email,
                  password,
            });

            const data = response.data;

            if (data.user) {
                  return data.user;
            } else {
                  throw new Error("login faild");
            }
      },
      async checkAuthStatus() {
            try {
                  const response = await apiClient.get("/api/current-user");
                  if (response.status === 200) {
                        return response.data;
                  }
                  throw new Error("Not authenticated ");
            } catch (err) {
                  console.error("error checking auth status");
                  throw err;
            }
      },

      // todo logout
};
