import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_URL_API
});

const handleErrors = (error) => {
  console.error('Error:', error);
  return null;
};

export const getPerson = async () => {
  try {
    const response = await api.get('persons');
    return response.data;
  } catch (error) {
    return handleErrors(error);
  }
};

export const addPerson = async (person) => {
  try {
    const response = await api.post('persons',person);
    return response.data;
  } catch (error) {
    return handleErrors(error);
  }
};

export const editPerson = async (person) => {
  try {
    const response = await api.put('persons',person);
    return response.data;
  } catch (error) {
    return handleErrors(error);
  }
};


export const getPersonById = async (id) => {
  try {
    const response = await api.get(`persons/${id}`);
    return response.data;
  } catch (error) {
    return handleErrors(error);
  }
};


export const deletePerson = async (id) => {
  try {
    const response = await api.delete(`persons/${id}`);
    return response.data;
  } catch (error) {
    return handleErrors(error);
  }
};
