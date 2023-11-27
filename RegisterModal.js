import React, { useState } from "react";
import { registerUser } from "../utils/auth.js";
import ModalWithForm from "./ModalWithForm.js";

const RegisterModal = ({ onRegister, onClose }) => {
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    registerUser({ username, avatar, email, password })
      .then((res) => {
        console.log("User successfully registered:", res);
        onRegister();
      })
      .catch((e) => {
        console.error("Error registering user:", e);
      });
  };

  return (
    <ModalWithForm
      className="register-modal"
      title="Register"
      buttonText="Register"
      onClick={onClose}
    >
      <form className="modal__labels" onSubmit={handleSubmit}>
        <label className="modal__label" htmlFor="username">
          Name:
        </label>
        <input
          placeholder="Name"
          className="modal__input"
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
          required
        />
        <label className="modal__label" htmlFor="avatar">
          Avatar URL:
        </label>
        <input
          placeholder="Avatar URL"
          className="modal__input"
          type="text"
          id="avatar"
          value={avatar}
          onChange={handleAvatarChange}
          required
        />
        <label className="modal__label" htmlFor="email">
          Email:
        </label>
        <input
          placeholder="Email"
          className="modal__input"
          type="text"
          id="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <label className="modal__label" htmlFor="password">
          Password:
        </label>
        <input
          placeholder="Password"
          className="modal__input"
          type="text"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </form>
    </ModalWithForm>
  );
};
export default RegisterModal;
