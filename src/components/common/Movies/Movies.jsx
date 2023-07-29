import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';
import Preloader from '../Preloader/Preloader';
import { useState, useEffect } from 'react';
import MoviesApi from '../../../utils/MoviesApi';
import { normalizeMovies, filterMovies } from '../../../utils/constants';

function Movies() {
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [keyWord, setKeyWord] = useState('');
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const storageAllMovies =
    JSON.parse(localStorage.getItem('storageAllMovies')) || [];

  useEffect(() => {
    const storageSearchResult =
      JSON.parse(localStorage.getItem('storageSearchResult')) || [];
    const storageKeyWord = localStorage.getItem('storageKeyWord') || '';
    const storageIsShort =
      JSON.parse(localStorage.getItem('storageIsShort')) || false;

    storageSearchResult && setSearchedMovies(storageSearchResult);
    storageKeyWord && setKeyWord(storageKeyWord);
    storageIsShort && setIsShortMovies(storageIsShort);
  }, []);

  const getFilteredMovies = (keyWord, isShortMovies) => {
    if (!storageAllMovies.length) {
      setIsLoading(true);
      MoviesApi.getMovies()
        .then((allMovies) => {
          const normalizedMovies = normalizeMovies(allMovies);
          localStorage.setItem(
            'storageAllMovies',
            JSON.stringify(normalizedMovies)
          );
          const filteredMovies = keyWord
            ? filterMovies(normalizedMovies, keyWord, isShortMovies)
            : [];
          handleFilterResult(filteredMovies);
        })
        .catch((err) => {
          console.log(err);
          setErrorMessage(
            'Во время загрузки сохранённых фильмов произошла ошибка. Подождите немного и попробуйте обновить страницу.'
          );
        })
        .finally(() => setIsLoading(false));
    } else {
      const filteredMovies = keyWord
        ? filterMovies(storageAllMovies, keyWord, isShortMovies)
        : [];
      handleFilterResult(filteredMovies);
    }
  };

  const handleFilterResult = (movies) => {
    setSearchedMovies(movies);
    localStorage.setItem('storageSearchResult', JSON.stringify(movies));
    movies.length === 0
      ? setErrorMessage('Ничего не найдено')
      : setErrorMessage('');
  };

  const handleSubmitSearch = (keyWord) => {
    setKeyWord(keyWord);
    localStorage.setItem('storageKeyWord', keyWord);
    getFilteredMovies(keyWord, isShortMovies);
  };

  const handleChangeCheckbox = (isChecked) => {
    setIsShortMovies(isChecked);
    localStorage.setItem('storageIsShort', isChecked);
    getFilteredMovies(keyWord, isChecked);
  };

  const renderMoviesSection = () => {
    if (errorMessage.length) {
      return <p className='cards__search-message'>{errorMessage}</p>;
    }
    return <MoviesCardList movies={searchedMovies} showMore={true} />;
  };
  return (
    <main>
      <SearchForm
        handleSubmitSearch={handleSubmitSearch}
        handleChangeCheckbox={handleChangeCheckbox}
        showError={setErrorMessage}
        isLoading={isLoading}
      />
      {isLoading ? <Preloader /> : renderMoviesSection()}
    </main>
  );
}

export default Movies;
