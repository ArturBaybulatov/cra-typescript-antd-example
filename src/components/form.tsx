/* eslint-disable react/require-default-props */

import {Button, Form as AntForm, FormProps as AntFormProps} from 'antd';
import {ComponentType, CSSProperties} from 'react';
import {Field, FieldRenderProps, Form, FormProps} from 'react-final-form';

import {inspect} from 'util';

export type FieldMeta = {
  extra: {
    extraWidgetProps?: object; // TODO: Improve typing
    label: string;
    required?: boolean;
    Widget: ComponentType | any;
  };
  name: string;
  validate: (val: any) => string | void; // TODO
};

type MyFieldProps = FieldRenderProps<any> & {
  extra: FieldMeta['extra'];
};

const MyField = ({extra, input, meta}: MyFieldProps) => (
  <AntForm.Item
    extra={<div style={{whiteSpace: 'pre'}}>{inspect(input.value)}</div>}
    help={meta.touched && meta.invalid && meta.error}
    label={extra.label}
    required={extra.required}
    validateStatus={meta.touched && meta.invalid ? 'error' : undefined}
  >
    <extra.Widget //
      {...input}
      {...extra.extraWidgetProps}
    />
  </AntForm.Item>
);

type MyFormProps<Values> = {
  antProps?: AntFormProps;
  className?: string;
  fields: FieldMeta[];
  noDeleting?: boolean;
  onDelete?: () => void;
  onSubmit?: FormProps<Values>['onSubmit'];
  style?: CSSProperties;
  values?: Values;
};

export type {MyFormProps as FormProps};

const MyForm = <Values,>({
  antProps,
  className,
  fields,
  noDeleting,
  onDelete,
  onSubmit = () => {},
  style,
  values,
}: MyFormProps<Values>) => (
  <div className={className} style={style}>
    <Form initialValues={values} onSubmit={onSubmit}>
      {({
        form, //
        handleSubmit,
        invalid,
        pristine,
      }) => (
        <AntForm //
          autoComplete="off"
          layout="vertical"
          onFinish={handleSubmit}
          {...antProps}
        >
          {fields.map(field => (
            <div className="mb2" key={field.name}>
              <Field //
                allowNull
                component={MyField}
                format={val => val}
                {...field}
              />
            </div>
          ))}

          <div>
            <Button //
              className="mr2"
              disabled={pristine || invalid}
              htmlType="submit"
              type="primary"
            >
              Submit
            </Button>

            <Button //
              className="mr2"
              disabled={pristine}
              onClick={() => form.reset()}
            >
              Reset
            </Button>

            {onDelete && (
              <Button //
                danger
                disabled={noDeleting}
                onClick={onDelete}
              >
                Delete
              </Button>
            )}
          </div>
        </AntForm>
      )}
    </Form>
  </div>
);

export {MyForm as Form};
