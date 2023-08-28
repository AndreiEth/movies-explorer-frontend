import './PageNotFound.css';
import { useNavigate } from 'react-router-dom';

function PageNotFound () {
	const navigate = useNavigate();

	return (
    <div className='not-found'>
      <div className='not-found__content'>
        <h1 className='not-found__title'>404</h1>
        <h2 className='not-found__text'>Страница не найдена</h2>
        <button
          type='button'
          className='not-found__link-btn'
          onClick={() => navigate(-1)}
        >
          Назад
        </button>
      </div>
    </div>
  );
}

export default PageNotFound;
