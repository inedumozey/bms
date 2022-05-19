import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './redux/reducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'

const store = createStore(
  rootReducer, 
  composeWithDevTools(applyMiddleware(thunk))
)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
     <Router>
        <App />
     </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);