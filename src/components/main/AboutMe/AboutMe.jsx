import './AboutMe.css';
import Photo from '../../../images/IMG_6277.jpg';

function AboutMe () {
return (
  <section className='about-me'>
    <div className='about-me__section'>
      <div className='about-me__header'>
        <h2 className='about-me__header-text'>Студент</h2>
      </div>
      <div className='about-me__content'>
        <div className='about-me__info'>
          <h2 className='about-me__name'>Андрей</h2>
          <p className='about-me__age'>Фронтенд-разработчик, 23 года</p>
          <p className='about-me__paragraph'>
            Я родился в Сибири, учился в Канаде и Нидерландах на экономических
            факультетах. Английский язык в совершенстве. С 2022 года начал
            кодить. Заканчиваю курсы в Яндекс.Практикуме, и начинаю искать
            работу.
          </p>
          <a
            className='about-me__link'
            href='https://github.com/AndreiEth'
            target='_blank'
            rel='noopener noreferrer'
          >
            Github
          </a>
        </div>
        <img
          src={Photo}
          className='about-me__photo'
          alt='me'
        />
      </div>
    </div>
  </section>
);
}

export default AboutMe