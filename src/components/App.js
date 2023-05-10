import "../blocks/App.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ModalWithForm from "./ModalWithForm";
import { useEffect, useState } from "react";
import ItemModal from "./ItemModal";
import { getForecastWeather, parseWeatherData } from "../utils/weatherApi";
import CurrentTempUnitContext from "../utils/CurrenTempUnitContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./Profile";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTempUnit, setCurrentTempUnit] = useState("F");

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
