import SignForm from '../common/SignForm/SignForm';
import useFormWithValidation from '../../hooks/formWithValidation';
import { VALIDATION } from '../../utils/constants';

function Register({ handleRegister, isLoading }) {
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleRegister(values.username, values.email, values.password);
  };
  return (
    <SignForm
      titleText='Добро пожаловать!'
      formName='register'
      buttonText='Зарегистрироваться'
      questionText='Уже зарегистрированы?'
      linkText='Войти'
      link='signin'
      isLoading={isLoading}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <div>
        <label
          htmlFor='name'
          className='form__label'
        >
          Имя
          <input
            className='form__input'
            type='text'
            name='username'
            id='name'
            minLength='2'
            maxLength='30'
            required
            value={values.username || ''}
            pattern={VALIDATION.username.pattern}
            onChange={handleChange}
            disabled={isLoading}
          />
          <span
            className='sign__error'
            id='email-error'
          >
            {errors.username}
          </span>
        </label>

        <label
          htmlFor='email'
          className='form__label'
        >
          E-mail
          <input
            className='form__input'
            type='email'
            name='email'
            id='email'
            minLength='5'
            maxLength='30'
            required
            value={values.email || ''}
            pattern={VALIDATION.email.pattern}
            onChange={handleChange}
            disabled={isLoading}
          />
          <span
            className='sign__error'
            id='email-error'
          >
            {errors.email}
          </span>
        </label>

        <label
          htmlFor='email'
          className='form__label'
        >
          Пароль
          <input
            className='form__input'
            type='password'
            name='password'
            id='password'
            minLength='4'
            maxLength='30'
            required
            value={values.password || ''}
            onChange={handleChange}
            disabled={isLoading}
          />
          <span
            className='sign__error'
            id='password-error'
          >
            {errors.password}
          </span>
        </label>
      </div>
    </SignForm>
  );
}

export default Register;
