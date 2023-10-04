import React, { createContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';


export const ToasterContext = createContext({toast})

export function ToasterContextProvider({ children }) {
    const meuToast = toast

    return (
        <ToasterContext.Provider value={{toast: meuToast}} >
            <Toaster />
            {children}
        </ToasterContext.Provider>
    )
}