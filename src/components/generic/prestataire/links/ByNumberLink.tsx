import React, { FC, ReactElement, SyntheticEvent } from 'react';
import { ReactComponent as NumberSymbol } from '../../../assets/icons/svg/button-icons/keyboard-numbers.svg';

type Props = {
  clickHandler: (event: SyntheticEvent) => void;
};

const ByNumberLink: FC<Props> = ({ clickHandler }): ReactElement => {
  return (
    <button onClick={clickHandler} className="number-btn">
      <div className="blue-card">
        <div className="round svg-container">
          <NumberSymbol />
        </div>
        <div>SAISIR LE NUMERO</div>
      </div>
    </button>
  );
};

export default ByNumberLink;
