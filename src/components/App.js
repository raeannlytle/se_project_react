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
import {
  getItems,
  addItem,
  deleteItem,
  addCardLike,
  removeCardLike,
} from "../utils/api";
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

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
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
    setActiveModal("edit");
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

  const onAddItem = (values) => {
    addItem(values)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        handleCloseModal();
      })
      .catch((err) => {
        console.error("Error from onAddItem:", err);
      });
  };

  const handleDeleteItem = (selectedCard) => {
    deleteItem(selectedCard)
      .then(() => {
        const newClothingItems = clothingItems.filter((cards) => {
          return cards._id !== selectedCard._id;
        });
        setClothingItems(newClothingItems);
        handleCloseModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogin = (email, password) => {
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
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
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
      .then((res) => {
        setCurrentUser(res.data);
        handleCloseModal();
      })
      .catch(console.error);
  };

  const handleCardLike = (item, isLiked, currentUser) => {
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
    onCardLike: handleCardLike,
  };

  const mainProps = {
    weatherTemp: temp,
    onSelectedCard: handleSelectedCard,
    clothingItems: clothingItems,
    onCardLike: handleCardLike,
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
    getItems()
      .then((data) => {
        setClothingItems(data.items);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      getUserInfo(token)
        .then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
        })
        .catch(console.error);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <CurrentUserContext.Provider value={currentUser}>
          <CurrentTemperatureUnitContext.Provider
            value={{ currentTemperatureUnit, setCurrentTemperatureUnit }}
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
          </CurrentTemperatureUnitContext.Provider>
        </CurrentUserContext.Provider>
        <Footer />
        {activeModal === "preview" && (
          <ItemModal
            card={selectedCard}
            isOpen={activeModal === "preview"}
            onClose={handleCloseModal}
            onDelete={handleDeleteItem}
            onDeleteConfirm={() => setDeleteConfirm(true)}
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
      </div>
    </Router>
  );
}

export default App;
