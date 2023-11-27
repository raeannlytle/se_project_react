import React, { useState, useEffect } from "react";
import ModalWithForm from "./ModalWithForm";
import "../blocks/ModalWithForm.css";
import "../blocks/LoginModal.css";

const LoginModal = ({ handleCloseModal, isOpen, onLogin, setActiveModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setPassword("");
    }
  }, [isOpen]);

  function handleLogin(e) {
    e.preventDefault();
    onLogin(email, password);
  }

  function handleRegister(e) {
    setActiveModal("register");
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  return (
    <ModalWithForm
      title="Login"
      onClose={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleLogin}
      buttonText="Login"
    >
      <div className="modal__labels">
        <label className="modal__label">
          Email:
          <input
            name="email"
            placeholder="Email"
            className="modal__input"
            minLength="1"
            maxLength="30"
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
        </label>
        <label className="modal__label" htmlFor="password">
          Password:
          <input
            placeholder="Password"
            className="modal__input"
            type="password"
            name="password"
            minLength="1"
            maxLength="30"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
      </div>
      <div>
        <button
          type="button"
          className="modal__button-submit modal__button-submit-register"
          onClick={handleRegister}
        >
          or Register
        </button>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
