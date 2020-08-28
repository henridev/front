import React, { FC, ReactElement } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { shallowEqual } from 'react-redux';
import { Role } from '../../../models/role.model';
import { AuthorityDTO } from '../../../services/credentialsService/credentials.api.types';
import TableRow from '../TableRow';
import './TableCustom.css';
import { useCredentialPopIn } from '../../../services/hooks/UseCredentialPopIn';
import { useTypedSelector } from '../../../services/hooks/useTypedSelector';

const TableCustom: FC = (): ReactElement => {
  const credentialsData = useTypedSelector(
    (state) => (state.credentialsState.credentials ? state.credentialsState.credentials : []),
    shallowEqual,
  );
  // because a new selector get screated on each component rerender memoizing selectors might be interesting via createSelector

  const { selectUser } = useCredentialPopIn();

  const roleIdToName = (id: number) => {
    switch (id) {
      case Role.ADMIN:
        return 'Administrateur';
      case Role.RP:
        return 'Responsable propreté';
      case Role.SAGENT:
        return 'Agent de maitrise';
      case Role.AGENT:
        return 'Agent de propreté';
      case Role.PCC:
        return 'PCC';
      default:
        return 'Aucun rôle';
    }
  };

  return (
    <Container className="table-container">
      <Row>
        <Col>
          <Table striped borderless bordered hover>
            <thead>
              <tr className="table-header font-paris-bold" key="header">
                <th>Matricule</th>
                <th>Rôle</th>
                <th>Ligne</th>
                <th>Entreprise</th>
              </tr>
            </thead>
            <tbody className="table-body font-paris">
              {credentialsData.map((credentials) => (
                <TableRow
                  key={credentials.id}
                  credentials={credentials}
                  roleNames={credentials.roles?.map((id) => roleIdToName(id))}
                  onRowSelect={(user: AuthorityDTO) => selectUser(user)}
                />
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default TableCustom;
