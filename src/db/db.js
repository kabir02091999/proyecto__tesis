import {createPool} from 'mysql2/promise'

export const pool = new createPool({

    host: 'localhost',
    port: 3305,
    user: 'root',
    password: 'kabir',
    database: 'catedraunet',

})