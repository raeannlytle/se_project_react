import './App.css';
import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import ModalWithForm from './ModalWithForm/ModalWithForm';
import { useState } from "react";
import ItemModal from './ItemModal/ItemModal';


function App() {
  const weatherTemp = '102°F'
  const [activeModal, setActiveModal] = useState('');
  const [selectedCard, setSelectedCard] = useState({});

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
  return (
    <div>
      <Header onCreateModal={handleCreateModal} />
      <Main weatherTemp={weatherTemp} onSelectCard={handleSelectedCard} />
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
      {activeModal === 'preview' && <ItemModal selectedCard={selectedCard} />};
    </div>
  );
}

export default App;
