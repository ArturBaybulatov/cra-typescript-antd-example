import {notification} from 'antd';
import moment from 'moment'; // antd transitive dependency
import 'moment/locale/ru';

moment.locale('ru');

notification.config({duration: 0});
