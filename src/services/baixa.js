
import api from "./api";


const getBaixas = async (tipoMovimentacao) => {
    try {
        const response = await api.get(`/movimentacao`, {
            params: {
                tipoMovimentacao
            }
        });

        return response.data;
    } catch (error) {
        // console.error("Erro ao buscar:", error);
        return [];
    }
};
const deleteBaixa = async (id) => {
    try {
        // const response = await api.get("/service");
        // if(obj.id_movimentacao_mov){
        //     const response = await api.put(`/baixa/${obj.id_servico_ser}`, obj);
        //     return response;
        // }else{
        //     const response = await api.post("/baixa", obj);
        //     return response;
        // }
    } catch (error) {
        console.error("Erro ao buscar:", error);
        return { error: error.message, message: error?.response?.data };
    }
};
const saveBaixa = async (tipoMovimentacao, obj) => {
    try {
        if(obj.id_movimentacao_mov){
            const response = await api.put(`/movimentacao/${tipoMovimentacao}/${obj.id_movimentacao_mov}`, obj);
            return response;
        }else{
            const response = await api.post(`/movimentacao/${tipoMovimentacao}`, obj);
            return response;
        }
    } catch (error) {
        console.error("Erro ao buscar:", error);
        return { error: error.message, message: error?.response?.data };
    }
};

export { deleteBaixa, getBaixas, saveBaixa };

