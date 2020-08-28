import React, { FC, ReactElement } from 'react';
import { ReactComponent as QrCodeSymbol } from '../../../assets/icons/svg/button-icons/qrcode.svg';
import { Link } from 'react-router-dom';
import { Endpoints } from '../../../../routes/endpoint.config';

const QrScannerLink: FC = (): ReactElement => {
  return (
    <button className="camera-btn">
      <Link to={Endpoints.PRESTA_QR_SCANNER}>
        <div className="green-card">
          <div className="round svg-container">
            <QrCodeSymbol />
          </div>
        </div>
      </Link>
    </button>
  );
};

export default QrScannerLink;
