import {ConfigProvider} from 'antd';
import 'antd/dist/antd.css';
import antdRuLocale from 'antd/lib/locale/ru_RU';
import {StrictMode} from 'react';
import ReactDOM from 'react-dom';

import 'src/global';
import App from 'src/App2';
import 'src/index.css';
import reportWebVitals from 'src/reportWebVitals';

ReactDOM.render(
  <StrictMode>
    <ConfigProvider locale={antdRuLocale}>
      <App />
    </ConfigProvider>
  </StrictMode>,

  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
