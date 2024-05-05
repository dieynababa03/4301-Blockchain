import axios from 'axios';

// Configure the base URL for the Node.js server
export const nodeApi = axios.create({
    baseURL: 'http://localhost:9000/'
});

// Configure the base URL for the Python server
export const pythonApi = axios.create({
    baseURL: 'http://localhost:5000/'
});
