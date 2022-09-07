import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import App from './components/App';
import store from './app/store';
import ToggleColorProvider from './utils/ToggleColor';

ReactDOM.render(
  <Provider store={store}>
    <ToggleColorProvider>
      <BrowserRouter>
        <App />

      </BrowserRouter>

    </ToggleColorProvider>

  </Provider>,

  document.getElementById('root'),
);
