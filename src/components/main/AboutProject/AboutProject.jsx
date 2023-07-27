import "./AboutProject.css";

function AboutProject() {
  return (
    <section className='about-project__section'>
      <div className='about-project__header'>
        <h2 className='about-project__header-text'>О проекте</h2>
      </div>
      <div className='about-project__table'>
        <div className='about-project__table-column'>
          <h2 className='about-project__table-content-text'>
            Дипломный проект включал 5 этапов
          </h2>
          <p className='about-project__table-content-paragraph'>
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className='about-project__table-column'>
          <h2 className='about-project__table-content-text'>
            На выполнение диплома ушло 5 недель
          </h2>
          <p className='about-project__table-content-paragraph'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className='about-project__week-container'>
        <h2 className='about-project__week-text_left'>1 неделя</h2>
        <h2 className='about-project__week-text_right'>4 недели</h2>
        <p className='about-project__week-string_left'>Back-end</p>
        <p className='about-project__week-string_right'>Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;
