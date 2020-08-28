import React, { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { shallowEqual } from 'react-redux';
import { useTypedSelector } from '../../../services/hooks/useTypedSelector';
import FormContent from './FormContent/FormContent';
import FormFooter from './FormFooter/FormFooter';
import FormHeader from './FormHeader/FormHeader';
import './CredentialPopIn.css';
import { useAsyncActions } from '../../../services/hooks/useAsyncActions';

const CredentialPopIn = () => {
  const state = useTypedSelector(({ credentialPopInState }) => credentialPopInState, shallowEqual);

  const { getLines, getRoles } = useAsyncActions();

  useEffect(() => {
    getLines();
    getRoles();
  }, []);

  return (
    <Modal
      show={state.meta.open}
      backdrop="static"
      centered={true}
      dialogClassName="user-pop-in-container"
      size="lg">
      <Modal.Header>
        <FormHeader title="Habilitations" subTitle="Ajouter / Modifier un utilisateur" />
      </Modal.Header>
      <Modal.Body>
        <FormContent />
      </Modal.Body>
      <Modal.Footer>
        <FormFooter />
      </Modal.Footer>
    </Modal>
  );
};

export default CredentialPopIn;
