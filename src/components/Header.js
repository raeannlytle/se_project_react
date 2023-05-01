import '../blocks/Header.css';
import headerLogo from '../images/header-logo.svg';
import headerAvatar from '../images/header-avatar.svg';

const Header = ({onCreateModal}) => {
  return(
    <header className='header'>
    <div className='header__logo'>
      <div>
        <img src={headerLogo} alt='logo'></img>
      </div>
      <div className='header__date'>May 1, Charlotte</div>
    </div>
    <div className='header__avatar'>
      <div>
        <button className='header__button' type='text' onClick={onCreateModal}>+ Add clothes</button>
      </div>
      <div className='header__name'>Raeann Lytle</div>
      <div className='header__avatar'>
        <img className='header__avatar-image' src={headerAvatar} alt='avatar'></img>
      </div>
    </div>
  </header>
  )  
}

export default Header;