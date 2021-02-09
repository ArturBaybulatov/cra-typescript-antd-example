import {DatePicker, notification} from 'antd';

import 'src/App.css';
import logo from 'src/logo.svg';

function App() {
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
