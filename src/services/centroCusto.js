
import api from "./api";


const getCentroCusto = async (getByCompany = false) => {
    try {
        const response = await api.get(`/centroCusto?getByCompany=${getByCompany}`, );

        return response.data;
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
};

const deleteCentroCusto = async (id) => {
    try {
        await api.delete(`/centroCusto/${id}`)
        return true
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
};
const saveCentroCusto = async (obj) => {
    try {
        if(obj.id_centro_custo_cco){
            await api.put(`/centroCusto/${obj.id_centro_custo_cco}`, obj, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }else{
            await api.post("/centroCusto", obj, {
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


export { deleteCentroCusto, getCentroCusto, saveCentroCusto };

