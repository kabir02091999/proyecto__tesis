/* import axios from '.axio.js' */
import axios from 'axios';

const API ="http://localhost:3000/api"

export const login = user => axios.post(`${API}/login`, user);