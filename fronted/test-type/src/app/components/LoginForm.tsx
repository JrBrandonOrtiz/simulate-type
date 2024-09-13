import React, { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  margin-top: 2rem;
`;

const InputGroup = styled.div`
  border-radius: 0.375rem;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  appearance: none;
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  margin-bottom: 0.5rem;
  color: #1f2937;
  font-size: 0.875rem;
  line-height: 1.25rem;
  &:focus {
    outline: none;
    border-color: #6366f1;
    z-index: 10;
  }
`;

const SubmitButton = styled.button`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  color: white;
  background-color: #4f46e5;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #4338ca;
  }
  &:focus {
    outline: none;
  }
`;

const ErrorText = styled.div`
  color: #f56565;
  text-align: center;
`;


interface LoginFormProps {

    onSubmit: (email: string, password: string) => Promise<void>;

    error: string;
  }
  

  const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, error }) => {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
  

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault(); 
      onSubmit(email, password); 
    };
  
    return (

      <Form onSubmit={handleSubmit}>

        {error && <ErrorText>{error}</ErrorText>}
        <input type="hidden" name="remember" defaultValue="true" />

        <InputGroup>
          <Input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="Correo electrónico"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
        </InputGroup>
        <SubmitButton type="submit">Iniciar sesión</SubmitButton>
      </Form>
    );
  };
  
  export default LoginForm;