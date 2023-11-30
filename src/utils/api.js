import { baseUrl } from "./utils";

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
};

export const addItems = ({ name, imageUrl, weather }) => {
  const addItem = fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(checkResponse);

  return addItem;
};

export const getItems = () => {
  const getItems = fetch(`${baseUrl}/items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  }).then(checkResponse);
  return getItems;
};

export const deleteItems = (selectedCard) => {
  const deleteItem = fetch(`${baseUrl}/items/${selectedCard._id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  }).then(checkResponse);
  return deleteItem;
};

export const addCardLike = (itemId) => {
  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  }).then((res) => checkResponse(res));
};

export const removeCardLike = (itemId) => {
  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  }).then((res) => checkResponse(res));
};
