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
import Header from './shared/Header';
import UserItems from './items/pages/UserItems';
import en from './shared/localization/en.json';
import ru from './shared/localization/ru.json';
import locales from './shared/localization/locales';

const messages = {
  [locales.EN]: en,
  [locales.RU]: ru,
};

export default function App() {
  const [locale, setLocale] = useState(localStorage.LOCALE || locales.EN);

  return (
    <Router>

      <IntlProvider
        messages={messages[locale]}
        locale={locale}
        defaultLocale={locale}
      >
        <Header
          selectedLocale={locale}
          onLocaleChange={(event) => {
            localStorage.LOCALE = event.target.value;
            setLocale(event.target.value);
          }}
        />

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
          <Redirect to="/" />
        </Switch>

      </IntlProvider>
    </Router>
  );
}
