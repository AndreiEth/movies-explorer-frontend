import { useContext, useState } from 'react';
import MoviesCardList from '../common/MoviesCardList/MoviesCardList';
import SearchForm from '../common/SearchForm/SearchForm';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { filterMovies } from '../../utils/constants';

function SavedMovies () {
  const { savedMovies } = useContext(CurrentUserContext);
  const [searchMovies, setSearchMovies] = useState(savedMovies);
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmitSearch = (keyWord) => {
    const filtered = filterMovies(savedMovies, keyWord, isShortMovies);

    if (filtered.length) {
      setErrorMessage('');
      setSearchMovies(filtered);
    } else {
      setErrorMessage('Ничего не найдено')
    }
  };

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