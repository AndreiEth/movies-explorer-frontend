import { Link, useLocation } from 'react-router-dom';
import Logo from '../../../images/logo.svg';
import './Header.css';
import cn from 'classnames';
import Navigation from '../Navigation/Navigation';

function Header({ loggedIn }) {
  const { pathname } = useLocation();

  const headerClassNames = cn('header', {
    'header_background-main': pathname === '/',
  });
  return (
    <header className={headerClassNames}>
      <section className='header__section'>
        <Link
          className='header__logo-link'
          to='/'
        >
          <img
            src={Logo}
            className='header__logo'
            alt='logo'
          />
        </Link>
        {loggedIn ? (
          <>
            <Navigation />
          </>
        ) : (
          <nav className='header__navigate'>
            <Link
              className='header__link-register'
              to='/signup'
            >
              Регистрация
            </Link>
            <Link
              className='header__button-signin'
              to='/signin'
            >
              Войти
            </Link>
          </nav>
        )}
      </section>
    </header>
  );
}

export default Header;
