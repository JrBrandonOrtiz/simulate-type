const API_URL = 'https://simuate-test-backend-1.onrender.com/api/auth/login';

interface AuthResponse {
    token: string;
}

const LoginUser = async (email: string, password: string): Promise<AuthResponse> => {
    try {
        const response = await fetch(API_URL, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const text = await response.text();
            if (text.startsWith('<!DOCTYPE')) {
                console.error('Received HTML instead of JSON:', text);
                throw new Error('Received HTML response instead of JSON. Server might be misconfigured.');
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!data || typeof data.token !== 'string') {
            throw new Error('Invalid response data');
        }

        return data as AuthResponse;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

export default LoginUser;
