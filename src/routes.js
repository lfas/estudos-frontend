import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from './pages/Login';
import Main from './pages/Main';
import Manage from './pages/Manage';

export default function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Login} />
      <Route path="/student/:id" exact component={Main} />
      <Route path="/student/:id/manage" exact component={Manage} />
    </BrowserRouter>
  );
}