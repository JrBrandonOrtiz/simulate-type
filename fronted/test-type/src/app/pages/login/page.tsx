'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import LoginUser from '@/app/services/authService'; // Importamos la función loginUser.
import LoginForm from '../../components/LoginForm'; // Importamos el componente LoginForm.

// Definimos la interfaz para los datos que regresa el servicio de autenticación.
interface AuthResponse {
  token: string;
}

// Definimos la interfaz para el componente LoginForm
interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  error: string;
}

const LoginPage: React.FC = () => {
  const [error, setError] = useState<string>(''); // Estado para manejar los mensajes de error.
  const router = useRouter(); // Hook para redirigir.

  // Función para manejar el inicio de sesión.
  const handleLogin = async (email: string, password: string) => {
    try {
      const data: AuthResponse = await LoginUser(email, password); // Llamamos a la función loginUser con tipado.
      localStorage.setItem('token', data.token); // Guardamos el token en localStorage.
      router.push('/pages/home'); // Redirigimos al usuario tras el login exitoso.
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message); // Si ocurre un error, lo mostramos.
      } else {
        setError('An unexpected error occurred'); // Mensaje genérico para errores inesperados.
      }
    }
  };

  // Renderizamos el componente de la página de inicio de sesión.
  return (
    <Container>
      <FormWrapper>
        <div>
          <Title>Iniciar sesión</Title> {/* Título de la página de inicio de sesión */}
        </div>
        {/* Formulario de inicio de sesión, pasamos la función handleLogin y el estado de error */}
        <LoginForm onSubmit={handleLogin} error={error} /> {/* Tipado */}
        <div className="text-center">
          {/* Enlace para redirigir a la página de registro */}
          <LoginLink href="/pages/register">¿No tienes una cuenta? Regístrate</LoginLink>
        </div>
      </FormWrapper>
    </Container>
  );
};

export default LoginPage;

// Estilos
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

