import "../blocks/App.css";
import Header from "./Header";
import Profile from "./Profile";
import Main from "./Main";
import Footer from "./Footer";
import ItemModal from "./ItemModal";
import AddItemModal from "./AddItemModal";
import React, { useEffect, useState } from "react";
import getWeather, { parseWeatherData, tempUnits } from "../utils/weatherApi";
import itemsApi from "../utils/api";
import "../blocks/Modal.css";
import "../blocks/ModalWithForm.css";
import { CurrentTemperatureUnitContext } from "../utils/CurrenTempUnitContext";
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
    setCurrentTempUnit((currentTempState) => {
      return currentTempState === "C" ? "F" : "C";
    });
  };

  return (
    <div>
      <BrowserRouter>
        <CurrentTempUnitContext.Provider
          value={{ currentTempUnit, handleToggleSwitchChange }}
        >
          <Header onCreateModal={handleCreateModal} />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Main weatherTemp={temp} onSelectCard={handleSelectedCard} />
              }
            />
            <Route path="/profile" element={<Profile />} />
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
          {activeModal === "preview" && (
            <ItemModal selectedCard={selectedCard} onClose={handleCloseModal} />
          )}
          ;
        </CurrentTempUnitContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
