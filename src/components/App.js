import "../blocks/App.css";
import Header from "./Header";
import Main from "./Main";
import Profile from "./Profile";
import Footer from "./Footer";
import ItemModal from "./ItemModal";
import { defaultClothingItems } from "../utils/utils";
import { useEffect, useState } from "react";
import { getForecastWeather, parseWeatherData } from "../utils/weatherApi";
import { CurrentTempUnitContext } from "../contexts/CurrentTempUnitContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddItemModal from "./AddItemModal";
import * as api from "../utils/api";
import ModalWithForm from "./ModalWithForm";
import closeButton from '../images/close-button.svg';

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTempUnit, setCurrentTempUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [DeleteConfirm, setDeleteConfirm] = useState(false);

  const handleOpenConfirmModal = () => {
    setDeleteConfirm(true);
  };

  const handleCloseConfirmModal = () => {
    setDeleteConfirm(false);
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

  const handleAddItem = ({ name, link, weatherType }) => {
    api
      .addItems({ name, link, weather: weatherType })
      .then((res) => {
        setClothingItems([res, ...clothingItems]);
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
                <Main
                  weatherTemp={temp}
                  clothingItems={clothingItems}
                  onSelectedCard={handleSelectedCard}
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
                />
              }
            />
            <Route path="/" element={<ModalWithForm />}></Route>
          </Routes>
          <Footer />
          {activeModal === "preview" && (
            <ItemModal
              itemData={selectedCard}
              onClose={handleCloseModal}
              onDelete={handleDeleteItem}
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
          {DeleteConfirm && (
            <div className="modal">
              <div className="modal__confirm-content">
                <div>Are you sure you want to delete this item?</div>
                <div>This action is
                irreversible.</div>
                <button className="modal__confirm-close">
                  <img src={closeButton} alt='close-button' />
                </button>
                <div className="modal__buttons-confirm">
                  <button
                    className="modal__button-confirm"
                    type="button"
                    onClick={handleDeleteItem}
                  >
                    Yes, delete item
                  </button>
                  <button
                    className="modal__button-cancel"
                    type="button"
                    onClick={handleCloseConfirmModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </CurrentTempUnitContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
