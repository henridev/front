import React, { FC, ReactElement, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useAsyncActions } from '../services/hooks/useAsyncActions';
import '../assets/styles/pages/Homepage.css';

const { REACT_APP_API_URL = '/api' } = process.env;

const Homepage: FC = (): ReactElement => {
  const { tryLogin } = useAsyncActions();

  useEffect(() => {
    tryLogin();
  }, []);

  async function handleLogin() {
    const isAuthenticated = await tryLogin();
    if (!isAuthenticated) window.location.href = `${REACT_APP_API_URL}/auth/login`;
  }

  return (
    <Container>
      <Row>
        <Col>
          <section className="home-container" onClick={handleLogin}>
            <header className="header-container">
              <span className="home-title font-montserrat-bold">Smart Tracer</span>
            </header>
            <footer className="home-footer font-paris-bold">
              <span>cliquez</span>
              <span>pour vous identifier</span>
            </footer>
          </section>
        </Col>
      </Row>
    </Container>
  );
};

export default Homepage;

