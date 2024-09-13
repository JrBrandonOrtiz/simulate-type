// Función para registrar un nuevo usuario
const registerUser = async (name: string, email: string, password: string) => {
    // Realizamos una petición POST a la API de autenticación en la ruta /register
    const response = await fetch('https://simuate-test-backend-1.onrender.com/api/auth/register', {
      method: 'POST', // Método de la petición
      headers: { 'Content-Type': 'application/json' }, // Indicamos que los datos se envían en formato JSON
      body: JSON.stringify({ name, email, password }), // Convertimos el nombre, email y password en un string JSON para enviarlo en el cuerpo de la petición
    });
  
    // Si la respuesta no es satisfactoria (código de estado no en el rango 200-299)
    if (!response.ok) {
      const errorData = await response.json(); // Extraemos los datos del error en formato JSON
      throw new Error(errorData.message || 'Error en el registro'); // Lanzamos un error con un mensaje descriptivo
    }
  
    return response.json(); // Si la respuesta es satisfactoria, devolvemos los datos de la respuesta en formato JSON
  };
  
  export default registerUser;