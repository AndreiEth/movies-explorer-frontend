import SignForm from '../common/SignForm/SignForm';
import useFormWithValidation from '../../hooks/formWithValidation';
import { VALIDATION } from '../../utils/constants';

function Login({ handleLogin, isLoading }) {
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleLogin(values.email, values.password);
  };

  return (
    <SignForm
      titleText='Рады видеть!'
      formName='login'
      buttonText='Войти'
      questionText='Ещё не зарегистрированы?'
      linkText='Регистрация'
      link='signup'
      onSubmit={handleSubmit}
      isValid={isValid}
      isLoading={isLoading}
    >
      <div>
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
          htmlFor='password'
          className='form__label'
        >
          Пароль
          <input
            className='form__input'
            type='password'
            name='password'
            id='password'
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

export default Login;
