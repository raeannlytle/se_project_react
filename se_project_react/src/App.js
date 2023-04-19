import './App.css';
import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';


function App() {
  const weatherTemp = '102°F'
  return (
    <div>
      <Header />
      <Main weatherTemp={weatherTemp} />
      <Footer />
    </div>
  );
}

export default App;
