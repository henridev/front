import React, { useEffect, FC, ReactElement } from 'react';
import { useAsyncActions } from '../../services/hooks/useAsyncActions';
import Container from 'react-bootstrap/Container';
import RollingStockList from '../../components/dashboard/List/RollingStockList';
import '../../assets/styles/pages/Dashboard.css';
import { useTypedSelector } from '../../services/hooks/useTypedSelector';
import { shallowEqual } from 'react-redux';
import SpinnerCustom from '../../components/generic/SpinnerCustom';
import Header from '../../components/dashboard/Header/Header';
const Dashboard: FC = (): ReactElement => {
  const { loadRollingStock } = useAsyncActions();
  const { isLoaded } = useTypedSelector(({ apiState: { rollingstock: { isLoaded } } }) => {
    return { isLoaded };
  }, shallowEqual);

  useEffect(() => {
    loadRollingStock();
  }, []);

  return (
    <main className="dashboard-page page">
      <Header buttonLabel="Historique" />
      <section className="dashboard-container">
        {isLoaded ? <RollingStockList /> : <SpinnerCustom />}
      </section>
    </main>
  );
};

export default Dashboard;
