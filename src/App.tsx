/* eslint-disable */

import {useState} from 'react';
import {inspect} from 'util';

import Input from 'src/components/input';
import Select from 'src/components/select';
import 'src/App.css';

type Fruit = {
  id: string;
  name: string;
};

const fruits: Fruit[] = 'Apple Banana Grape Kiwi Lime Melon Orange Pineapple Strawberry'
  .split(' ')
  .map((name, i) => ({id: i.toString(), name}));

function App() {
  const [username, setUsername] = useState<string>();
  const [fruitId, setFruitId] = useState<Fruit['id']>();
  const [fruitsIds, setFruitsIds] = useState<Fruit['id'][]>();

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

        <Select<Fruit['id']> //
          onChange={setFruitId}
          options={fruits.map(x => ({label: x.name, value: x.id}))}
          placeholder="Fruit"
          value={fruitId}
        />
      </div>

      <div>
        <div>{inspect(fruitsIds)}</div>

        <Select<Fruit['id'][]>
          mode="multiple"
          onChange={setFruitsIds}
          options={fruits.map(x => ({label: x.name, value: x.id}))}
          placeholder="Fruits"
          value={fruitsIds}
        />
      </div>
    </div>
  );
}

export default App;
