import '../blocks/Header.css';

const Header = ({onCreateModal}) => {
  return(
    <header className='header'>
    <div className='header__logo'>
      <div>
        <img src={require('../images/header-logo.svg').default} alt='logo'></img>
      </div>
      <div className='header__date'>June 15, New York</div>
    </div>
    <div className='header__avatar'>
      <div>
        <button className='header__button' type='text' onClick={onCreateModal}>+ Add clothes</button>
      </div>
      <div className='header__name'>Terrence Tegegne</div>
      <div className='header__avatar'>
        <img className='header__avatar-image' src={require('../images/header-avatar.svg').default} alt='avatar'></img>
      </div>
    </div>
  </header>
  )  
}

export default Header;