import React, { FC, ReactElement, useState, SyntheticEvent, useEffect } from 'react';
import { useTypedSelector } from '../../services/hooks/useTypedSelector';
import { Endpoints } from '../../routes/endpoint.config';
import { User } from '../../models/user.model';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import { ReactComponent as Close } from '../../assets/icons/svg/nav-icons/close-grey.svg';
import CustomDropDown from './DropDown/CustomDropDown';
import SearchInput from '../dashboard/Header/SearchInput';
import MetroLogo from './Logo/MetroLogo';
import './Navbar.css';

const NavigatorTablet: FC = (): ReactElement => {
  const [displayState, setDisplayState] = useState({
    showNameLogo: true,
    showSearchContainer: false,
    showLookingGlass: true,
  });

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // make sure logo and name reapear when search-container dissapears because of resize
  function handleResize() {
    const windowSize = window.innerWidth;
    const thresHold = 900;
    if (window.location.href.includes('habilitations')) return;
    if (windowSize > thresHold) {
      setDisplayState({
        showNameLogo: true,
        showSearchContainer: false,
        showLookingGlass: true,
      });
    }
  }

  const handleSearchClose = (_: SyntheticEvent<SVGElement, MouseEvent>) =>
    setDisplayState({ showSearchContainer: false, showNameLogo: true, showLookingGlass: true });
  const handleHomeClick = (_: SyntheticEvent<HTMLAnchorElement, MouseEvent>) =>
    setDisplayState({ showSearchContainer: false, showNameLogo: true, showLookingGlass: true });
  const handleLookingGlassClick = (_: SyntheticEvent<SVGElement, MouseEvent>) =>
    setDisplayState({ showSearchContainer: true, showNameLogo: false, showLookingGlass: false });
  const handleHabilitationsClick = (_: SyntheticEvent<HTMLAnchorElement, MouseEvent>) =>
    setDisplayState({ showSearchContainer: false, showNameLogo: true, showLookingGlass: false });

  return (
    <Navbar sticky="top" id="nav-tablet" className="pb-2 font-white font-paris bg-blue nav">
      {displayState.showNameLogo && (
        <>
          <Link to={Endpoints.DASHBOARD} className="pl-md-3 pl-0" onClick={handleHomeClick}>
            <Navbar.Brand as="div" className="h3 p-md-2 font-paris-bold" bsPrefix="home-title">
              Smart Tracer
            </Navbar.Brand>
          </Link>
          <MetroLogo />
        </>
      )}
      <CustomDropDown
        displayHandlers={{ handleLookingGlassClick, handleHabilitationsClick }}
        displayState={displayState}
      />
      {displayState.showSearchContainer && (
        <div className="search-input-container">
          <SearchInput />
          <Close className="pointer" id="close-search-btn" onClick={handleSearchClose} />
        </div>
      )}
    </Navbar>
  );
};

export default NavigatorTablet;
