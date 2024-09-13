// URL base de la API para la autenticación
const API_URL = 'https://simuate-test-backend-1.onrender.com/api/auth/login';

// Función para iniciar sesión de un usuario
const LoginUser = async (email: string, password: string) => {
  // Realizamos una petición POST a la API de autenticación en la ruta /login
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST', // Método de la petición
    headers: { 'Content-Type': 'application/json' }, // Indicamos que los datos se envían en formato JSON
    body: JSON.stringify({ email, password }), // Convertimos el email y password en un string JSON para enviarlo en el cuerpo de la petición
  });

  // Si la respuesta no es satisfactoria (código de estado no en el rango 200-299)
  if (!response.ok) {
    const errorData = await response.json(); // Extraemos los datos del error en formato JSON
    throw new Error(errorData.message || 'Error en el inicio de sesión'); // Lanzamos un error con un mensaje descriptivo
  }

  return response.json(); // Si la respuesta es satisfactoria, devolvemos los datos de la respuesta en formato JSON
};

export default LoginUser; 
