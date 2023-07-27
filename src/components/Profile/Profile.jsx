import './Profile.css';
import { useState, useContext, useRef } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import useFormWithValidation from '../../hooks/formWithValidation';
import MainApi from '../../utils/MainApi';
import { VALIDATION } from '../../utils/constants';
import Preloader from '../common/Preloader/Preloader';

function Profile({ signOut, setTooltipSettings, setInfoTooltipPopupOpen }) {
  const userContext = useContext(CurrentUserContext);
  const [userData, setUserData] = useState(userContext.currentUser);
  const [currentError, setCurrentError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const nameInputRef = useRef(false);

  const initialValues = {
    username: userData.name,
    email: userData.email,
  };

  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation({ initialValues });

  async function handleEdit(evt) {
    evt.preventDefault();
    await setIsEdit(true);
    nameInputRef.current.focus();
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    setCurrentError('');
    setIsLoading(true);
    setUserData({
      name: values.username,
      email: values.email,
    });

    MainApi.changeUserInfo({
      name: values.username,
      email: values.email,
    })
      .then((data) => {
        setCurrentError('');
        setIsEdit(false);
        setInfoTooltipPopupOpen(true);
        setTooltipSettings({
          message: 'Ваши данные успешно изменены',
          isSuccess: true,
        });
        resetForm({
          username: data.name,
          email: data.email,
        });
      })
      .catch(async (err) => {
        const { message } = await err.json();
        setTooltipSettings({
          message: 'Что-то пошло не так.',
          isSuccess: false,
        });
        setInfoTooltipPopupOpen(true);
        setCurrentError(message);
      })
      .finally(() => setIsLoading(false));
  }

  const isButtonActive =
    isValid &&
    !isLoading &&
    (values.username !== initialValues.username ||
      values.email !== initialValues.email);

  return (
    <section className='profile'>
      <h1 className='profile__title'>{`Привет, ${userData.name}!`}</h1>
      <form
        className='profile__form'
        onSubmit={handleSubmit}
      >
        <div>
          <div className='profile__input'>
            <label className='profile__text'>Имя</label>
            <input
              className='profile__text-name'
              ref={nameInputRef}
              type='text'
              name='username'
              minLength='2'
              maxLength='30'
              pattern={VALIDATION.username.pattern}
              value={values.username || ''}
              onChange={handleChange}
              disabled={isLoading || !isEdit}
            />
          </div>
          <div className='profile__input'>
            <label className='profile__text'>E-mail</label>
            <input
              className='profile__text-name'
              type='text'
              name='email'
              minLength='5'
              maxLength='30'
              pattern={VALIDATION.email.pattern}
              value={values.email || ''}
              onChange={handleChange}
              disabled={isLoading || !isEdit}
            />
          </div>
        </div>
        {isLoading ? <Preloader /> : ''}
        <p className='profile__error'>{errors.username || errors.email}</p>
        <div className='profile__buttons-wrapper'>
          {isEdit ? (
            <button
              type='submit'
              className='profile__submit-btn'
              disabled={!isButtonActive}
            >
              Сохранить
            </button>
          ) : (
            <button
              type='button'
              className='profile__edit-btn'
              onClick={handleEdit}
            >
              Редактировать
            </button>
          )}
          {!isEdit ? (
            <button
              type='button'
              className='profile__exit-btn'
              onClick={signOut}
            >
              Выйти из аккаунта
            </button>
          ) : (
            ''
          )}
        </div>
      </form>
    </section>
  );
}

export default Profile;
