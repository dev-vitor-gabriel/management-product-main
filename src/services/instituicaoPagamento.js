
import api from "./api";


const getInstituicaoPagamento = async () => {
    try {
        const response = await api.get("/instituicaoPagamento");

        return response.data.items;
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
};

const deleteInstituicaoPagamento = async (id) => {
    try {
        await api.delete(`/instituicaoPagamento/${id}`)
        return true
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
};
const saveInstituicaoPagamento = async (obj) => {
    try {
        if(obj.id_instituicao_pagamento_tip){
            await api.put(`/instituicaoPagamento/${obj.id_instituicao_pagamento_tip}`, obj, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }else{
            await api.post("/instituicaoPagamento", obj, {
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


export { deleteInstituicaoPagamento, getInstituicaoPagamento, saveInstituicaoPagamento };

