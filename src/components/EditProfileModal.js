import "../blocks/ModalWithForm.css";
import closeButton from "../images/close-button.svg";
import React, { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ModalWithForm from "./ModalWithForm";
import * as api from "../utils/api";

const EditProfileModal = ({ handleCloseModal, isOpen, onSubmit }) => {
  const token = localStorage.getItem("jwt");

  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");

  const currentUser = useContext(CurrentUserContext);

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  function handleAvatarChange(e) {
    setAvatar(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(username, avatar, token);
  }

  useEffect(() => {
    if (!isOpen) {
      setUsername(currentUser.username);
      setAvatar(currentUser.avatar);
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="Edit Profile"
      onClose={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      buttonText="Save changes"
    >
      <div className="modal__labels">
        <label className="modal__label">
          Username
          <input
            type="text"
            name="username"
            placeholder="Username"
            minLength="1"
            maxLength="30"
            className="modal__input"
            value={username}
            onChange={handleUsernameChange}
          />
        </label>
        <label className="modal__label">
          Avatar URL
          <input
            type="url"
            name="avatar"
            placeholder="Avatar URL"
            minLength="1"
            maxLength="200"
            className="modal__input"
            value={avatar}
            onChange={handleAvatarChange}
          />
        </label>
      </div>
    </ModalWithForm>
  );
};

export default EditProfileModal;
