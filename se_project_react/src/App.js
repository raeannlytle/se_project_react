import logo from './logo.svg';
import './App.css';
import Header from './Header/Header';

function App() {
  return (
    <div>
      <Header />
      <main>
        <section className='weather' id='weather'>
          <div className='weather_info'>
            75F
          </div>
          <img className='weather_image' src='/images/day/day-sunny.svg' />
        </section>
        <section id='card-section'>
          Card Section
        </section>
      </main>
    </div>
  );
}

export default App;
