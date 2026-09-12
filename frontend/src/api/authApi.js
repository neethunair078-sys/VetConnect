import api from './axios'

export const registerPetOwner  = async (userData) => {
    const response = await api.post('/auth/register/', userData);
    return response.data;
};

export const loginUser = async (userData) => {
    const response = await api.post('/auth/login/', userData);
    return response.data;
};

export const doctorRegister = async (doctorData) => {
  const response = await api.post("/auth/doctor/register/", doctorData);
  return response.data;
};

export const logoutUser = async (refreshToken, accessToken) => {
    const response = await api.post('/auth/logout/',
        { 
            refresh: refreshToken 
        },
        {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        }
    );
    return response.data;
}




