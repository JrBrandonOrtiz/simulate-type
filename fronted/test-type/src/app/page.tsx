'use client';

import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const Page: React.FC = () => {
  return (
    <Container>
      <ContentWrapper>
        <Heading>Bienvenido A PostWork</Heading>
        <ButtonGroup>
          <StyledLink href="/pages/login">Iniciar sesión</StyledLink>
          <RegisterLink href="pages/register">Registrarse</RegisterLink>
        </ButtonGroup>
      </ContentWrapper>
    </Container>
  );
};

export default Page;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #6dd5ed, #2193b0); 
  padding: 3rem 1rem;
`;

const ContentWrapper = styled.div`
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #ffffff; 
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15); 
  gap: 1.5rem;
`;

const Heading = styled.h1`
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  color: #333333; 
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const StyledLink = styled(Link)`
  display: block;
  text-align: center;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  background-color: #4f46e5; 
  border-radius: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3); 

  &:hover {
    background-color: #4338ca; 
    transform: translateY(-2px); 
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.5); 
  }
`;

const RegisterLink = styled(StyledLink)`
  background-color: #10b981;
  
  &:hover {
    background-color: #059669; 
  }

  &:focus {
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.5);
  }
`;
