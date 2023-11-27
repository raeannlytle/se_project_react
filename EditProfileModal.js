import "../blocks/ModalWithForm.css";
import closeButton from "../images/close-button.svg";
import { useState, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import * as api from "../utils/api";

const EditProfileModal = ({ onClose }) => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const [formData, setFormData] = useState({
    username: currentUser.username,
    avatar: currentUser.avatar || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .updateUserProfile(formData)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        onClose();
      })
      .catch((error) => {
        console.error("Error updating user profile:", error);
      });
  };

  return (
    <div className="modal">
      <div className="modal__content">
        <button
          type="button"
          id="modal-close-button"
          onClick={onClose}
          className="modal__button-close"
        >
          <img src={closeButton} alt="close-button" />
        </button>
        <h2 className="modal__title">Edit Profile</h2>
        <form className="modal__form" onSubmit={handleSubmit}>
          <label className="modal__label">
            Username
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="modal__input"
              required
            />
          </label>
          <button type="submit" className="modal__button-submit">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
