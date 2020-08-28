import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { ReactComponent as Close } from '../../../assets/icons/svg/button-icons/close.svg';
import { useCredentialPopIn } from '../../../services/hooks/UseCredentialPopIn';
import ButtonCustom from '../../generic/ButtonCustom';
import './Header.css';

type Props = { title: string; subTitle: string; buttonLabel: string };

function Header({ title, subTitle, buttonLabel }: Props) {
  const { openCredentialPopIn } = useCredentialPopIn();
  return (
    <Container className="credentials-header-container mb-md-3">
      <Row>
        <Col>
          <div className="credentials-header">
            <div className="pl-sm-3">
              <h3 className="font-paris-bold header-title">{title}</h3>
              <span className="font-paris header-subtitle">{subTitle}</span>
            </div>
            <div className="header-container-action-right pr-sm-3">
              <span className="hide-mobile">
                <ButtonCustom type="outlined" text={buttonLabel} action={openCredentialPopIn} />
              </span>
              <span className="show-mobile">
                <ButtonCustom type="outlined" text={'+ Utilisateur'} action={openCredentialPopIn} />
              </span>
              <div className="header-container-action-close hide-mobile">
                <Close />
              </div>
            </div>
          </div>
          <hr className="header-bottom" />
        </Col>
      </Row>
    </Container>
  );
}

export default Header;
