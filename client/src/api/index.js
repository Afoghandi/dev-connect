import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

export const createUser = ({ name, email, password }) =>
    API.post('/users', name, email, password);