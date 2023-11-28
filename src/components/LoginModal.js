import React, { useState } from "react";
import ModalWithForm from "./ModalWithForm";
import "../blocks/ModalWithForm.css";
import "../blocks/LoginModal.css";

const LoginModal = ({ onLogin, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <ModalWithForm
      title="Login"
      onClick={onClose}
      onSubmit={handleSubmit}
      buttonText="Login"
    >
      <div className="modal__labels">
        <label className="modal__label" htmlFor="email">
          Email:
        </label>
        <input
          placeholder="Email"
          className="modal__input"
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
        />
        <label className="modal__label" htmlFor="password">
          Password:
        </label>
        <input
          placeholder="Password"
          className="modal__input"
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
