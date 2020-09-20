import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import Users from './user/pages/Users';
import NewItem from './items/pages/NewItem';
import Header from './shared/components/Header';
import UserItems from './items/pages/UserItems';
import en from './shared/localization/en.json';
import ru from './shared/localization/ru.json';
import locales from './shared/localization/locales';
import EditItem from './items/pages/EditItem';
import SignUp from './user/pages/SignUp';
import SignIn from './user/pages/SignIn';
import { AuthContext } from './shared/context/AuthContext';
import Footer from './shared/components/Footer';
import useAuthentication from './shared/hooks/useAuthentication';

const messages = {
  [locales.EN]: en,
  [locales.RU]: ru,
};

export default function App() {
  const [locale, setLocale] = useState(localStorage.LOCALE || locales.EN);
  const {
    userId, currentToken, login, logout,
  } = useAuthentication();

  let ROUTES;
  if (currentToken) {
    ROUTES = (
      <Switch>
        <Route exact path="/">
          <Users />
        </Route>
        <Route exact path="/:userId/items">
          <UserItems />
        </Route>
        <Route exact path="/items/add">
          <NewItem />
        </Route>
        <Route exact path="/items/:itemId">
          <EditItem />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    ROUTES = (
      <Switch>
        <Route exact path="/">
          <Users />
        </Route>
        <Route exact path="/:userId/items">
          <UserItems />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/signin">
          <SignIn />
        </Route>
        <Redirect to="/signin" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider value={{
      isLoggedIn: !!currentToken, currentToken, userId, login, logout,
    }}
    >
      <Router>
        <IntlProvider
          messages={messages[locale]}
          locale={locale}
          defaultLocale={locale}
        >

          <Header />

          {ROUTES}

          <Footer
            selectedLocale={locale}
            onLocaleChange={(event) => {
              localStorage.LOCALE = event.target.value;
              setLocale(event.target.value);
            }}
          />

        </IntlProvider>
      </Router>
    </AuthContext.Provider>
  );
}
