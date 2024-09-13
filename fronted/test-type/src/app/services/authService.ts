const API_URL = 'https://simuate-test-backend-1.onrender.com/api/auth/login';

const LoginUser = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST', 
    headers: { 'Content-Type': 'application/json' }, 
    body: JSON.stringify({ email, password }), 
  });

  if (!response.ok) {
    const errorData = await response.json(); 
    throw new Error(errorData.message || 'Error en el inicio de sesión'); 
  }

  return response.json(); 
};

export default LoginUser; 
