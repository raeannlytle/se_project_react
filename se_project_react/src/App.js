import logo from './logo.svg';
import './App.css';
import './Header/Header.js';

function App() {
  return (
    <div>
     <Header/>
      <main>
        <section id='weather'>
          Weather
        </section>
        <section id='card-section'>
          Card Section
        </section>
      </main>
    </div>
  );
}

export default App;
