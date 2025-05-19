
import api from "./api";

let cachedPageNumber = 1;
let cachedPerPage = 10;
let cachedType = '';

const getFinanceiro = async (type, pageNumber, perPage) => {
    cachedType = type ?? cachedType
    cachedPageNumber = pageNumber ?? cachedPageNumber;
    cachedPerPage = perPage ?? cachedPerPage;

    try {
        const response = await api.get(`/financeiro?&type=${type}&per_page=${cachedPerPage}&page_number=${cachedPageNumber}`);

        return response.data;
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
};

const saveFinanceiro = async (obj) => {
    console.log(obj);
    try {
        if(obj.id_centro_custo_cco){
            await api.put(`/financeiro/${obj.id_centro_custo_cco}`, obj, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }else{
            await api.post("/financeiro", obj, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        return true;
    } catch (error) {
        console.error("Erro ao buscar:", error);
        return false;
    }
};


export { getFinanceiro, saveFinanceiro };

