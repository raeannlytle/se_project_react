import "../blocks/App.css";
import Header from "./Header";
import Main from "./Main";
import Profile from "./Profile";
import Footer from "./Footer";
import ItemModal from "./ItemModal";
import { defaultClothingItems } from "../utils/utils";
import { useEffect, useState } from "react";
import { getForecastWeather, parseWeatherData } from "../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";
import { Routes, Route } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import AddItemModal from "./AddItemModal";
import { getItems, addItems, deleteItems } from "../utils/api";
import {
  loginUser,
  registerUser,
  getUserInfo,
  addCardLike,
  removeCardLike,
  editProfile,
} from "../utils/auth";
import DeleteConfirmModal from "./DeleteConfirmModal";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";

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

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((currentTempState) => {
      return currentTempState === "C" ? "F" : "C";
    });
  };

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          onCreateModal={handleCreateModal}
          onLoginModal={handleLoginModal}
          onRegisterModal={handleRegisterModal}
          isLoggedIn={isLoggedIn}
        />
        <Routes>
          <Route
            exact={true}
            path="/"
            element={
              <Main
                weatherTemp={temp}
                clothingItems={clothingItems}
                onSelectedCard={handleSelectedCard}
                onCardLike={handleCardLike}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                clothingItems={clothingItems}
                onEditProfileModal={handleEditProfileModal}
                onSelectedCard={handleSelectedCard}
                onCreateModal={handleCreateModal}
                onCardLike={handleCardLike}
                onLogout={handleLogout}
              />
            }
          />
        </Routes>
        <Footer />
        {activeModal === "register" && (
          <RegisterModal
            handleCloseModal={handleCloseModal}
            onClose={handleCloseModal}
            onOpen={activeModal === "register"}
            onRegister={handleRegister}
            setActiveModal={setActiveModal}
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
        {activeModal === "preview" && (
          <ItemModal
            selectedCard={selectedCard}
            onClose={handleCloseModal}
            onDeleteItem={handleDeleteItem}
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
          />
        )}
        {activeModal === "create" && (
          <AddItemModal
            handleCloseModal={handleCloseModal}
            onClose={handleCloseModal}
            onOpen={activeModal === "create"}
            onAddItem={handleAddItem}
          />
        )}
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
