import React, { FC, ReactElement, memo } from 'react';
import { DisinfectionStatus } from '../../../../models/rolling-stock.model';

type Props = { status: DisinfectionStatus };

const StatusBar: FC<Props> = ({ status }): ReactElement => {
  return (
    <div className="statusbar-container">
      <span>Désinfection</span>
      <div className={`statusbar statusbar-${status}`} />
    </div>
  );
};

export default memo(StatusBar);
