import React, { FC, ReactElement, memo } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../services/hooks/useTypedSelector';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CountCard from './CountCard';
import SearchInput from './SearchInput';
import { setFilterStatus } from '../../../redux/actions/rollingStockActions';
import { RollingStockFilter } from '../../../models/rolling-stock.model';
import { Container } from 'react-bootstrap';
import './Header.css';

type Props = { buttonLabel: string };
const { TO_DISINFECT, TO_CLEAN, COMPLETED } = RollingStockFilter;

const Header: FC<Props> = ({ buttonLabel }): ReactElement => {
  const dispatch = useDispatch();
  const stockcounts = useTypedSelector((state) => state.rollingStockState.statusCounts);
  const status = useTypedSelector((state) => state.rollingStockState.filter.status);

  const handleFilterClick = (statusClicked: RollingStockFilter) => {
    statusClicked === status
      ? dispatch(setFilterStatus(undefined))
      : dispatch(setFilterStatus(statusClicked));
  };

  return (
    <Container className="dashboard-header-container mb-3">
      <Container className="dashboard-header">
        <Row className="searchbar">
          <Col className="justify-content-center mt-0">
            <section className="count-container justify-content-lg-start align-items-sm-end">
              <CountCard
                handler={() => handleFilterClick(TO_CLEAN)}
                title="A nettoyer"
                color="pink"
                isActive={status === TO_CLEAN}
                count={stockcounts.toClean}
              />
              <CountCard
                handler={() => handleFilterClick(TO_DISINFECT)}
                title="A désinfecter"
                color="grey"
                isActive={status === TO_DISINFECT}
                count={stockcounts.toDisinfect}
              />
              <CountCard
                handler={() => handleFilterClick(COMPLETED)}
                title="Complets"
                color="green"
                isActive={status === COMPLETED}
                count={stockcounts.completed}
              />
            </section>
          </Col>
          <Col className="justify-content-center hide-mobile">
            <section>
              <h3 className="font-montserrat-bold  text-center mb-3">
                {stockcounts.total >= 1
                  ? `${stockcounts.total} train${stockcounts.total === 1 ? '' : 's'}`
                  : 'Aucun materiel roulant'}
              </h3>
              <SearchInput />
            </section>
          </Col>
          <Col className="d-flex justify-content-center align-items-center hide-mobile">
            <span className="dashed-separator"></span>
            <Button id="history-btn" className="h5" bsPrefix="smtr-btn-primary">
              {buttonLabel}
            </Button>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default memo(Header);
