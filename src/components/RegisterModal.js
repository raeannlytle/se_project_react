import React, { useState, useEffect } from "react";
import ModalWithForm from "./ModalWithForm.js";

const RegisterModal = ({
  onRegister,
  handleCloseModal,
  isOpen,
  setActiveModal,
}) => {
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setUsername("");
      setAvatar("");
      setEmail("");
      setPassword("");
    }
  }, [isOpen]);

  function handleRegister(e) {
    e.preventDefault();
    onRegister(email, password, username, avatar);
  }

  function handleLogin(e) {
    setActiveModal("login");
  }

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  function handleAvatarChange(e) {
    setAvatar(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  return (
    <ModalWithForm
      className="register-modal"
      title="Register"
      buttonText="Register"
      onClose={handleCloseModal}
      isOpen={isOpen}
    >
      <div className="modal__labels">
        <label className="modal__label">
          Username:
          <input
            placeholder="Name"
            className="modal__input"
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </label>
        <label className="modal__label">
          Avatar URL:
          <input
            placeholder="Avatar URL"
            className="modal__input"
            type="text"
            id="avatar"
            value={avatar}
            onChange={handleAvatarChange}
            required
          />
        </label>
        <label className="modal__label">
          Email:
          <input
            placeholder="Email"
            className="modal__input"
            type="text"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </label>
        <label className="modal__label">
          Password:
          <input
            placeholder="Password"
            className="modal__input"
            type="text"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </label>
      </div>
      <div>
        <button
          type="button"
          className="modal__button-submit modal__buttom-submit-2"
          onClick={handleLogin}
        >
          or Login
        </button>
      </div>
    </ModalWithForm>
  );
};
export default RegisterModal;
