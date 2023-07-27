import "./Promo.css";
import web from '../../../images/text__COLOR_landing-logo.svg';

function Promo() {
  return (
    <section className='promo'>
      <div className='promo__section'>
        <div className='promo__text-container'>
          <h1 className='promo__text'>Учебный проект студента факультета </h1>
          <h2 className='promo__text'>Веб-разработки.</h2>
          <p className='promo__paragraph'>
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
        </div>
        <img
          src={web}
          className='promo__web-world'
          alt='web-world'
        />
      </div>
    </section>
  );
}

export default Promo;
