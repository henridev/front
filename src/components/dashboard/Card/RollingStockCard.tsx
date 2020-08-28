import React, { FC, ReactElement, memo } from 'react';
import { useAsyncActions } from '../../../services/hooks/useAsyncActions';
import { DashboardDTO } from '../../../services/rollingStockService/rollingStock.api.types';
import { DisinfectionStatus } from '../../../models/rolling-stock.model';

import Card from 'react-bootstrap/Card';
import StatusBar from './Status/StatusBar';
import PrestationList from './Prestation/PrestationList';
import IsUsedFooter from './Footer/IsUsedFooter';
import './RollingStockCard.css';

type Props = {
  rollingStock: DashboardDTO;
};

const RollingStockCard: FC<Props> = ({ rollingStock }): ReactElement => {
  const { toggleUsedStatus } = useAsyncActions();

  const onUsedStatusChange = (id: number) => {
    toggleUsedStatus(id, !rollingStock.isUsed);
  };

  return (
    <Card className="rollingstock">
      <Card.Body className="rollingstock-body">
        <h2
          data-testid="traincode-display"
          className={`font-paris-bold ${rollingStock.isCleanedToday ? 'font-black' : 'font-pink'}`}>
          {rollingStock.trainCode}
        </h2>
        <StatusBar
          status={
            rollingStock.disinfectionStatus
              ? rollingStock.disinfectionStatus
              : DisinfectionStatus.GREY
          }
        />
        <PrestationList
          NC={rollingStock.NC}
          MEP={rollingStock.MEP}
          NP={rollingStock.NP}
          DEG={rollingStock.DEGRAF}
        />
      </Card.Body>
      <Card.Footer className="d-flex align-items-center justify-content-center rollingstock-footer">
        <IsUsedFooter
          isUsed={rollingStock.isUsed}
          id={rollingStock.id}
          onChangeHandler={onUsedStatusChange}
        />
      </Card.Footer>
    </Card>
  );
};

export default memo(RollingStockCard);
