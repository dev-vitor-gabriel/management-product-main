
import api from "./api";


const getInstituicaoPagamento = async () => {
    try {
        const response = await api.get("/instituicaoPagamento");
        // const response = [
        //     {
        //         id_instituicao_pagamento_tip:1,
        //         desc_metodo_pagamento_tmp:'Pix',
        //         created_at:'2023-01-01',
        //         updated_at:'2023-01-01'
        //     },
        //     {
        //         id_instituicao_pagamento_tip:2,
        //         desc_metodo_pagamento_tmp:'Dinheiro',
        //         created_at:'2023-01-01',
        //         updated_at:'2023-01-01'
        //     },
        // ];
        return response.data;
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

