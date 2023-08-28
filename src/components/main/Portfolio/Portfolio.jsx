import "./Portfolio.css";

function Portfolio() {
  return (
    <section className='portfolio'>
      <div className='portfolio__section'>
        <h2 className='portfolio__text'>Портфолио</h2>
        <ul className='portfolio__list-projects'>
          <li className='portfolio__project'>
            <a
              className='portfolio__project-link'
              href='https://andreieth.github.io/russian-travel/index.html'
              target='_blank'
              rel='noopener noreferrer'
            >
              Адаптивный сайт
            </a>
            <a
              className='portfolio__project-link'
              href='https://andreieth.github.io/russian-travel/index.html'
              target='_blank'
              rel='noopener noreferrer'
            >
              ↗
            </a>
          </li>
          <li className='portfolio__project'>
            <a
              className='portfolio__project-link'
              href='https://github.com/AndreiEth/react-mesto-api-full-gha'
              target='_blank'
              rel='noopener noreferrer'
            >
              Одностраничное приложение
            </a>
            <a
              className='portfolio__project-link'
              href='https://github.com/AndreiEth/react-mesto-api-full-gha'
              target='_blank'
              rel='noopener noreferrer'
            >
              ↗
            </a>
          </li>
          <li className='portfolio__project'>
            <a
              className='portfolio__project-link'
              href='https://github.com/AndreiEth/Pet-six-cities'
              target='_blank'
              rel='noopener noreferrer'
            >
              Приложение поиска отелей
            </a>
            <a
              className='portfolio__project-link'
              href='https://github.com/SeverInvest/how-to-learn'
              target='_blank'
              rel='noopener noreferrer'
            >
              ↗
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Portfolio;
