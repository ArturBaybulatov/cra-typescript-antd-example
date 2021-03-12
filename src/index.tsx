import {ConfigProvider, notification} from 'antd';
import 'antd/dist/antd.css';
import antdRuLocale from 'antd/lib/locale/ru_RU';
import moment from 'moment'; // antd transitive dependency
import 'moment/locale/ru';
import {StrictMode} from 'react';
import ReactDOM from 'react-dom';
import {RouterProvider} from 'react-router5';

import App from 'src/App';
import 'src/index.css';
import reportWebVitals from 'src/reportWebVitals';
import router from 'src/router';

moment.locale('ru');

notification.config({
  duration: 0,
  placement: 'topLeft',
});

router.start(() => {
  ReactDOM.render(
    <StrictMode>
      <RouterProvider router={router}>
        <ConfigProvider locale={antdRuLocale}>
          <App />
        </ConfigProvider>
      </RouterProvider>
    </StrictMode>,

    document.getElementById('root'),
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
