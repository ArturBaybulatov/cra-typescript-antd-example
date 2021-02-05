import {ConfigProvider, notification} from 'antd';
import 'antd/dist/antd.css';
import antdRuLocale from 'antd/lib/locale/ru_RU';
import moment from 'moment'; // antd transitive dependency
import 'moment/locale/ru';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

moment.locale('ru');

notification.config({
  duration: 0,
  placement: 'topLeft',
});

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={antdRuLocale}>
      <App />
    </ConfigProvider>
  </React.StrictMode>,

  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
