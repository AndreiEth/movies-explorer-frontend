import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';
import useFormWithValidation from '../../../hooks/formWithValidation';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';

function SearchForm({
  handleSubmitSearch,
  handleChangeCheckbox,
  showError,
  isLoading,
}) {
  const { pathname } = useLocation();
  const { values, setValues, handleChange, isValid, setIsValid } =
    useFormWithValidation();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    isValid
      ? handleSubmitSearch(values.keyWord)
      : showError('Нужно ввести ключевое слово');
  };

  useEffect(() => {
    if (pathname === '/movies') {
      const storageKeyWord = localStorage.getItem('storageKeyWord');
      storageKeyWord && setValues({ keyWord: storageKeyWord });
      setIsValid(true);
    } else {
      setValues({ keyWord: '' });
    }
  }, [pathname]);

  const submitButtonClassNames = cn('search__submit-btn', {
    'search__submit-btn_disabled': isLoading,
  });
  return (
    <section className='search'>
      <div className='search__content'>
        <form
          className='search__form'
          name='form-search'
          onSubmit={handleSubmit}
          noValidate
        >
          <div className='search__form-content'>
            <input
              className='search__input'
              type='text'
              name='keyWord'
              placeholder='Фильм'
              value={values.keyWord || ''}
              required
              minLength='1'
              maxLength='30'
              onChange={handleChange}
              disabled={isLoading}
            />
            <button
              className={submitButtonClassNames}
              type='submit'
              aria-label='Поиск'
              disabled={isLoading}
            />
            <div className='search__stick'></div>
          </div>
        </form>
        <FilterCheckbox handleCheckbox={handleChangeCheckbox} />
      </div>
    </section>
  );
}

export default SearchForm;
