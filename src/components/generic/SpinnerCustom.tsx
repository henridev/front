import React from 'react';
import { Spinner } from 'react-bootstrap';
import './SpinnerCustom.css';

export default function SpinnerCustom() {
  return (
    <div className="spinner-container">
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
}
