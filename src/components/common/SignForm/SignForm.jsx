import { Link } from 'react-router-dom';
import './SignForm.css';
import Logo from '../../../images/logo.svg';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';
import Preloader from '../Preloader/Preloader';

function SignForm (props) {
  const {
    children,
    titleText,
    formName,
    buttonText,
    questionText,
    linkText,
    link,
    onSubmit,
    isValid,
    isLoading,
  } = props;

  const { pathname } = useLocation();

  const submitButtonClassNames = cn('sign__submit-btn', {
    'sign__submit-btn_disabled': !isValid || isLoading,
  });

  return (
    <section className='sign'>
      <div className='sign__container'>
        <div className='sign__header'>
          <Link
            className='sign__logo-link'
            to='/'
          >
            <img
              src={Logo}
              className='sign__logo'
              alt='logo'
            />
          </Link>
          <h1 className='sign__title'>{titleText}</h1>
        </div>
        <form
          className='sign__form'
          name={`form-${formName}`}
          onSubmit={onSubmit}
        >
          {children}
          {isLoading ? <Preloader /> : ''}
          {pathname === '/signup' ? (
            <button
              type='submit'
              className={submitButtonClassNames}
              disabled={!isValid || isLoading}
            >
              {buttonText}
            </button>
          ) : (
            <button
              type='submit'
              className={submitButtonClassNames}
              id='login-btn'
              disabled={!isValid || isLoading}
            >
              {buttonText}
            </button>
          )}
        </form>
        <p className='sign__question'>
          {questionText}
          <Link
            to={`/${link}`}
            className='sign__link'
          >
            {linkText}
          </Link>
        </p>
      </div>
    </section>
  );
}

export default SignForm;
