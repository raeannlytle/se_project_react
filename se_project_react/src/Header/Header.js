import './Header.css';

const Header = () => {
  return(
    <header className='header'>
    <div className='header__logo'>
      <div>
        <img src={require('../images/logo.svg').default} alt='logo'></img>
      </div>
      <div>Date</div>
    </div>
    <div className='header__avatar-logo'>
      <div>
        <button type='text'>Add clothes</button>
      </div>
      <div>Terrence Tegegne</div>
      <div>
        <img src={require('../images/header-avatar.svg').default} alt='avatar'></img>
      </div>
    </div>
  </header>
  )  
}

export default Header;