import "../blocks/App.css";
import Header from "./Header";
import Main from "./Main";
import Profile from "./Profile";
import Footer from "./Footer";
import ItemModal from "./ItemModal";
import { defaultClothingItems } from "../utils/utils";
import { useEffect, useState } from "react";
import { getForecastWeather, parseWeatherData } from "../utils/weatherApi";
import { CurrentTempUnitContext } from "../utils/CurrentTempUnitContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddItemModal from "./AddItemModal";
import * as api from "../utils/api";
import ModalWithForm from "./ModalWithForm";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTempUnit, setCurrentTempUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);

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

  const handleDeleteItem = (item) => {
    api.deleteItems(item._id).then(() => {
      const filteredCards = clothingItems.filter(
        (card) => card._id !== item._id
      );
      setClothingItems(filteredCards);
      handleCloseModal();
    })
    .catch((error) => {
      console.log(error);
    })
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
            />
          )}
          {activeModal === "create" && (
            <AddItemModal
              onClose={handleCloseModal}
              isOpen={handleCreateModal}
              onAddItem={handleAddItem}
            />
          )}
        </CurrentTempUnitContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
