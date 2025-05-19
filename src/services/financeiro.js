
import api from "./api";


const getFinanceiro = async (tipo_transacao) => {
    try {
        const response = await api.get(`/financeiro/${tipo_transacao}`, );

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

