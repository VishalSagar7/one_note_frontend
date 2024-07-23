import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {Provider} from 'react-redux'
import userReducer from './redux/Reducers.js';
import {combineReducers, createStore} from 'redux'

const rootReducer = combineReducers({
  user : userReducer
})

const store = createStore(rootReducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    < Provider store={store}>
      <App />
    </ Provider>
  </StrictMode>
);
