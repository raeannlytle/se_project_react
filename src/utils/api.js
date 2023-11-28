import * as authApi from "../utils/auth";
import ItemModal from "../components/ItemModal";

export const API_URL = "http://localhost:3001";

function _checkResponse(res) {
  if (res.ok) {
    return res.json().then((data) => ({ status: res.status, data }));
  }
  return res.json().then((error) => ({ status: res.status, error }));
}

export const addItems = ({ name, weather, link }, token) => {
  console.log("Request Data:", { name, weather, link });
  return fetch(`${API_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getDefaultHeaders(token),
    },
    body: JSON.stringify({
      name,
      weather,
      link,
    }),
  })
    .then(_checkResponse)
    .then((result) => {
      console.log("Response:", result);
      return result;
    });
};

const getDefaultHeaders = (token) => ({
  "Content-Type": "application/json",
  Authorization: token ? `Bearer ${token}` : undefined,
});

export const getItems = () => {
  return fetch(`${API_URL}/items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(_checkResponse);
};

export const deleteItems = (item, token) => {
  return fetch(`${API_URL}/items/${item}`, {
    method: "DELETE",
    headers: {
      ...getDefaultHeaders(token),
    },
  }).then(_checkResponse);
};

export const addCardLike = (itemId, token) => {
  return fetch(`${API_URL}/items/${itemId}/like`, {
    method: "POST",
    headers: {
      ...getDefaultHeaders(token),
    },
  }).then(_checkResponse);
};

export const removeCardLike = (itemId, token) => {
  return fetch(`${API_URL}/items/${itemId}/like`, {
    method: "DELETE",
    headers: {
      ...getDefaultHeaders(token),
    },
  }).then(_checkResponse);
};

export const updateUserProfile = (userId, updatedData, token) => {
  return fetch(`${API_URL}/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  }).then(_checkResponse);
};

export const registerUser = authApi.registerUser;

export const loginUser = authApi.loginUser;
