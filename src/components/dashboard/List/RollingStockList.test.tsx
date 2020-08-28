import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { createTestStore } from '../../../redux';
import { DashboardDTO } from '../../../services/rollingStockService/rollingStock.api.types';
import { DisinfectionStatus, RollingStockFilter } from '../../../models/rolling-stock.model';
import initStore from '../../../redux/config/initialState';
import RollingStockList from './RollingStockList';

const rollingStocks: DashboardDTO[] = [
  {
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
  },
  {
    id: 2,
    trainCode: '30012',
    isUsed: true,
    isCleanedToday: true,
    disinfectionStatus: DisinfectionStatus.ORANGE,
    NC: new Date(),
    NP: new Date(),
    MEP: new Date(),
    DEGRAF: new Date(),
    DESIN_MOST_RECENT: new Date(),
  },
  {
    id: 3,
    trainCode: '30011',
    isUsed: true,
    isCleanedToday: true,
    disinfectionStatus: DisinfectionStatus.GREY,
    NC: new Date(),
    NP: new Date(),
    MEP: new Date(),
    DEGRAF: new Date(),
  },
];

const renderWithState = (status?: RollingStockFilter) => {
  return render(
    <Provider
      store={createTestStore({
        ...initStore,
        rollingStockState: {
          ...initStore.rollingStockState,
          rollingStocks: [...rollingStocks],
          filter: { status },
        },
      })}>
      <RollingStockList />
    </Provider>,
  );
};

describe('RollingStockList component', () => {
  it('it renders rolling stock', async () => {
    const { findAllByTestId } = renderWithState();
    const renderedStock = await findAllByTestId('traincode-display');
    expect(renderedStock).toHaveLength(3);
  });

  it('it renders non filtered rolling stock', async () => {
    const { findAllByTestId } = renderWithState(RollingStockFilter.COMPLETED);
    const renderedStock = await findAllByTestId('traincode-display');
    expect(renderedStock).toHaveLength(1);
  });
});
