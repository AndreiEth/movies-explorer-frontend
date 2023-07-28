import './MoviesCard.css';
import { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MainApi from '../../../utils/MainApi';
import CurrentUserContext from '../../../contexts/CurrentUserContext';

function MoviesCard({ movie, saveStatus }) {
  const { nameRU, trailerLink, image, duration } = movie;
  const { pathname } = useLocation();
  const { savedMovies, setSavedMovies } = useContext(CurrentUserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [mainApiId, setMainApiId] = useState('');

  const formatDuration = (time) => {
    const hours = Math.trunc(time / 60);
    const minutes = time % 60;

    return `${hours}ч ${minutes}м`;
  };

  useEffect(() => {
    setIsSaved(saveStatus.isSaved);
    setMainApiId(saveStatus.id);
  }, [saveStatus]);

  const handleSaveMovie = () => {
    setIsLoading(true);
    MainApi.saveMovie(movie)
      .then((data) => {
        setSavedMovies([...savedMovies, data]);
        setIsSaved(true);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const handleDeleteMovie = () => {
    setIsLoading(true);
    MainApi.deleteMovie(mainApiId)
      .then(() => {
        setSavedMovies(
          savedMovies.filter((data) => {
            return data._id !== mainApiId;
          })
        );
        setIsSaved(false);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  return (
    <li className='card'>
      <a
        className='card__link'
        href={trailerLink}
        target='_blank'
        rel='noreferrer'
      >
        <img
          className='card__cover'
          src={image}
          alt={nameRU}
        />
      </a>
      <div className='card__content'>
        <div className='card__wrapper'>
          <p className='card__title'>{nameRU}</p>
          {pathname === '/movies' ? (
            <button
              className={isSaved ? 'card__like-btn_active' : 'card__like-btn'}
              id='likebutton'
              type='button'
              onClick={() => isSaved ? handleDeleteMovie() : handleSaveMovie()}
              disabled={isLoading}
            ></button>
          ) : (
            <button
              className='card__delete-btn'
              id='deletebutton'
              type='button'
              aria-label={'save movie'}
              onClick={handleDeleteMovie}
              disabled={isLoading}
            ></button>
          )}
        </div>
        <p className='card__duration'>{formatDuration(duration)}</p>
      </div>
    </li>
  );
}

export default MoviesCard;
