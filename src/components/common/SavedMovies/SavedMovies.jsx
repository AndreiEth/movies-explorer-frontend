import { useContext, useState, useEffect } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import CurrentUserContext from '../../../contexts/CurrentUserContext';
import { filterMovies } from '../../../utils/constants';

function SavedMovies () {
  const { savedMovies } = useContext(CurrentUserContext);
  const [searchMovies, setSearchMovies] = useState(savedMovies);
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [keyWord, setKeyWord] = useState(''); 

  const doSearch = () => {
    const filtered = filterMovies(savedMovies, keyWord, isShortMovies);

    if (filtered.length) {
      setErrorMessage('');
      setSearchMovies(filtered);
    } else {
      setErrorMessage('Ничего не найдено')
    }
  };

  const handleSubmitSearch = (keyWord) => {
    setKeyWord(keyWord);
    doSearch();
  };

  useEffect(() => {
    doSearch();
  }, [savedMovies]) 

	return (
    <main>
      <SearchForm
        handleSubmitSearch={handleSubmitSearch}
        handleChangeCheckbox={setIsShortMovies}
        showError={setErrorMessage}
      />
      {errorMessage
        ? <p className='cards__search-message'>{errorMessage}</p>
        : <MoviesCardList movies={searchMovies} showMore={true} />
      }
      
    </main>
  );
}

export default SavedMovies;