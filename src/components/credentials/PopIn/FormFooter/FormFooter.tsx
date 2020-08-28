import React from 'react';
import './FormFooter.css';
import { Button } from 'react-bootstrap';
import { shallowEqual } from 'react-redux';
import { useCredentialPopIn } from '../../../../services/hooks/UseCredentialPopIn';
import { useTypedSelector } from '../../../../services/hooks/useTypedSelector';

export default function FormFooter() {
  const {
    validateCredentialPopIn,
    deleteCredentialPopIn,
    closeCredentialPopIn,
  } = useCredentialPopIn();
  const selectedUser = useTypedSelector(
    ({ credentialPopInState: { selectedUser } }) => selectedUser,
    shallowEqual,
  );

  return (
    <>
      <div className="button-group">
        <div className="left-button">
          <Button
            className="delete-button hover-delete"
            onClick={() => deleteCredentialPopIn()}
            disabled={selectedUser!.id === -1}>
            <span className="delete-button-label">Supprimer</span>
          </Button>
        </div>
        <div className="right-button">
          <Button className="cancel-button hover-cancel" onClick={() => closeCredentialPopIn()}>
            <span className="cancel-button-label">Annuler</span>
          </Button>
          <Button className="save-button hover-save" onClick={() => validateCredentialPopIn()}>
            <span className="save-button-label">Enregistrer</span>
          </Button>
        </div>
      </div>
    </>
  );
}
