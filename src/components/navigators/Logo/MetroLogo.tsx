import React, { FC, ReactElement, memo } from 'react';
import { useTypedSelector } from '../../../services/hooks/useTypedSelector';

import './MetroLogo.css';

const MetroLogo: FC = (): ReactElement => {
  const lineId = useTypedSelector(({ userState: { user } }) => user?.line_id);

  return (
    <div className="logo-out round font-ubuntu-bold bg-grey p-1 ">
      <span className={`logo-in round metro-line line-${lineId} `}>{lineId}</span>
    </div>
  );
};

export default memo(MetroLogo);
