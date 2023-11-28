import React from "react";
import { baseUrl, headers } from "./constants";
import { checkResponse } from "./utils";

export const getItems = () => {
  return fetch(`${baseUrl}/items`, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
};

export const addItems = (newItem) => {
  return fetch(`${baseUrl}/items`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${newItem.token}`,
    },
    body: JSON.stringify({
      name: newItem.name,
      weather: newItem.weather,
      imageUrl: newItem.imageUrl,
    }),
  }).then(checkResponse);
};

export const deleteItems = (id, token) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

