import React, { FC, ReactElement } from 'react';
import { Container } from 'react-bootstrap';
import QrButton from '../../components/scanner/buttons/QrButton';
import NumberButton from '../../components/scanner/buttons/NumberButton';
import '../../assets/styles/pages/Selection.css';

const Selectionpage: FC = (): ReactElement => {
  return (
    <main className="scan-page page">
      <h3 className="scan-page-title font-paris-italic font-paris font-green">
        Identifiez un train…
      </h3>
      <QrButton />
      <NumberButton />
    </main>
  );
};

export default Selectionpage;
