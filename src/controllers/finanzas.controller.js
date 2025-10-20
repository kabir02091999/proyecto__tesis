import { pool } from "../db/db.js";


export const registrarMultiplesTransacciones = async (req, res) => {
    // 💡 PASO 1: Desestructurar el array 'transacciones' del body
    // Esto coincide con el JSON que envías: { "transacciones": [...] }
    const { transacciones } = req.body;

    // 2. Validación inicial
    if (!transacciones || transacciones.length === 0) {
        return res.status(400).json({ 
            ok: false, 
            message: "El cuerpo debe contener un array 'transacciones' no vacío." 
        });
    }

    // 3. Mapear los objetos JSON a una matriz de valores
    const valores = transacciones.map(transaccion => {
        if (typeof transaccion.es_ingreso !== 'boolean' || typeof transaccion.monto !== 'number' || !transaccion.descripcion) {
            // Si la validación falla aquí, lanza un error que será atrapado por el 'catch'
            throw new Error("Datos de transacción incompletos o inválidos en la lista.");
        }
        
        return [
            transaccion.es_ingreso,
            transaccion.monto,
            transaccion.descripcion
        ];
    });

    const sql = `
        INSERT INTO transacciones (es_ingreso, monto, descripcion) 
        VALUES ?
    `;

    try {
        // 4. Ejecutar la consulta con el array de arrays [valores]
        const [resultado] = await pool.query(sql, [valores]);

        // 5. Enviar la respuesta de éxito (201 Created)
        return res.status(201).json({ 
            ok: true, 
            message: `Se registraron ${resultado.affectedRows} transacciones exitosamente.`,
            payload: resultado
        });

    } catch (error) {
        // 6. Manejo de errores
        console.error("Error al ejecutar inserción múltiple de transacciones:", error);
        
        let status = 500;
        let message = 'Error interno del servidor al registrar transacciones.';

        if (error.message.includes("Transacción incompleta") || error.message.includes("inválidos")) {
             status = 400;
             message = error.message;
        }

        return res.status(status).json({ 
            ok: false, 
            message: message 
        });
    }
}

export const GetTransacciones = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM transacciones ORDER BY id DESC');
        res.json({ ok: true, data: rows });
    } catch (error) {
        console.error("Error al obtener transacciones:", error);
        res.status(500).json({ ok: false, message: 'Error al obtener transacciones.' });
    }
}