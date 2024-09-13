'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import LoginUser from '@/app/services/authService'; 
import LoginForm from '../../components/LoginForm'; 

interface AuthResponse {
  token: string;
}

interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  error: string;
}

const LoginPage: React.FC = () => {
  const [error, setError] = useState<string>('');
  const router = useRouter(); 

  const handleLogin = async (email: string, password: string) => {
    try {
      const data: AuthResponse = await LoginUser(email, password); 
      localStorage.setItem('token', data.token); 
      router.push('/pages/home');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message); 
      } else {
        setError('An unexpected error occurred'); 
      }
    }
  };

  return (
    <Container>
      <FormWrapper>
        <div>
          <Title>Iniciar sesión</Title>
        </div>
        <LoginForm onSubmit={handleLogin} error={error} /> 
        <div className="text-center">
          <LoginLink href="/pages/register">¿No tienes una cuenta? Regístrate</LoginLink>
        </div>
      </FormWrapper>
    </Container>
  );
};

export default LoginPage;


const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9fafb;
  padding: 3rem 1rem;
`;

const FormWrapper = styled.div`
  max-width: 28rem;
  width: 100%;
`;

const Title = styled.h2`
  margin-top: 1.5rem;
  text-align: center;
  font-size: 1.875rem;
  font-weight: 800;
  color: #1f2937;
`;

const LoginLink = styled(Link)`
  font-size: 0.875rem;
  font-weight: 500;
  color: #4f46e5;
  &:hover {
    color: #4338ca;
  }
`;

