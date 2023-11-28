import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  BrowserRouter,
} from "react-router-dom";
import { deleteItems, getItems, addItems } from "../utils/api";
import {
  loginUser,
  registerUser,
  getUserInfo,
  editProfile,
  addCardLike,
  removeCardLike,
} from "../utils/auth";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";
import {
  CurrentUserContext,
  CurrentUserProvider,
} from "../contexts/CurrentUserContext";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import ItemModal from "./ItemModal";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import EditProfileModal from "./EditProfileModal";
import AddItemModal from "./AddItemModal";
import Profile from "./Profile";

const App = () => {
  const [activeModal, setActiveModal] = useState("");
  const [clothingItems, setClothingItems] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [weatherTemp, setWeatherTemp] = useState(0);
  const [weatherLocation, setWeatherLocation] = useState("");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  function handleCreateModal() {
    setActiveModal("create");
  }

  function handleLoginModal() {
    setActiveModal("login");
  }

  function handleRegisterModal() {
    setActiveModal("register");
  }

  function handleEditProfileModal() {
    setActiveModal("edit");
  }

  function handleCloseModal() {
    setActiveModal("");
  }

  function handleSelectedCard(card) {
    setActiveModal("preview");
    setSelectedCard(card);
  }

  function handleToggleSwitchChange() {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  }

  function handleCardLike(item, isLiked, currentUser) {
    const token = localStorage.getItem("jwt");
    !isLiked
      ? addCardLike(item._id, currentUser._id, token)
          .then((res) => {
            setClothingItems((clothingItems) =>
              clothingItems.map((card) => (card._id === item._id ? res : card))
            );
          })
          .catch((err) => console.log(err))
      : removeCardLike(item._id, currentUser._id, token)
          .then((updatedCard) => {
            setClothingItems((clothingItems) =>
              clothingItems.map((card) =>
                card._id === item._id ? updatedCard : card
              )
            );
          })
          .catch((err) => console.log(err));
  }

  function handleAddItem(values) {
    const newItem = {
      name: values.name,
      imageUrl: values.imageUrl,
      weather: values.weatherType,
      token: values.token,
    };
    addItems(newItem)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        handleCloseModal();
      })
      .catch(console.error);
  }

  function handleDeleteItem(cardId, token) {
    deleteItems(cardId, token)
      .then((res) => {
        const newClothingItems = clothingItems.filter((card) => {
          return card._id !== cardId;
        });
        handleCloseModal();
        setClothingItems(newClothingItems);
      })
      .catch(console.error);
  }

  function handleLogin(email, password) {
    loginUser({ email, password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
          handleCloseModal();
          return res;
        } else {
          console.log("handleLogin error");
        }
      })
      .catch(console.error);
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setClothingItems(clothingItems);
  }

  function handleRegister(email, password, name, avatar) {
    registerUser({ email, password, name, avatar })
      .then((res) => {
        handleCloseModal();
        handleLogin(email, password);
      })
      .catch(console.error);
  }

  function handleEditProfile(name, avatar, token) {
    editProfile(name, avatar, token)
      .then((res) => {
        setCurrentUser(res.data);
        handleCloseModal();
      })
      .catch(console.error);
  }

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data.items);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!activeModal) return;
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [activeModal]);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      getUserInfo(jwt)
        .then((res) => {
          if (res) {
            setCurrentUser(res);
            setIsLoggedIn(true);
          }
        })
        .catch(console.error);
    }
  }, [isLoggedIn]);

  return (
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <CurrentUserProvider>
          <Header
            onCreateModal={handleCreateModal}
            weatherLocation={weatherLocation}
            onLoginModal={handleLoginModal}
            onRegisterModal={handleRegisterModal}
            isLoggedIn={isLoggedIn}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherTemp={weatherTemp}
                  onSelectedCard={handleSelectedCard}
                  clothingItems={clothingItems}
                  onCardLike={handleCardLike}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  onCreateModal={handleCreateModal}
                  clothingItems={clothingItems}
                  onSelectedCard={handleSelectedCard}
                  onEditProfileModal={handleEditProfileModal}
                  onLogout={handleLogout}
                  onCardLike={handleCardLike}
                />
              }
            />
            <Route
              path=""
              element={
                isLoggedIn ? <Navigate to="/profile" /> : <Navigate to="/" />
              }
            />
          </Routes>
          <Footer />
          {activeModal === "create" && (
            <AddItemModal
              handleCloseModal={handleCloseModal}
              onClose={handleCloseModal}
              onOpen={activeModal === "create"}
              onAddItem={handleAddItem}
            />
          )}
          {activeModal === "preview" && (
            <ItemModal
              selectedCard={selectedCard}
              onClose={handleCloseModal}
              onDeleteItem={handleDeleteItem}
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
            />
          )}
          {activeModal === "login" && (
            <LoginModal
              handleCloseModal={handleCloseModal}
              onClose={handleCloseModal}
              onOpen={activeModal === "login"}
              onLogin={handleLogin}
              setActiveModal={setActiveModal}
            />
          )}
          {activeModal === "register" && (
            <RegisterModal
              handleCloseModal={handleCloseModal}
              onClose={handleCloseModal}
              onOpen={activeModal === "register"}
              onRegister={handleRegister}
              setActiveModal={setActiveModal}
            />
          )}
          {activeModal === "edit" && (
            <EditProfileModal
              handleCloseModal={handleCloseModal}
              onClose={handleCloseModal}
              onOpen={activeModal === "edit"}
              onSubmit={handleEditProfile}
            />
          )}
        </CurrentUserProvider>
      </CurrentTemperatureUnitContext.Provider>
  );
};

export default App;
