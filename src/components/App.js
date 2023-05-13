import "../blocks/App.css";
import Header from "./Header";
import Profile from "./Profile";
import Main from "./Main";
import Footer from "./Footer";
import ItemModal from "./ItemModal";
import AddItemModal from "./AddItemModal";
import React, { useEffect, useState } from "react";
import getWeather, { parseWeatherData, tempUnits } from "../utils/weatherApi";
import { constants } from "../utils/constants";
import itemsApi from "../utils/api";
import "../blocks/ItemModal.css";
import "../blocks/ModalWithForm.css";
import { CurrentTempUnitContext } from "../utils/CurrentTempUnitContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const itemsApiObject = itemsApi();

function App() {
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOPen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [weatherData, setWeatherData] = useState("");
  const [currentTempUnit, setCurrentTempUnit] = useState("F");
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddItem = (name, url, weatherType) => {
    setIsLoading(true);
    itemsApiObject
      .add(name, url, weatherType)
      .then((res) => {
        setItems([res, ...items]);
        setIsFormModalOpen(false);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDeleteItem = (item) => {
    itemsApiObject
      .remove(item)
      .then(() => {
        const filteredItems = items.filter((card) => card.id !== item);
        setItems(filteredItems);
        closeAllModals();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCardClick = (name, url, weather, id) => {
    setIsItemModalOpen(true);
    setModalData({
      name,
      url,
      weather,
      id,
    });
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeAllModals();
    }
  };

  const openConfirmModal = () => {
    setIsConfirmModalOpen(true);
  };

  const openForm = () => {
    setIsFormModalOPen(true);
  };

  const closeAllModals = () => {
    setIsFormModalOPen(false);
    setIsItemModalOpen(false);
    setIsConfirmModalOpen(false);
  };

  const handleConfirmModalClose = () => {
    setIsConfirmModalOpen(false);
  };

  const handleToggleSwitchChange = () => {
    currentTempUnit === "F" ? setCurrentTempUnit("C") : setCurrentTempUnit("F");
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeAllModals();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    getWeather(constants.latitude, constants.longitude, constants.apiKey)
      .then((res) => {
        setWeatherData(tempUnits(parseWeatherData(res)));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    itemsApiObject
      .get()
      .then((res) => {
        setItems(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <BrowserRouter>
        <CurrentTempUnitContext.Provider
          value={{ currentTempUnit, handleToggleSwitchChange }}
        >
          <Header openForm={openForm} />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  clothingItems={items}
                  handleCardClick={handleCardClick}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  openForm={openForm}
                  handleCardClick={handleCardClick}
                  clothingItems={items}
                />
              }
            />
          </Routes>
          <Footer />
          {activeModal === "create" && (
            <ModalWithForm title="New garment" onClose={handleCloseModal}>
              <div className="modal__labels">
                <label className="modal__label">
                  Name
                  <input
                    className="modal__input"
                    placeholder="Name"
                    type="text"
                    name="name"
                    minLength="1"
                    maxLength="30"
                  ></input>
                </label>
                <label className="modal__label">
                  Image
                  <input
                    className="modal__input"
                    placeholder="Image URL"
                    type="url"
                    name="link"
                    minLength="1"
                    maxLength="30"
                  ></input>
                </label>
              </div>
              <p className="modal__paragraph">Select the weather type:</p>
              <div className="modal__buttons">
                <div className="modal__button">
                  <input
                    className="modal__button-input"
                    type="radio"
                    id="hot"
                    value="hot"
                  ></input>
                  <label>Hot</label>
                </div>
                <div className="modal__button">
                  <input
                    className="modal__button-input"
                    type="radio"
                    id="warm"
                    value="warm"
                  ></input>
                  <label>Warm</label>
                </div>
                <div className="modal__button">
                  <input
                    className="modal__button-input"
                    type="radio"
                    id="cold"
                    value="cold"
                  ></input>
                  <label>Cold</label>
                </div>
              </div>
            </ModalWithForm>
          )}
          <ItemModal
            onClose={closeAllModals}
            itemData={modalData}
            isItemModalOpen={isItemModalOpen}
            isConfirmModalOpen={isConfirmModalOpen}
            handleOverlayClick={handleOverlayClick}
            handleDeleteItem={handleDeleteItem}
            openConfirmModal={openConfirmModal}
            handleConfirmModalClose={handleConfirmModalClose}
          />
          <AddItemModal
            onClose={closeAllModals}
            isModalOpen={isFormModalOpen}
            handleOverlayClick={handleOverlayClick}
            onAddItem={handleAddItem}
          />
          ;
        </CurrentTempUnitContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
