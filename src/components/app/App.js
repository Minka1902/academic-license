import React from 'react';
import { Route, Switch, withRouter, useHistory } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import CurrentDataContext from '../../contexts/CurrentDataContext';
import ProtectedRoute from '../protectedRoute/ProtectedRoute';
import usersApiOBJ from '../../utils/usersApi';
import * as auth from '../../utils/auth';
import Main from '../main/Main';
import Header from '../header/Header';
import * as Buttons from '../buttons/Buttons';
import RightClickMenu from '../rightClickMenu/RightClickMenu';
import LoginPopup from '../popup/LoginPopup';
import Confirm from '../confirm/Confirm';
import Footer from '../footer/Footer';

function App() {
  const currentUserContext = React.useContext(CurrentUserContext);    // eslint-disable-line
  const currentDataContext = React.useContext(CurrentDataContext);    // eslint-disable-line
  const safeDocument = typeof document !== 'undefined' ? document : {};
  const html = safeDocument.documentElement;
  const history = useHistory();
  const [isUserFound, setIsUserFound] = React.useState(true);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(undefined);
  const [data, setData] = React.useState(undefined);

  // ???????????????????????????????????????????????????
  // !!!!!!!!!!!!!     SCROLL handling     !!!!!!!!!!!!!
  // ???????????????????????????????????????????????????
  const noScroll = () => html.classList.add('no-scroll');
  const scroll = () => html.classList.remove('no-scroll');

  // ???????????????????????????????????????????????????
  // !!!!!!!!!!!!!!     USER handling     !!!!!!!!!!!!!!
  // ???????????????????????????????????????????????????
  const isAutoLogin = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt)
        .then((user) => {
          if (user) {
            setCurrentUser(user);
            setLoggedIn(true);
            history.push('/upload-file');
          }
        })
        .catch((err) => {
          console.log(`Check token error: ${err}`);
        });
    }
  };

  const findUserInfo = () => {
    usersApiOBJ
      .getCurrentUser()
      .then((user) => {
        if (user) {
          setCurrentUser(user);
          setLoggedIn(true);
          history.push('/upload-file');
        } else {
          setLoggedIn(false);
        }
      })
      .catch((err) => {
        if (err) {
          console.log(`Error type: ${err.message}`);
          setLoggedIn(false);
        }
      });
  };

  const handleLoginSubmit = (email, password) => {
    usersApiOBJ
      .login({ email, password })
      .then((data) => {
        if (data.jwt) {
          localStorage.setItem('jwt', data.jwt);
        }
        if (data.user._id) {
          setIsUserFound(true);
          findUserInfo();
        }
      })
      .catch((err) => {
        console.log(`Error type: ${err.message}`);
        if ((err === 'Error: 404') || (err.message === 'Failed to fetch')) {
          setIsUserFound(false);
        }
        setLoggedIn(false);
      });
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    setCurrentUser(undefined);
    setData(undefined)
    history.push('/login');
  };

  // ???????????????????????????????????????????????????
  // !!!!!!!!!!!!!     POPUP handling     !!!!!!!!!!!!!!
  // ???????????????????????????????????????????????????
  const closeAllPopups = () => {
    // setIsLoginPopupOpen(false);
  };

  // ???????????????????????????????????????????????????
  // !!!!!!!!!!!!!     ROUTE handling     !!!!!!!!!!!!!!
  // ???????????????????????????????????????????????????

  const handleBackClick = () => {
    history.push('/upload-file');
    setData(undefined);
  };

  const handleSubmitClick = () => {
    history.push('/confirm-submit');
  };

  const buttons = [
    {
      name: 'Back',
      isAllowed: true,
      path: '/upload-file',
      onClick: handleBackClick
    }, {
      name: 'Submit keys',
      isAllowed: true,
      path: '/confirm-submit',
      onClick: handleSubmitClick
    },
  ];

  const rightClickItems = [
    { buttonText: 'sign out', buttonClicked: handleLogout, filter: 'root', isAllowed: true },
    { buttonText: 'submit', buttonClicked: handleSubmitClick, filter: 'main', isAllowed: true },
    { buttonText: 'go back', buttonClicked: handleBackClick, filter: 'app_page-confirm', isAllowed: true },
  ];

  // ???????????????????????????????????????????????????
  // !!!!!!!!!!!!!     EVENT handling     !!!!!!!!!!!!!!
  // ???????????????????????????????????????????????????
  React.useEffect(() => { // * close popup when clicked ESCAPE
    const closeByEscape = (evt) => {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    };

    document.addEventListener('keydown', closeByEscape);
    return () => document.removeEventListener('keydown', closeByEscape);
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => { // * close popup when clicked outside of it
    const closeByClick = (evt) => {
      if (evt.target.classList.contains("popup")) {
        closeAllPopups();
      }
    }

    document.addEventListener('mouseup', closeByClick);
    return () => document.removeEventListener('mouseup', closeByClick);
  });

  // ???????????????????????????????????????????????????
  // !!!!!!!!!!!!!     INIT handling     !!!!!!!!!!!!!!!
  // ???????????????????????????????????????????????????
  React.useEffect(() => { // * close popup when clicked outside of it
    isAutoLogin();
    history.push("/upload-file");
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentDataContext.Provider value={{ data, setData }}>
        <Switch>
          <Route path='/login'>
            <h1 className='section__title'>Welcome, Please Sign in to use this service</h1>
            <LoginPopup
              handleLogin={handleLoginSubmit}
              isOpen={!loggedIn}
              isFound={isUserFound}
              linkText='Add source'
              onClose={closeAllPopups}
              onSignOut={handleLogout}
            />
          </Route>

          <ProtectedRoute exact path='/upload-file' redirectTo='/login' loggedIn={loggedIn}>
            <Main mainClass='app'>
              <Header
                noScroll={noScroll}
                scroll={scroll}
                isLoggedIn={true}
                buttons={history.location.pathName === '/confirm-submit' ? buttons : [buttons[1]]}
                theme={true}
                handleLogout={handleLogout}
              />
            </Main>
          </ProtectedRoute>

          <ProtectedRoute exact path='/confirm-submit' redirectTo='/login' loggedIn={loggedIn}>
            <Confirm mainClass='app_page-confirm' noConfirmation={handleBackClick}>
              <Header
                noScroll={noScroll}
                scroll={scroll}
                isLoggedIn={true}
                buttons={[buttons[0]]}
                theme={true}
                handleLogout={handleLogout}
              />
            </Confirm>
          </ProtectedRoute>

        </Switch>
        <RightClickMenu items={rightClickItems} isLoggedIn={loggedIn} />
        <Footer homeClick={handleBackClick} />
      </CurrentDataContext.Provider>
    </CurrentUserContext.Provider>
  );
};
export default withRouter(App);
