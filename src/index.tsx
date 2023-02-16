import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';

import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';

const container = document.getElementById('root')!;
const root = createRoot(container);


const getTransactions = async () => {
  const querySnapshot = await getDocs(collection(db, 'transactions'));
  querySnapshot.forEach((doc) => {
    console.log(doc);
  });
};

getTransactions();


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
