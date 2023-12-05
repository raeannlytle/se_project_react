import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Profile from "./Profile";
import Footer from "./Footer";
import ItemModal from "./ItemModal";
import { defaultClothingItems } from "../utils/utils";
import {
  getForecastWeather,
  parseWeatherData,
  parseLocation,
} from "../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import AddItemModal from "./AddItemModal";
import * as api from '../utils/api';
import {
  loginUser,
  registerUser,
  getUserInfo,
  editProfile,
} from "../utils/auth";
import DeleteConfirmModal from "./DeleteConfirmModal";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import ProtectedRoute from "./ProtectedRoute";
import EditProfileModal from "./EditProfileModal";
import "../blocks/App.css";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [weatherLocation, setWeatherLocation] = useState("");

  const handleLoginModal = () => {
    setActiveModal("login");
  };

  const handleRegisterModal = () => {
    setActiveModal("register");
  };

  const handleEditProfileModal = () => {
    setActiveModal("editProfile");
  };

  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleCloseConfirmModal = () => {
    setDeleteConfirm(false);
  };

  const onAddItem = (values) => {
    api
    .addItem(values)
      .then((data) => {
        setClothingItems([data.data, ...clothingItems]);
        handleCloseModal();
      })
      .catch((err) => {
        console.log(clothingItems);
        console.error("Error from onAddItem:", err);
      });
  };

  const handleDelete = (selectedCard) => {
    console.log("Deleting item:", selectedCard);
    if (selectedCard && selectedCard._id) {
      api
      .deleteItem(selectedCard)
        .then(() => {
          const newClothingItems = clothingItems.filter((cards) => {
            return cards._id !== selectedCard._id;
          });
          setClothingItems(newClothingItems);
          handleCloseModal();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleDeleteConfirm = (selectedCard) => {
    setDeleteConfirm(true);
    setSelectedCard(selectedCard);
    setActiveModal("delete");
  };

  const handleLogin = (email, password) => {
    loginUser({ email, password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
          setCurrentUser(res.userData);
          handleCloseModal();
          return res;
        } else {
          console.log("handleLogin error");
        }
      })
      .catch(console.error);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    setClothingItems(clothingItems);
  };

  const handleRegister = (email, password, name, avatar) => {
    registerUser({ email, password, name, avatar })
      .then((user) => {
        setCurrentUser(user);
        handleCloseModal();
        handleLogin(email, password);
      })
      .catch(console.error);
  };

  const handleEditProfile = (name, avatar, token) => {
    editProfile(name, avatar, token)
      .then((userData) => {
        setCurrentUser(userData.data);
        handleCloseModal();
      })
      .catch(console.error);
  };
  const handleLikeClick = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    !isLiked
      ? api
          .addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((c) => (c._id === id ? updatedCard : c))
            );
          })
          .catch(console.error)
      : api
          .removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((c) => (c._id === id ? updatedCard : c))
            );
          })
          .catch(console.error);
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };
  const profileProps = {
    clothingItems: clothingItems,
    handleCreateModal: handleCreateModal,
    onSelectedCard: handleSelectedCard,
    onEditProfileModal: handleEditProfileModal,
    onLogout: handleLogout,
    isLoggedIn: isLoggedIn,
    handleLikeClick: handleLikeClick,
  };

  const mainProps = {
    weatherTemp: temp,
    onSelectedCard: handleSelectedCard,
    clothingItems: clothingItems,
    handleLikeClick: handleLikeClick,
    isLoggedIn: isLoggedIn,
  };

  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        const temperature = parseWeatherData(data);
        const weatherLocation = parseLocation(data);
        setTemp(temperature);
        setWeatherLocation(weatherLocation);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    api
    .getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      getUserInfo(token)
        .then((userData) => {
          setIsLoggedIn(true);
          setCurrentUser(userData.data);
        })
        .catch((error) => {
          console.log("Token is invalid. User not logged in.", error);
          setIsLoggedIn(false);
          setCurrentUser({});
          localStorage.removeItem("jwt");
        });
    } else {
      setIsLoggedIn(false);
      setCurrentUser({});
    }
  }, [isLoggedIn]);

  return (
    <Router>
      <div className="App">
        <CurrentUserContext.Provider value={currentUser}>
          <CurrentTemperatureUnitContext.Provider
            value={{
              currentTemperatureUnit,
              setCurrentTemperatureUnit,
              handleToggleSwitchChange,
            }}
          >
            <Header
              onLoginModal={handleLoginModal}
              onRegisterModal={handleRegisterModal}
              onEditProfileModal={handleEditProfileModal}
              onLogout={handleLogout}
              isLoggedIn={isLoggedIn}
              handleCreateModal={handleCreateModal}
              weatherLocation={weatherLocation}
              handleToggleSwitchChange={handleToggleSwitchChange}
            />
            <Routes>
              <Route path="/" element={<Main {...mainProps} />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile {...profileProps} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/*"
                element={
                  isLoggedIn ? <Navigate to="/profile" /> : <Navigate to="/" />
                }
              />
            </Routes>
            <Footer />
            {activeModal === "preview" && (
              <ItemModal
                selectedCard={selectedCard}
                isOpen={activeModal === "preview"}
                onClose={handleCloseModal}
                handleDelete={handleDelete}
                handleDeleteConfirm={handleDeleteConfirm}
              />
            )}
            {activeModal === "delete" && (
              <DeleteConfirmModal
                handleCloseConfirmModal={handleCloseModal}
                handleDelete={handleDelete}
                selectedCard={selectedCard}
              />
            )}
            {activeModal === "create" && (
              <AddItemModal
                isOpen={activeModal === "create"}
                handleCloseModal={handleCloseModal}
                onAddItem={onAddItem}
              />
            )}
            {activeModal === "register" && (
              <RegisterModal
                onOpen={activeModal === "register"}
                handleCloseModal={handleCloseModal}
                onClose={handleCloseModal}
                onRegister={handleRegister}
                setActiveModal={setActiveModal}
              />
            )}
            {activeModal === "login" && (
              <LoginModal
                onOpen={activeModal === "login"}
                onClose={handleCloseModal}
                handleCloseModal={handleCloseModal}
                setActiveModal={setActiveModal}
                onRegister={handleRegisterModal}
                onLogin={handleLogin}
              />
            )}
            {activeModal === "editProfile" && (
              <EditProfileModal
                handleCloseModal={handleCloseModal}
                onClose={handleCloseModal}
                isOpen={activeModal === "editProfile"}
                onSubmit={handleEditProfile}
              />
            )}
          </CurrentTemperatureUnitContext.Provider>
        </CurrentUserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
