import React, { FC, ReactElement, memo } from 'react';
import './ToggleSwitch.css';

type Props = {
  handler: any;
  checked: boolean;
};

const ToggleSwitch: FC<Props> = ({ handler, checked }): ReactElement => {
  return (
    <label className="switch">
      <input type="checkbox" checked={checked} onChange={handler} />
      <span data-testid="slider" className="slider"></span>
    </label>
  );
};

export default memo(ToggleSwitch);
