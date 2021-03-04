/* eslint-disable */

import {useState} from 'react';
import {inspect} from 'util';

import Input from 'src/components/input';
import Select from 'src/components/select';
import 'src/App.css';

type Fruit = {
  label: string;
  value: string;
};

const fruits: Fruit[] = 'Apple Banana Grape Kiwi Lime Melon Orange Pineapple Strawberry'
  .split(' ')
  .map((label, i) => ({label, value: i.toString()}));

function App() {
  const [username, setUsername] = useState<string>();
  const [fruitId, setFruitId] = useState<Fruit['value']>();
  const [fruitsIds, setFruitsIds] = useState<Fruit['value'][]>();

  return (
    <div className="App">
      <div className="mb2">
        <div>{inspect(username)}</div>

        <Input //
          onChange={setUsername}
          placeholder="Username"
          value={username}
        />
      </div>

      <div className="mb2">
        <div>{inspect(fruitId)}</div>

        <Select<Fruit['value']> //
          onChange={setFruitId}
          options={fruits}
          placeholder="Fruit"
          value={fruitId}
        />
      </div>

      <div>
        <div>{inspect(fruitsIds)}</div>

        <Select<Fruit['value'][]>
          mode="multiple"
          onChange={setFruitsIds}
          options={fruits}
          placeholder="Fruits"
          value={fruitsIds}
        />
      </div>
    </div>
  );
}

export default App;
