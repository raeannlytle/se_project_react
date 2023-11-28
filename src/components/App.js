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
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import AddItemModal from "./AddItemModal";
import * as api from "../utils/api";
import * as apiAuth from '../utils/auth';
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
  const [currentUser, setCurrentUser] = useState(null);
  const [userRegistration, setUserRegistration] = useState({
    username: "",
    avatar: "",
    email: "",
    password: "",
  });
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");

    isLiked
      ? apiAuth
          .addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((c) => (c._id === id ? updatedCard : c))
            );
          })
          .catch((err) => console.log(err))
      : apiAuth
          .removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((c) => (c._id === id ? updatedCard : c))
            );
          })
          .catch((err) => console.log(err));
  };

  const handleRegister = () => {
    apiAuth
      .registerUser(userRegistration)
      .then(() => {
        handleCloseModal();
        handleLogin();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleLogin = () => {
    apiAuth
      .loginUser(userLogin)
      .then((res) => {
        console.log("Login response:", res);
        if (res.access) {
          localStorage.setItem("jwt", res.token);
          setCurrentUser({
            id: res.user.id,
            username: res.user.username,
            email: res.user.email,
          });
          setIsLoggedIn(true);
        } else {
          console.error("Login failed. Server did not provide access");
        }
      })
      .catch((e) => {
        console.error("Login error:", e);
      });
  };

  const handleOpenConfirmModal = () => {
    setActiveModal("delete");
  };

  const handleCloseConfirmModal = () => {
    setActiveModal("");
  };

  const handleCreateModal = () => {
    setActiveModal("create");
    setSelectedCard({});
  };

  const handleCloseModal = () => {
    setActiveModal("");
    setSelectedCard({});
  };

  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
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

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((currentTempState) => {
      return currentTempState === "C" ? "F" : "C";
    });
  };

  const handleAddItem = ({ name, link, weatherType }) => {
    api
      .addItems({ name, link, weather: weatherType })
      .then((res) => {
        setClothingItems([...clothingItems, res]);
        handleCloseModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteItem = (id) => {
    api
      .deleteItems(id)
      .then(() => {
        const filteredCards = clothingItems.filter((card) => card._id !== id);
        setClothingItems(filteredCards);
        handleCloseModal();
        handleCloseConfirmModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <BrowserRouter>
      <CurrentUserContext.Provider value={{ currentUser, isLoggedIn }}>
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <Header onCreateModal={handleCreateModal} />
          <Routes>
            <Route
              exact={true}
              path="/"
              element={
                <Main
                  weatherTemp={temp}
                  clothingItems={clothingItems}
                  onSelectedCard={handleSelectedCard}
                  handleCardLike={handleCardLike}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  items={clothingItems}
                  onSelectedCard={handleSelectedCard}
                  onCreateModal={handleCreateModal}
                  handleCardLike={handleCardLike}
                  onSignOut={handleSignOut}
                />
              }
            />
            <Route
              path="/login"
              element={
                <LoginModal
                  onClose={handleCloseModal}
                  onLogin={handleLogin}
                  setUserLogin={setUserLogin}
                />
              }
            />
          </Routes>
          <Footer />
          {activeModal === "register" && (
            <RegisterModal
              onClose={handleCloseModal}
              onRegister={handleRegister}
            />
          )}
          {activeModal === "login" && (
            <LoginModal
              onClose={handleCloseModal}
              onLogin={handleLogin}
              setUserLogin={setUserLogin}
            />
          )}
          {activeModal === "preview" && (
            <ItemModal
              itemData={selectedCard}
              onClose={handleCloseModal}
              onDelete={handleOpenConfirmModal}
              handleOpenConfirmModal={handleOpenConfirmModal}
            />
          )}
          {activeModal === "create" && (
            <AddItemModal
              onClose={handleCloseModal}
              onCreateModal={handleCreateModal}
              onAddItem={handleAddItem}
            />
          )}
          {activeModal === "delete" && (
            <DeleteConfirmModal
              handleDeleteItem={() => handleDeleteItem(selectedCard._id)}
              handleCloseConfirmModal={handleCloseConfirmModal}
              selectedCard={selectedCard}
            />
          )}
        </CurrentTemperatureUnitContext.Provider>
      </CurrentUserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
