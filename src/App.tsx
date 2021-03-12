import {DatePicker, message, notification} from 'antd';
import {useEffect} from 'react';
import {useRoute} from 'react-router5';
import {inspect} from 'util';

import {isNumeric} from 'src/util';

import './App.css';
import logo from './logo.svg';

function App() {
  const {route} = useRoute();

  useEffect(() => {
    let foo: number | undefined;

    if (isNumeric(route.params.foo)) {
      foo = Number(route.params.foo);
    } else if ('foo' in route.params) {
      message.error('Invalid address parameter');
      return;
    }

    message.info(inspect(foo));
  }, [route.params.foo]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
        <DatePicker
          onChange={mDate =>
            notification.info({
              message: mDate == null ? 'Date cleared' : 'The selected date',
              description: mDate?.toDate().toISOString(),
            })
          }
        />
      </header>
    </div>
  );
}

export default App;
