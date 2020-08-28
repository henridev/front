import React, { FC, ReactElement, memo } from 'react';
import { AuthorityDTO } from '../../services/credentialsService/credentials.api.types';

type Props = {
  credentials: AuthorityDTO;
  roleNames?: (
    | 'Administrateur'
    | 'Responsable propreté'
    | 'Agent de maitrise'
    | 'Agent de propreté'
    | 'PCC'
    | 'Aucun rôle'
  )[];
  onRowSelect: Function;
};
const TableRow: FC<Props> = ({ credentials, roleNames, onRowSelect }): ReactElement => {
  return (
    <tr key={credentials.id} onClick={() => onRowSelect(credentials)}>
      <td data-label="Matricule">{credentials.registration_number || 'pas trouvé'}</td>
      <td data-label="Rôle">{roleNames?.join(', ') || 'pas trouvé'}</td>
      <td data-label="Ligne">{credentials.line_id || 'pas trouvé'}</td>
      <td data-label="Entreprise">{credentials.organisation || 'pas trouvé'}</td>
    </tr>
  );
};

export default memo(TableRow);
