import axios from 'axios';

const signup = async () => {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/register', {
            email: `test_${Date.now()}@example.com`,
            password: 'Password123!',
            interests: ['coding', 'debugging']
        });
        console.log('SUCCESS:', response.data);
    } catch (error) {
        if (error.response) {
            console.error('FAILURE:', error.response.status, error.response.data);
        } else {
            console.error('ERROR:', error.message);
        }
    }
};

signup();
