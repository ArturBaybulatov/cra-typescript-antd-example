/* eslint-disable react/require-default-props */

import {Input, InputProps} from 'antd';
import {strict as assert} from 'assert';

interface MyInputProps extends Omit<InputProps, 'onChange'> {
  onChange?: (value?: string) => void;
  value?: string;
}

export default ({
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
