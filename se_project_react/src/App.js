import './App.css';
import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import ModalWithForm from './ModalWithForm/ModalWithForm';


function App() {
  const weatherTemp = '102°F'
  return (
    <div>
      <Header />
      <Main weatherTemp={weatherTemp} />
      <Footer />
      <ModalWithForm title='New garment'>These are the children</ModalWithForm>
    </div>
  );
}

export default App;
