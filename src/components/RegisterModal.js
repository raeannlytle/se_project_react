import React, { useState, useEffect } from "react";
import ModalWithForm from "./ModalWithForm.js";

const RegisterModal = ({
  onRegister,
  handleCloseModal,
  isOpen,
  setActiveModal,
}) => {
  const [name, setname] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setname("");
      setAvatar("");
      setEmail("");
      setPassword("");
    }
  }, [isOpen]);

  function handleRegister(e) {
    e.preventDefault();
    onRegister(email, password, name, avatar);
  }

  function handleLogin(e) {
    setActiveModal("login");
  }

  function handleNameChange(e) {
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
      title="Register"
      buttonText="Register"
      onClose={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleRegister}
    >
      <div className="modal__labels">
        <label className="modal__label">
          Name:
          <input
            placeholder="Name"
            className="modal__input"
            minLength="1"
            maxLength="30"
            type="text"
            name="name"
            value={name}
            onChange={handleNameChange}
          />
        </label>
        <label className="modal__label">
          Avatar URL:
          <input
            placeholder="Avatar URL"
            className="modal__input"
            type="text"
            name="avatar"
            minLength="1"
            maxLength="200"
            value={avatar}
            onChange={handleAvatarChange}
          />
        </label>
        <label className="modal__label">
          Email:
          <input
            placeholder="Email"
            className="modal__input"
            type="text"
            name="email"
            minLength="1"
            maxLength="30"
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
            name="password"
            minLength="1"
            maxLength="30"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </label>
      </div>
      <div>
        <button
          type="button"
          className="modal__button-submit modal__buttom-submit-register"
          onClick={handleLogin}
        >
          or Login
        </button>
      </div>
    </ModalWithForm>
  );
};
export default RegisterModal;
