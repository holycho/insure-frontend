import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import './assets/scss/app.scss'; // App 樣式
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import 'app/core/services/interceptorsService'; // Axios 全域設定
import 'app/core/services/yupService'; // Yup 全域設定
import environment from 'environments';

console.log('REACT_APP_MODE', process.env.REACT_APP_MODE);
const { mocker } = require('mocks/browser');

const root = ReactDOM.createRoot(
  document.getElementById('insure-app') as HTMLElement
);
// StrictMode 於開發環境中會導致重複渲染
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
let waitingMsw = 0;
async function renderApp() {
  // 根據環境設定來啟動 mockserviceworker (僅限測試單一分頁或 end-to-end 測試)
  // if (process.env.NODE_ENV === 'development') {
  if (environment.browser.useMsw) {
    await mocker.start({
      onUnhandledRequest: 'bypass',
    });
    waitingMsw = 1000;
  }
  // 根據環境設定，於設定時間後掛載
  setTimeout(() => {
    root.render(
      <App />
    );
  }, waitingMsw);
};
renderApp();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
