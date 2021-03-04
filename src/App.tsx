/* eslint-disable */

import {Input, InputProps, Select, SelectProps} from 'antd';
import {strict as assert} from 'assert';
import _ from 'lodash';
import {useState} from 'react';
import {inspect} from 'util';

import 'src/App.css';

interface MyInputProps extends InputProps {}
const MyInput = (props: MyInputProps) => <Input {...props} />;

interface MySelectProps<Value> extends SelectProps<Value> {}
const MySelect = <Value,>(props: MySelectProps<Value>) => <Select {...props} />;

type Option = {
  label: string;
  value: string;
};

const options: Option[] = _.times(10, i => ({
  label: `Option ${i}`,
  value: i.toString(),
}));

function App() {
  const [inputValue, setInputValue] = useState<string>();
  const [selectValue, setSelectValue] = useState<Option['value'][]>();

  return (
    <div className="App">
      <div className="mb2">
        <div>{inspect(inputValue)}</div>

        <MyInput //
          allowClear
          onChange={({target: {value}}) => setInputValue(value)}
          value={inputValue}
        />
      </div>

      <div>
        <div>{inspect(selectValue)}</div>

        <MySelect<Option['value'][]>
          allowClear
          mode="multiple"
          onChange={value => setSelectValue(value)}
          optionFilterProp="label"
          options={options}
          showArrow // Show dropdown icon in multiple mode too
          showSearch
          style={{width: '100%'}}
          value={selectValue}
        />
      </div>
    </div>
  );
}

export default App;
