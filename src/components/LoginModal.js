import React, { useEffect, useState } from "react";
import ModalWithForm from "./ModalWithForm";
import "../blocks/ModalWithForm.css";
import "../blocks/LoginModal.css";

const LoginModal = ({ handleCloseModal, onClose, onLogin, isOpen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  const handleRegister = (e) => {
    onClose("register");
  };

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

  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setPassword("");
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="Login"
      onClose={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      buttonText="Login"
    >
      <div className="modal__labels">
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
          />
        </label>
        <label className="modal__label">
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
          className="modal__button-submit modal__button-submit-login"
          onClick={handleRegister}
        >
          or Register
        </button>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
