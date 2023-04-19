import './App.css';
import Header from './Header/Header';
import Main from './Main/Main';


function App() {
  const weatherTemp = '102°F'
  return (
    <div>
      <Header />
      <Main weatherTemp={weatherTemp} />
      <footer>
        <div>
          Developed by Raeann Lytle
        </div>
        <div>
          2023
        </div>
      </footer>
    </div>
  );
}

export default App;
