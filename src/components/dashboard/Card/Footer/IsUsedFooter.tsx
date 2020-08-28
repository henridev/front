import React, { FC, ReactElement, memo } from 'react';
import { useTypedSelector } from '../../../../services/hooks/useTypedSelector';
import { Role } from '../../../../models/role.model';
import ToggleSwitch from '../Switch/ToggleSwitch';

type Props = {
  isUsed: boolean;
  id: number;
  onChangeHandler: any;
};

const IsUsedFooter: FC<Props> = ({ isUsed, id, onChangeHandler }): ReactElement => {
  const userRoles = useTypedSelector((state) =>
    state.userState.user ? state.userState.user.roles : [],
  );

  const isPcc = userRoles.includes(Role.PCC);

  if (isPcc) {
    const notation = isUsed ? 'Oui' : 'Non';
    return (
      <div className="font-paris mr-auto" data-testid="pcc-only">
        <span className="p font-grey-darker">Train utilisé</span>
        <div className="mt-1">
          <ToggleSwitch handler={(_: Event) => onChangeHandler(id)} checked={isUsed} />
          <span className="h5 font-light-black ml-2">{notation}</span>
        </div>
      </div>
    );
  }
  return <span> {isUsed ? 'Utilisé' : 'Non utilisé'} </span>;
};

export default memo(IsUsedFooter);
