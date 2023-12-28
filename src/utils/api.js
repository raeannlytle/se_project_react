const baseUrl =
  process.env.NODE_ENV === "production"
    ? "http://api.wtwr.100mountain.com"
    : "http://localhost:3001";

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json().catch(() => ({}));
  } else {
    return res
      .json()
      .then((error) => Promise.reject(`Error: ${res.status}, ${error.message}`))
      .catch(() => Promise.reject(`Error: ${res.status}`));
  }
};

export const addItem = ({ name, imageUrl, weather }) => {
  console.log("Request Payload:", { name, imageUrl, weather });
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  })
    .then((res) => {
      console.log("Response from addItem:", res);
      return checkResponse(res);
    })
    .then((data) => {
      console.log("Data from addItem:", data);
      return data;
    });
};

export const getItems = () => {
  return fetch(`${baseUrl}/items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
};

export const deleteItem = (selectedCard) => {
  return fetch(`${baseUrl}/items/${selectedCard._id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  }).then(checkResponse);
};

export const addCardLike = (itemId) => {
  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to add like");
      }
      return res.json();
    })
    .then((data) => data);
};

export const removeCardLike = (itemId) => {
  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to remove like");
      }
      return res.json();
    })
    .then((data) => data);
};
