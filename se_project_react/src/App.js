import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div>
      <header className='header'>
        <div className='header__logo'>
          <div>
            <img src='/images/header-logo.svg' alt='logo'></img>
          </div>
          <div>Date</div>
        </div>
        <div className='header__avatar-logo'>
          <div>
            <button type='text'>Add clothes</button>
          </div>
          <div>Terrence Tegegne</div>
          <div>
            <img src='/images/header-avatar.svg' alt='avatar'></img>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
