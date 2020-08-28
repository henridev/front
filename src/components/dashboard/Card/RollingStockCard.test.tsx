import React from 'react';
import { Provider } from 'react-redux';
import { render, waitForElement } from '@testing-library/react';
import { createTestStore } from '../../../redux';
import { DashboardDTO } from '../../../services/rollingStockService/rollingStock.api.types';
import { RollingStockFilter, DisinfectionStatus } from '../../../models/rolling-stock.model';
import initStore from '../../../redux/config/initialState';
import RollingStockCard from './RollingStockCard';

const rollingStock: DashboardDTO = {
  id: 1,
  trainCode: '30013',
  isUsed: true,
  isCleanedToday: true,
  disinfectionStatus: DisinfectionStatus.GREEN,
  NC: new Date(),
  NP: new Date(),
  MEP: new Date(),
  DEGRAF: new Date(),
  DESIN_MOST_RECENT: new Date(),
  DESIN_BEFORE_MOST_RECENT: new Date(),
};

const renderWithState = () => {
  return render(
    <Provider
      store={createTestStore({
        ...initStore,
        userState: {
          user: {
            id: 1,
            registration_number: 'ABC123',
            line_id: '12',
            organisation: 'RATP',
            roles: [4],
          },
          authenticated: true,
        },
      })}>
      <RollingStockCard rollingStock={rollingStock} />
    </Provider>,
  );
};

describe('RollingStockCard component', () => {
  it('it renders is used toggle if user is pcc', async () => {
    const { getByTestId } = renderWithState();
    await waitForElement(() => getByTestId('pcc-only'));
  });

  it('it shows a black traincode in case rollingstock was cleaned within 24h', async () => {
    const { getByTestId } = renderWithState();
    expect(getByTestId('traincode-display')).toHaveClass('font-black');
  });
});
