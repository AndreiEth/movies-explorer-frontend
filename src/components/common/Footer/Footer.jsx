import "./Footer.css";

function Footer() {
  return (
    <footer className='footer'>
      <div className='footer__section'>
        <div className='footer__header-content'>
          <p className='footer__header-text'>
            Учебный проект Яндекс.Практикум х BeatFilm.
          </p>
        </div>
        <div className='footer__content'>
          <p className='footer__content-year'>
            &copy; {new Date().getFullYear()}
          </p>
          <ul className='footer__links'>
            <li>
              <a
                className='footer_link'
                href='https://practicum.yandex.ru/'
                target='_blank'
                rel='noopener noreferrer'
              >
                Яндекс.Практикум
              </a>
            </li>
            <li>
              <a
                className='footer_link'
                href='https://github.com/'
                target='_blank'
                rel='noopener noreferrer'
              >
                Github
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
