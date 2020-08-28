import React, { FC, ReactElement, memo, useState, ChangeEvent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setFilterCode } from '../../../redux/actions/rollingStockActions';
import { ReactComponent as LookingGlass } from '../../../assets/icons/svg/button-icons/searchglass.svg';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

const SearchInput: FC = (): ReactElement => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');
  useEffect(() => {
    document.addEventListener('keypress', handleEnterPress);
    if (inputValue === '') handleFilterChange();
  }, [inputValue]);

  const handleFilterChange = () => dispatch(setFilterCode(inputValue));

  const handleEnterPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      dispatch(setFilterCode(inputValue));
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <InputGroup className="search-input">
      <FormControl
        type="search"
        placeholder="Rechercher un train"
        aria-label="Rechercher un train"
        value={inputValue}
        onChange={handleInputChange}
      />
      <InputGroup.Append>
        <Button id="search-btn" variant="outline-secondary" onClick={handleFilterChange}>
          <LookingGlass id="searchinput-glass" />
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );
};

export default memo(SearchInput);
