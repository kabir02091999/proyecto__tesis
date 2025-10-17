import { createContext , useState, useContext , useEffect } from "react";

export const FinancieroContext = createContext();

export const useFinancieroContext = () => {
    const context = useContext(FinancieroContext);
    if (!context) throw new Error('There is no FinancieroProvider');
    return context;
}

export const FinancieroProvider = ({children}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    

    useEffect(() => {
        console.log("Financiero Context Mounted");
    }, []);

    return (
        <FinancieroContext.Provider value={{}}>
            {children} 
        </FinancieroContext.Provider>
    )
}
    