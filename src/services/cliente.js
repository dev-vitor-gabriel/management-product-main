
import api from "./api";


const getCliente = async () => {
    try {
        const response = await api.get("/cliente");
        // const response = [
        //     {
        //         id_cliente_cli:1,
        //         desc_metodo_pagamento_tmp:'Pix',
        //         created_at:'2023-01-01',
        //         updated_at:'2023-01-01'
        //     },
        //     {
        //         id_cliente_cli:2,
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

const deleteCliente = async (id) => {
    try {
        await api.delete(`/cliente/${id}`)
        return true
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
};
const saveCliente = async (obj) => {
    try {
        if(obj.id_cliente_cli){
            await api.put(`/cliente/${obj.id_cliente_cli}`, obj, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }else{
            await api.post("/cliente", obj, {
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


export { deleteCliente, getCliente, saveCliente };

