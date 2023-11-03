import ReactDOM from 'react-dom/client';
import React, {createContext} from 'react';
import App from './App';
import UserStore from "./store/UserStore";
import BookStore from './store/BookStore';

export const Context = createContext(null);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={
    {isAuth: new UserStore(),
     books: new BookStore(),
    }
  }>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Context.Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

