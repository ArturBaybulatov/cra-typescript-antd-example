/* eslint-disable react/require-default-props */

import {Select, SelectProps} from 'antd';
import {SelectValue} from 'antd/es/select';
import {strict as assert} from 'assert';

interface MySelectProps<Value> extends SelectProps<Value> {
  onChange?: (value?: Value) => void;
}

export type {MySelectProps as SelectProps};

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

export {MySelect as Select};
