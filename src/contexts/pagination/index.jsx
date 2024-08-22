import { createContext, useState } from "react";

export const PaginationContext = createContext({});

function PaginationProvider({children}) {

    const [title, setTitle] = useState('Home');
    const [breadItens, setBreadItens] = useState(['Home']);

    function handlePagination(title, breadItens) {
        setTitle(title)
        setBreadItens(breadItens);
    }

    return(
        <PaginationContext.Provider
            value={{
                title,
                breadItens,
                handlePagination
            }}
        >
            {children}
        </PaginationContext.Provider>
    )
}

export default PaginationProvider;