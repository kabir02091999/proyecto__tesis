import axios from '.axio.js'

export const iniciarSesion= user = axios.post('/login', user);
export const VeridicarToken= token => axios.get('/verify-token')