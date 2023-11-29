import "../blocks/App.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Profile from "./Profile";
import ItemModal from "./ItemModal";
import React, { useEffect, useState } from "react";
import {
  getForecastWeather,
  parseWeatherData,
  parseLocation,
} from "../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";
import { Switch, Route, Redirect } from "react-router-dom";
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
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import ProtectedRoute from "./ProtectedRoute";
import EditProfileModal from "./EditProfileModal";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [location, setLocation] = useState("");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

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

  const onAddItem = (values) => {
    addItems(values)
      .then((data) => {
        setClothingItems([newItem, ...clothingItems]);
        handleCloseModal();
      })
      .catch(console.error);
  };

  const handleDeleteItem = (selectedCard) => {
    deleteItems(selectedCard)
      .then(() => {
        const newClothingItems = clothingItems.filter((card) => {
          return card._id !== cardId;
        });
        handleCloseModal();
        setClothingItems(newClothingItems);
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

  const handleRegisterSubmit = (email, password, name, avatar) => {
    registerUser({ email, password, name, avatar })
      .then((user) => {
        handleCloseModal();
        handleLogin(email, password);
      })
      .catch(console.error);
  };

  const handleEditProfileSubmit = (name, avatar, token) => {
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

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((currentTempState) => {
      return currentTempState === "C" ? "F" : "C";
    });
  };

  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        const temperature = parseWeatherData(data);
        const city = parseLocation(data);
        setTemp(temperature);
        setLocation(city);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const handleEscape = (evt) => {
      if (evt.key === "Escape") {
        {
          handleCloseModal();
        }
      }
    };
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

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

  useEffect(() => {
    const handleClickClose = (evt) => {
      if (
        evt.target.classList.contains("item_modal") ||
        evt.target.classList.contains("modal")
      ) {
        console.log("handleClickClose");
        handleCloseModal();
      }
    };

    document.addEventListener("click", handleClickClose);

    return () => {
      document.removeEventListener("click", handleClickClose);
    };
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          handleCreateModal={handleCreateModal}
          onLoginModal={handleLoginModal}
          onRegisterModal={handleRegisterModal}
          isLoggedIn={isLoggedIn}
          city={location}
        />
        <Switch>
          <Route exact={true} path="/">
            <Main
              weatherTemp={temp}
              clothingItems={clothingItems}
              onSelectedCard={handleSelectedCard}
              onCardLike={handleCardLike}
              isLoggedIn={isLoggedIn}
            />
          </Route>
          <ProtectedRoute path="/profile" isLoggedIn={isLoggedIn}>
            <Profile
              clothingItems={clothingItems}
              onSelectedCard={handleSelectedCard}
              handleCreateModal={handleCreateModal}
              onEditProfileModal={handleEditProfileModal}
              onCardLike={handleCardLike}
              isLoggedIn={isLoggedIn}
              onLogout={handleLogout}
            />
          </ProtectedRoute>
          <Route exact={true} path="">
            {isLoggedIn ? <Redirect to="/profile" /> : <Redirect to="/" />}
          </Route>
        </Switch>
        <Footer />
        {activeModal === "register" && (
          <RegisterModal
            handleCloseModal={handleCloseModal}
            onClose={handleCloseModal}
            onOpen={activeModal === "register"}
            onRegister={handleRegisterSubmit}
            setActiveModal={setActiveModal}
          />
        )}
        {activeModal === "login" && (
          <LoginModal
            handleCloseModal={handleCloseModal}
            onClose={handleCloseModal}
            onRegister={handleRegisterModal}
            onOpen={activeModal === "login"}
            onLogin={handleLogin}
            setActiveModal={setActiveModal}
          />
        )}
        {activeModal === "preview" && (
          <ItemModal
            selectedCard={selectedCard}
            onClose={handleCloseModal}
            handleDeleteItem={handleDeleteItem}
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
          />
        )}
        {activeModal === "create" && (
          <AddItemModal
            handleCloseModal={handleCloseModal}
            isOpen={activeModal === "create"}
            onAddItem={onAddItem}
          />
        )}
        {activeModal === "editProfile" && (
          <EditProfileModal
            handleCloseModal={handleCloseModal}
            onClose={handleCloseModal}
            onOpen={activeModal === "editProfile"}
            onSubmit={handleEditProfileSubmit}
          />
        )}
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
