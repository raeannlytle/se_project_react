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
import { getForecastWeather, parseWeatherData } from "../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import AddItemModal from "./AddItemModal";
import {
  getItems,
  addItems,
  deleteItems,
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

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

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

  const handleAddItem = (values) => {
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
  };

  const handleDeleteItem = (cardId, token) => {
    deleteItems(cardId, token)
      .then((res) => {
        const newClothingItems = clothingItems.filter((card) => {
          return card._id !== cardId;
        });
        handleCloseModal();
        setClothingItems(newClothingItems);
      })
      .catch(console.error);
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
      .then((res) => {
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
      : removeCardLike(item._id, currentUser._id, token).then((updatedCard) => {
          setClothingItems((clothingItems) =>
            clothingItems.map((card) =>
              card._id === item._id ? updatedCard : card
            )
          );
        });
  };

  const profileProps = {
    clothingItems: clothingItems,
    handleCreateModal: handleCreateModal,
    onSelectedCard: handleSelectedCard,
    onEditProfileModal: handleEditProfileModal,
    onLogout: handleLogout,
    isLoggedIn: isLoggedIn,
    onCardLike: handleCardLike,
  }

  const mainProps = {
    weatherTemp: temp,
    onSelectedCard: handleSelectedCard,
    clothingItems: clothingItems,
    onCardLike: handleCardLike,
    isLoggedIn: isLoggedIn,
  }

  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        const temperature = parseWeatherData(data);
        setTemp(temperature);
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
        <ItemModal
          card={selectedCard}
          isOpen={activeModal === "preview"}
          onClose={handleCloseModal}
          onDelete={handleDeleteItem}
          onDeleteConfirm={() => setDeleteConfirm(true)}
        />
        <AddItemModal
          isOpen={activeModal === "create"}
          onClose={handleCloseModal}
          onAddItem={handleAddItem}
        />
        <DeleteConfirmModal
          isOpen={deleteConfirm}
          onClose={() => setDeleteConfirm(false)}
          onDelete={() => handleDeleteItem(selectedCard._id)}
        />
        <RegisterModal
          isOpen={activeModal === "register"}
          onClose={handleCloseModal}
          onRegister={handleRegister}
        />
        <LoginModal
          isOpen={activeModal === "login"}
          onClose={handleCloseModal}
          onLogin={handleLogin}
        />
      </div>
    </Router>
  );
}

export default App;
