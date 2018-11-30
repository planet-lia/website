import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import { store } from './utils/helpers/store';
import { authActions } from './utils/actions/authActions'

if(localStorage.user){
  store.dispatch(authActions.authenticate(localStorage.user));
}

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));
