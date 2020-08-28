import React from 'react';
import './FormSelect.css';
import { Form } from 'react-bootstrap';

type Props = {
  label: string;
  defaultValue: string | undefined;
  data: Array<string>;
  onChange : Function;
};

export default function FormSelect({ label, defaultValue, data, onChange }: Props) {

    const ref = React.createRef<HTMLSelectElement>();

  return (
    <>
      <Form.Group key="selectGroup">
        <span className="popin-sub-title">{label}</span>
        <Form.Control
        ref={ref}
          key="selectCtrl"
          as="select"
          size="lg"
          className="select-text"
          defaultValue={defaultValue}
          onChange={(e) => onChange(e)}
          required
          custom>
          {data.map((datum) => (
            <option key={datum}>{datum}</option>
          ))}
        </Form.Control>
      </Form.Group>
    </>
  );
}
