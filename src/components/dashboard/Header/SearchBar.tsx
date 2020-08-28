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
import './SearchBar.css';

const { TO_DISINFECT, TO_CLEAN, COMPLETED } = RollingStockFilter;

const SearchBar: FC = (): ReactElement => {
  const dispatch = useDispatch();
  const stockcounts = useTypedSelector((state) => state.rollingStockState.statusCounts);
  const status = useTypedSelector((state) => state.rollingStockState.filter.status);

  const handleFilterClick = (newFilerStatus?: RollingStockFilter) =>
    dispatch(setFilterStatus(newFilerStatus));

  return (
    <Row
      className="searchbar justify-content-center align-items-center pt-2"
      style={{ marginLeft: '-10px' }}>
      <Col className="justify-content-center mt-0">
        <section className="mt-3 mt-lg-0 mr-auto justify-content-center align-items-center d-flex justify-content-lg-start align-items-sm-end">
          <CountCard
            handler={() => handleFilterClick(status === TO_CLEAN ? undefined : TO_CLEAN)}
            title="A nettoyer"
            color="pink"
            isActive={status === TO_CLEAN}
            count={stockcounts.toClean}
          />
          <CountCard
            handler={() => handleFilterClick(status === TO_DISINFECT ? undefined : TO_DISINFECT)}
            title="A désinfecter"
            color="grey"
            isActive={status === TO_DISINFECT}
            count={stockcounts.toDisinfect}
          />
          <CountCard
            handler={() => handleFilterClick(status === COMPLETED ? undefined : COMPLETED)}
            title="Complets"
            color="green"
            isActive={status === COMPLETED}
            count={stockcounts.completed}
          />
        </section>
      </Col>
      <Col className="justify-content-center hide-mobile">
        <section>
          <h3 className="font-montserrat-bold  text-center mb-1">
               {stockcounts.total >= 1
                  ? `${stockcounts.total} train${stockcounts.total === 1 ? '' : 's'}`
                  : 'Aucun materiel roulant'}
          </h3>
          <SearchInput />
        </section>
      </Col>
      <Col className="d-flex justify-content-center hide-temp hide-mobile">
        <span className="ml-auto">
          <Button bsPrefix="smtr-btn-primary" className="h5">
            Historique
          </Button>
        </span>
      </Col>
    </Row>
  );
};

export default memo(SearchBar);
