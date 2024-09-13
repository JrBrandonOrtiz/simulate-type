const registerUser = async (name: string, email: string, password: string) => {
    const response = await fetch('https://simuate-test-backend-1.onrender.com/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({ name, email, password }), 
    });
  
    if (!response.ok) {
      const errorData = await response.json(); 
      throw new Error(errorData.message || 'Error en el registro'); 
    }
  
    return response.json(); 
  };
  
  export default registerUser;