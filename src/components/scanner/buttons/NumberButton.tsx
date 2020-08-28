import React, { FC, ReactElement } from 'react';
import { ReactComponent as NumberSymbol } from '../../../assets/icons/svg/button-icons/keyboard-numbers.svg';
import { Endpoints } from '../../../routes/endpoint.config';
import { Link } from 'react-router-dom';

const NumberButton: FC = (): ReactElement => {
  return (
    <Link to={Endpoints.PRESTA_BY_NUMBER}>
      <button className="number-btn">
        <div className="blue-card">
          <div className="round svg-container">
            <NumberSymbol />
          </div>
          <div>SAISIR LE NUMERO</div>
        </div>
      </button>
    </Link>
  );
};

export default NumberButton;
