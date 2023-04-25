import './App.css';
import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import ModalWithForm from './ModalWithForm/ModalWithForm';
import { useEffect, useState } from "react";
import ItemModal from './ItemModal/ItemModal';
import { getForecastWeather, parseWeatherData } from './utils/weatherApi';



function App() {
  const weatherTemp = '60°F'
  const [activeModal, setActiveModal] = useState('');
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);

  const handleCreateModal = () => {
    setActiveModal('create');
  }

  const handleCloseModal = () => {
    setActiveModal('');
  }

  const handleSelectedCard = (card) => {
    setActiveModal('preview');
    setSelectedCard(card);
  }

  useEffect(() => {
    getForecastWeather().then((data) => {
    const temperature = parseWeatherData(data);
    setTemp(temperature);
    })
  }, []);

  return (
    <div>
      <Header onCreateModal={handleCreateModal} />
      <Main weatherTemp={temp} onSelectCard={handleSelectedCard} />
      <Footer />
      {activeModal === 'create' && (
        <ModalWithForm title='New garment' onClose={handleCloseModal}>
          <label>
            Name
            <input type='text' name='name' minLength='1' maxLength='30'></input>
          </label>
          <label>
            Image
            <input type='url' name='link' minLength='1' maxLength='30'></input>
          </label>
          <p>Select the weather type:</p>
          <div>
            <div>
              <input type='radio' id='hot' value='hot'></input>
              <label>Hot</label>
            </div>
            <div>
              <input type='radio' id='warm' value='warm'></input>
              <label>Warm</label>
            </div>
            <div>
              <input type='radio' id='cold' value='cold'></input>
              <label>Cold</label>
            </div>
          </div>
        </ModalWithForm>
      )}
      {activeModal === 'preview' && <ItemModal selectedCard={selectedCard} onClose={handleCloseModal} />};
    </div>
  );
}

export default App;
