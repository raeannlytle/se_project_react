import './App.css';
import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import ModalWithForm from './ModalWithForm/ModalWithForm';


function App() {
  const weatherTemp = '102°F'
  const { activeModal, setActiveModal } = useState('');
  return (
    <div>
      <Header />
      <Main weatherTemp={weatherTemp} />
      <Footer />
      {activeModal === 'create' && (
        <ModalWithForm title='New garment'>
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
    </div>
  );
}

export default App;
