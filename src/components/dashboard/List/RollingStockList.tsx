import React, { FC, ReactElement, useState, useEffect } from 'react';
import { shallowEqual, useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../services/hooks/useTypedSelector';
import { DashboardDTO } from '../../../services/rollingStockService/rollingStock.api.types';
import CardColumns from 'react-bootstrap/CardColumns';
import RollingStockCard from '../Card/RollingStockCard';
import { DisinfectionStatus, RollingStockFilter } from '../../../models/rolling-stock.model';
import { setStatusCounts } from '../../../redux/actions/rollingStockActions';
import { calcStatusCount } from '../../../services/utils/Utils';
import { Container } from 'react-bootstrap';

const RollingStockList: FC = (): ReactElement => {
  const dispatch = useDispatch();
  const [displayedStock, setDisplayedStock] = useState<DashboardDTO[]>([]);
  const { rollingStocks, filter } = useTypedSelector(
    ({ rollingStockState: { rollingStocks, filter } }) => {
      return { rollingStocks, filter };
    },
    shallowEqual,
  );

  useEffect(() => {
    const filteredStock = applyFilter();
    if (!filter.code && !filter.status) {
      setDisplayedStock(rollingStocks);
    }
    if (filter.code) {
      updateCounts(filteredStock);
    } else {
      updateCounts(rollingStocks);
    }
  }, [filter.code, filter.status, rollingStocks]);

  function applyFilter(): DashboardDTO[] {
    if (!rollingStocks || rollingStocks.length < 1) return [];
    // no filters take the base state

    const filteredStock = rollingStocks.filter(filterCb);

    if (filter.status === RollingStockFilter.TO_DISINFECT) {
      setDisplayedStock(filteredStock.concat().sort(sortCb));
    } else {
      setDisplayedStock(filteredStock);
    }

    return filteredStock;
  }

  function updateCounts(filteredStock: DashboardDTO[]): void {
    const count = calcStatusCount(filteredStock);
    dispatch(setStatusCounts(count));
  }

  function sortCb(rsA: DashboardDTO, rsB: DashboardDTO) {
    if (filter.status === RollingStockFilter.TO_DISINFECT)
      if (
        rsA.disinfectionStatus === DisinfectionStatus.ORANGE &&
        rsB.disinfectionStatus === DisinfectionStatus.GREY
      ) {
        return 1;
      } else if (
        rsB.disinfectionStatus === DisinfectionStatus.ORANGE &&
        rsA.disinfectionStatus === DisinfectionStatus.GREY
      ) {
        return -1;
      }
    return 0;
  }

  function filterCb(rollingStock: DashboardDTO): boolean {
    if (
      filter.code &&
      !rollingStock.trainCode.toLowerCase().startsWith(filter.code.toLowerCase())
    ) {
      return false;
    }

    switch (filter.status) {
      case RollingStockFilter.TO_CLEAN:
        return !rollingStock.isCleanedToday;

      case RollingStockFilter.TO_DISINFECT:
        return rollingStock.disinfectionStatus !== DisinfectionStatus.GREEN;

      case RollingStockFilter.COMPLETED:
        return rollingStock.disinfectionStatus === DisinfectionStatus.GREEN &&
          rollingStock.isCleanedToday
          ? true
          : false;

      default:
        return true;
    }
  }

  return (
    <Container>
      <CardColumns bsPrefix="rollingstocks-container mt-1">
        {displayedStock.map((rollingStock: DashboardDTO) => {
          return <RollingStockCard key={rollingStock.id} rollingStock={rollingStock} />;
        })}
      </CardColumns>
    </Container>
  );
};

export default RollingStockList;
