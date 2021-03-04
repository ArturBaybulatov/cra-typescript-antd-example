/* eslint-disable */

import {Input, InputProps, Select, SelectProps} from 'antd';
import {SelectValue} from 'antd/es/select';
import {strict as assert} from 'assert';
import _ from 'lodash';
import {useState} from 'react';
import {inspect} from 'util';

import 'src/App.css';

interface MyInputProps extends Omit<InputProps, 'onChange'> {
  onChange?: (value?: string) => void;
  value?: string;
}

const MyInput = ({
  onChange, //
  value,
  ...restProps
}: MyInputProps) => {
  if (value !== undefined) {
    assert(value !== '', 'Please, use `undefined` for an empty value');
  }

  return (
    <Input
      allowClear
      onChange={({target: {value}}) => onChange?.(value === '' ? undefined : value)}
      value={value === '' ? undefined : value}
      {...restProps}
    />
  );
};

interface MySelectProps<Value> extends SelectProps<Value> {
  onChange?: (value?: Value) => void;
}

const MySelect = <Value extends SelectValue>({
  mode, //
  onChange,
  style,
  value,
  ...restProps
}: MySelectProps<Value>) => {
  if ((mode === 'multiple' || mode === 'tags') && value !== undefined) {
    assert(Array.isArray(value)); // Debug
    assert(value.length !== 0, 'Please, use `undefined` for an empty value');
  }

  return (
    <Select<Value>
      allowClear
      mode={mode}
      onChange={value => {
        if (mode === 'multiple' || mode === 'tags') {
          assert(Array.isArray(value)); // Debug
          onChange?.(value.length === 0 ? undefined : value);
          return;
        }

        onChange?.(value);
      }}
      optionFilterProp="label"
      showArrow // Show dropdown icon in multiple mode too
      showSearch
      style={{width: '100%', ...style}}
      value={value}
      {...restProps}
    />
  );
};

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

        <MyInput //
          onChange={setUsername}
          placeholder="Username"
          value={username}
        />
      </div>

      <div className="mb2">
        <div>{inspect(fruitId)}</div>

        <MySelect<Fruit['value']> //
          onChange={setFruitId}
          options={fruits}
          placeholder="Fruit"
          value={fruitId}
        />
      </div>

      <div>
        <div>{inspect(fruitsIds)}</div>

        <MySelect<Fruit['value'][]>
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
