import React, { FC, ReactElement, useEffect } from 'react';
import '../../assets/styles/pages/Clearances.css';
import Header from '../../components/credentials/Header/Header';
import UserCredentialPopIn from '../../components/credentials/PopIn/CredentialPopIn';
import TableCustom from '../../components/credentials/TableCustom/TableCustom';
import { useAsyncActions } from '../../services/hooks/useAsyncActions';
import { useTypedSelector } from '../../services/hooks/useTypedSelector';
import { shallowEqual } from 'react-redux';
import SpinnerCustom from '../../components/generic/SpinnerCustom';

const Credentials: FC = (): ReactElement => {
  const { loadCredentials } = useAsyncActions();
  const { isLoaded } = useTypedSelector(({ apiState: { credentials: { isLoaded } } }) => {
    return { isLoaded };
  }, shallowEqual);

  useEffect(() => {
    loadCredentials();
  }, []);

  return (
    <main className="credentials-page page">
      <Header
        title="Habilitations"
        subTitle="Gérez les accès à Smart Tracer"
        buttonLabel={'Ajouter un utilisateur'}
      />
      <section className="credentials-container">
        <UserCredentialPopIn />
        {isLoaded ? <TableCustom /> : <SpinnerCustom />}
      </section>
    </main>
  );
};

export default Credentials;
