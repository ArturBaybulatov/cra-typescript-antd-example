/* eslint-disable consistent-return */

import {useState} from 'react';
import {inspect} from 'util';

import {FieldMeta, Form} from 'src/components/form';
import {Input} from 'src/components/input';
import {Select} from 'src/components/select';
import 'src/App.css';

type Fruit = {
  id: string;
  name: string;
};

const fruits: Fruit[] = 'Apple Banana Grape Kiwi Lime Melon Orange Pineapple Strawberry'
  .split(' ')
  .map((name, i) => ({id: i.toString(), name}));

const fields: FieldMeta[] = [
  {
    extra: {
      label: 'Nickname',
      required: true,
      Widget: Input,
    },
    name: 'nickname',
    validate: val => {
      if (val === undefined) return 'Please, input a nickname';
    },
  },
  {
    extra: {
      extraWidgetProps: {
        options: fruits.map(x => ({label: x.name, value: x.id})),
      },
      label: 'Favorite fruit',
      required: true,
      Widget: Select,
    },
    name: 'favoriteFruitId',
    validate: val => {
      if (val === undefined) return 'Please, pick a fruit';
    },
  },
  {
    extra: {
      extraWidgetProps: {
        mode: 'multiple',
        options: fruits.map(x => ({label: x.name, value: x.id})),
      },
      label: 'Consumable fruits',
      required: true,
      Widget: Select,
    },
    name: 'consumableFruitsIds',
    validate: val => {
      if (val === undefined) return 'Please, pick some fruits';
    },
  },
];

type Bird = {
  nickname?: string;
  favoriteFruitId?: Fruit['id'];
  consumableFruitsIds?: Fruit['id'][];
};

function App() {
  const [bird, setBird] = useState<Bird>();

  return (
    <div className="App">
      <div className="mb2 border p1" style={{whiteSpace: 'pre'}}>
        {inspect(bird)}
      </div>

      <Form<Bird> //
        fields={fields}
        onSubmit={setBird}
        values={bird}
      />
    </div>
  );
}

export default App;
