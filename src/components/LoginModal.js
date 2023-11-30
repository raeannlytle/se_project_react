import React, { useEffect, useState } from "react";
import ModalWithForm from "./ModalWithForm";

const LoginModal = ({ handleCloseModal, setActiveModal, onLogin, isOpen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  const handleRegisterClick = (e) => {
    setActiveModal("register");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
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
      onSubmit={handleLoginSubmit}
      buttonText="Login"
      modalName="login"
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
          onClick={handleRegisterClick}
        >
          or Register
        </button>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
