"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import RegisterForm from '@/app/components/RegisterForm';
import registerUser from '@/app/services/registerService';

interface RegisterFormProps {
  onSubmit: (name: string, email: string, password: string) => Promise<void>;
  error: string;
}

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

const LoginLink = styled.a`
  font-size: 0.875rem;
  font-weight: 500;
  color: #4f46e5;
  &:hover {
    color: #4338ca;
  }
`;

const RegisterPage: React.FC = () => {
  const [error, setError] = useState<string>(''); 
  const router = useRouter();

  
  const handleRegister = async (name: string, email: string, password: string) => {
    try {
      await registerUser(name, email, password);
      router.push('/pages/login'); 
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message); 
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <Container>
      <FormWrapper>
        <div>
          <Title>Crear una cuenta</Title>
        </div>
        <RegisterForm onSubmit={handleRegister} error={error} /> 
        <div className="text-center">
          <LoginLink href="/pages/login">¿Ya tienes una cuenta? Inicia sesión</LoginLink>
        </div>
      </FormWrapper>
    </Container>
  );
};

export default RegisterPage;