import React, { EventHandler, FC, memo, ReactElement } from 'react';
import Button from 'react-bootstrap/Button';
import './ButtonCustom.css';

type Props = { type: string; text: string; action?: EventHandler<any> };

const ButtonCustom: FC<Props> = ({ type, text, action }): ReactElement => {
  return (
    <Button onClick={action} variant="primary" className="font-paris-bold bg-blue custom-button">
      {text}
    </Button>
  );
};

export default memo(ButtonCustom);
