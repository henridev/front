import React, { FC, ReactElement } from 'react';
import { ReactComponent as QrCodeSymbol } from '../../../assets/icons/svg/button-icons/qrcode.svg';
import { Link } from 'react-router-dom';
import { Endpoints } from '../../../routes/endpoint.config';

const QrButton: FC = (): ReactElement => {
  return (
    <Link to={Endpoints.PRESTA_QR_SCANNER}>
      <button className="camera-btn">
        <div className="green-card">
          <div className="round svg-container">
            <QrCodeSymbol />
          </div>
        </div>
      </button>
    </Link>
  );
};

export default QrButton;
