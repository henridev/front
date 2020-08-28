import React from 'react';
import './FormInput.css';
import { Form } from 'react-bootstrap';

type Props = {
  label: string;
  defaultValue: string | undefined;
  onChange: any;
  upperCase?: boolean;
};

export default function FormInput({ label, defaultValue, onChange, upperCase }: Props) {
  const ref = React.createRef<HTMLInputElement>();

  const toUppercase = (event: any) => {
    if (upperCase) event.target.value = ('' + event.target.value).toUpperCase();
  };

  return (
    <>
      <Form.Group key={label}>
        <span className="popin-sub-title">{label}</span>
        <Form.Control
          ref={ref}
          key="inputCtrl"
          onChange={onChange}
          type="input"
          defaultValue={defaultValue}
          onInput={toUppercase}
          className="font-paris"
          required
        />
      </Form.Group>
    </>
  );
}
