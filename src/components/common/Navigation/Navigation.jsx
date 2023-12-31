import './Navigation.css';
import { Link, NavLink } from 'react-router-dom';
import cn from 'classnames';
import Account from '../../../images/icon__COLOR_icon-main.svg';
import hamburger from '../../../images/burger-menu.svg';
import closeBtn from '../../../images/close-btn.svg';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useDevice from '../../../hooks/device';

function Navigation() {
  const { isDesktop } = useDevice();
  const showBurgerMenu = !isDesktop;
  const [isOpen, setIsOpen] = useState(false);

  const { pathname } = useLocation();

  const mainClassNames = cn('navigation__hamburger', {
    'navigation__hamburger-main': pathname === '/',
  });

  const closeNav = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    document.body.classList.toggle('noScroll', isOpen);
  }, [isOpen]);

  return (
    <nav
      className={showBurgerMenu ? "navigation" : "navigation"}
    >
      <button
        className={mainClassNames}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <img
            src={closeBtn}
            alt='close-button'
          />
        ) : (
          <img
            src={hamburger}
            alt='burger-menu'
          />
        )}
      </button>
      <div
        className={cn("navigation__background", { hidden: !isOpen })}
        onClick={closeNav}
      >
        <div
          className={cn("navigation__wrapper")}
          onClick={(event) => event.stopPropagation()}
        >
          <div className={"navigation__content"}>
            {showBurgerMenu && (
              <NavLink
                to='/'
                className='navigation__link'
                onClick={closeNav}
              >
                Главная
              </NavLink>
            )}

            <NavLink
              to='/movies'
              className='navigation__link'
              onClick={closeNav}
            >
              Фильмы
            </NavLink>
            <NavLink
              to='/saved-movies'
              className='navigation__link'
              onClick={closeNav}
            >
              Сохранённые фильмы
            </NavLink>
          </div>
          <div className='navigation__profile-content'>
            <NavLink
              to='/profile'
              className='navigation__link'
              onClick={closeNav}
            >
              Аккаунт
            </NavLink>
            <Link
              to='/profile'
              className='navigation__profile-image-link'
              onClick={closeNav}
            >
              <img
                className='navigation__profile-image'
                src={Account}
                alt='account'
              />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
