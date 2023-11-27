const API_URL = "http://localhost:3001";

export const registerUser = async ({ name, avatar, email, password }) => {
  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, avatar, email, password }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error signing up user:", error);
    throw error;
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const response = await fetch(`${API_URL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error signing in user:", errorData);
      throw new Error(errorData.message || "Authentication failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error signing in user:", error);
    throw error;
  }
};

export const checkToken = async (token) => {
  try {
    const response = await fetch(`${API_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error checking token validity:", error);
    throw error;
  }
};
