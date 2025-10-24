// @ts-check

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { deleteReporte, obtenerReportes, PostReportes } from '../api/auth';

const ReportesContext = createContext();

export const useReportes = () => {
    const context = useContext(ReportesContext);
    if (!context) {
        throw new Error("useReportes debe ser usado dentro de un ReportesProvider");
    }
    return context;
};

export const ReportesProvider = ({ children }) => {
    const [reportes, setReportes] = useState([]);
    const [reportesLoading, setReportesLoading] = useState(false); 


    useEffect(()=>{
        async function func() {
            try {
                setReportesLoading(true);
                const response = await obtenerReportes();
                setReportes(response.data);
            } catch (error) {
                console.error('Error al obtener los reportes:', error);
                throw error; 
            } finally {
                setReportesLoading(false);
            }
        }

        func()
    },[setReportesLoading,setReportes])


    const enviarReporte = async (reporteData) => {
        try {
            setReportesLoading(true);
            const response = await PostReportes(reporteData);
            return response.data;
        } catch (error) {
            console.error('Error al enviar el reporte:', error);
            throw error;
        } finally {
            setReportesLoading(false);
        }
    };



    const eliminarReporte = useCallback(async (id) => {
        try {
            setReportesLoading(true);
            
            await deleteReporte(id);
            
            setReportes(prevReportes => prevReportes.filter(r => r.ID_Reporte !== id));
        } catch (error) {
            console.error(`Error al eliminar el reporte ID ${id}:`, error);
            throw error;
        } finally {
            setReportesLoading(false);
        }
    }, []); 

    const contextValue = {
        reportes,
        reportesLoading, 
        enviarReporte,
        eliminarReporte,
    };

    return (
        <ReportesContext.Provider value={contextValue}>
            {children}
        </ReportesContext.Provider>
    );
};