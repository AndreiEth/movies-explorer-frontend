import React from 'react';
import Main from '../main/Main/Main';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Movies from '../common/Movies/Movies';
import Header from '../common/Header/Header';
import Footer from '../common/Footer/Footer';
import SavedMovies from '../common/SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import Profile from '../Profile/Profile';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import MainApi from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import InfoTooltip from '../common/InfoTooltip/InfoTooltip';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(null);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tooltipSettings, setTooltipSettings] = useState({
    message: '',
    isSuccess: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      MainApi.setToken();
      Promise.all([MainApi.getUserInfo(), MainApi.getSavedMovies()])
        .then(([me, apiSavedMovies]) => {
          setCurrentUser(me);
          setSavedMovies(
            apiSavedMovies.filter((film) => film.owner === me._id)
          );
        })
        .catch(async (err) => {
          const { message } = await err.json();
          setTooltipSettings({
            message,
            isSuccess: false,
          });
          setInfoTooltipPopupOpen(true);
        })
        .finally(() => {});
    }
  }, [loggedIn]);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      MainApi.checkToken(jwt)
        .then((res) => {
          setCurrentUser(res);
          setLoggedIn(true);
        })
        .catch((err) => {
          console.log(err);
          signOut();
        });
    } else setLoggedIn(false);
  }, [navigate]);

  const closeAllPopups = () => {
    setInfoTooltipPopupOpen(false);
  };

  const handleOverlayClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      closeAllPopups();
    }
  };

  const handleLogin = (email, password) => {
    setIsLoading(true);
    MainApi.login(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
        setTooltipSettings({
          message: 'Всё прошло успешно!',
          isSuccess: true,
        });
        setInfoTooltipPopupOpen(true);
      })
      .catch(async (err) => {
        const { message } = await err.json();
        setTooltipSettings({
          message,
          isSuccess: false,
        });
        setInfoTooltipPopupOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleRegister = (name, email, password) => {
    setIsLoading(true);
    MainApi.register(name, email, password)
      .then(() => {
        handleLogin(email, password);
      })
      .catch(async (err) => {
        const { message } = await err.json();
        setTooltipSettings({
          message,
          isSuccess: false,
        });
        setInfoTooltipPopupOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const signOut = () => {
    localStorage.clear();
    setLoggedIn(true);
    setCurrentUser({});
    setSavedMovies([]);
    setIsLoading(false);
    closeAllPopups();
    navigate('/');
  };

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, setCurrentUser, savedMovies, setSavedMovies }}
    >
      <div className='page'>
        <Routes>
          <Route
            exact
            path='/'
            element={
              <>
                <Header loggedIn={loggedIn} />
                <Main />
                <Footer />
              </>
            }
          />
          <Route
            path='/movies'
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Header loggedIn={loggedIn} />
                <Movies />
                <Footer />
              </ProtectedRoute>
            }
          />
          <Route
            path='/saved-movies'
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Header loggedIn={loggedIn} />
                <SavedMovies />
                <Footer />
              </ProtectedRoute>
            }
          />
          <Route
            path='/signup'
            element={
              loggedIn ? (
                <Navigate to='/movies' />
              ) : (
                <Register
                  handleRegister={handleRegister}
                  isLoading={isLoading}
                />
              )
            }
          />
          <Route
            path='/signin'
            element={
              loggedIn ? (
                <Navigate to='/movies' />
              ) : (
                <Login
                  handleLogin={handleLogin}
                  isLoading={isLoading}
                />
              )
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Header loggedIn={loggedIn} />
                <Profile
                  signOut={signOut}
                  setTooltipSettings={setTooltipSettings}
                  setInfoTooltipPopupOpen={setInfoTooltipPopupOpen}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path='*'
            element={<PageNotFound />}
          />
        </Routes>
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          tooltipSettings={tooltipSettings}
          onOverlayClick={handleOverlayClick}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
