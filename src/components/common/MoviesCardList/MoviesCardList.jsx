import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import { useLocation } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import CurrentUserContext from '../../../contexts/CurrentUserContext';
import useDevice from '../../../hooks/device';

function MoviesCardList({ movies, showMore }) {
  const { pathname } = useLocation();
  const { isMobile, isBigMobile, isTablet, isBigTablet, isDesktop } =
    useDevice();
  const { savedMovies } = useContext(CurrentUserContext);
  const [moviesLength, setMoviesLength] = useState(0);
  const [isMoreButton, setIsMoreButton] = useState(false);

  const Length = {
    MOBILE: 5,
    TABLET: 8,
    DESKTOP: 12,
  };

  useEffect(() => {
    if (isMobile || isBigMobile) {
      setMoviesLength(Length.MOBILE);
    } else if (isTablet || isBigTablet) {
      setMoviesLength(Length.TABLET);
    } else {
      setMoviesLength(Length.DESKTOP);
    }
  }, [movies.length]);

  useEffect(() => {
    if (showMore) {
      movies.length > moviesLength
        ? setIsMoreButton(true)
        : setIsMoreButton(false);
    } else {
      setIsMoreButton(false);
    }
  }, [pathname, movies.length, moviesLength]);

  const handleMoreBtnClick = () => {
    setMoviesLength((current) => {
      if (isTablet || isBigTablet) {
        return current + 2;
      } else if (isMobile || isBigMobile || isDesktop) 
	  {return current + 3};
    });
  };

  const checkIsSaved = (movie) => {
    const targetMovie = savedMovies.find(
      (film) => film.movieId === movie.movieId
    );
    return targetMovie
      ? { isSaved: true, id: targetMovie._id }
      : { isSaved: false, id: '' };
  };
  const renderMovieCards = () => {
    if (showMore) {
      return movies.length
        ? movies.slice(0, moviesLength).map((movie) => (
            <MoviesCard
              key={movie.movieId}
              movie={movie}
              saveStatus={checkIsSaved(movie)}
            />
          ))
        : '';
    } else {
      return movies.length
        ? movies.map((movie) => (
            <MoviesCard
              key={movie.movieId}
              movie={movie}
              saveStatus={{ isSaved: true, id: movie._id }}
            />
          ))
        : '';
    }
  };
  return (
    <section className='cards'>
      <div className='cards__content'>
        <ul className='cards__list'>{renderMovieCards()}</ul>
        {isMoreButton ? (
          <button
            className='cards__extra-btn'
            type='button'
            onClick={handleMoreBtnClick}
          >
            Ещё
          </button>
        ) : (
          ''
        )}
      </div>
    </section>
  );
}

export default MoviesCardList;
