/* import axios from '.axio.js' */
import axios from 'axios';

const API ="http://localhost:3000/api"

export const login = user => axios.post(`${API}/login`, user);
// función verifyToken post que envia un token por json    
export const verifyToken = token => axios.post(`${API}/verifyToken`, { token });