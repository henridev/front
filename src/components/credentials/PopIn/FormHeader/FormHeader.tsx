import React from 'react';
import { Modal } from 'react-bootstrap';
import { ReactComponent as Close } from '../../../../assets/icons/svg/button-icons/close.svg';
import './FormHeader.css';
import { useCredentialPopIn } from '../../../../services/hooks/UseCredentialPopIn';
type Props = {
  title: string;
  subTitle: string;
};

export default function FormHeader({ title, subTitle }: Props) {

  const { closeCredentialPopIn } = useCredentialPopIn();

  return (
    <>
      <button type="button" className="close" onClick={() => closeCredentialPopIn()}>
        <Close />
      </button>

      <Modal.Title>
        <span className="popin-title">{title}</span> <br />
        <span className="popin-sub-title">{subTitle}</span>
        <br />
      </Modal.Title>
    </>
  );
}
