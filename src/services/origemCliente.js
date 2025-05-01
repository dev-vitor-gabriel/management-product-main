
import api from "./api";


const getOrigemCliente = async () => {
    try {
        const response = await api.get("/origemCliente");

        return response.data;
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
};

const deleteOrigemCliente = async (id) => {
    try {
        await api.delete(`/origemCliente/${id}`)
        return true
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
};
const saveOrigemCliente = async (obj) => {
    
    try {
        if(obj.id_origem_cliente_orc){
            await api.put(`/origemCliente/${obj.id_origem_cliente_orc}`, obj, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }else{
            await api.post("/origemCliente", obj, {
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


export { deleteOrigemCliente, getOrigemCliente, saveOrigemCliente };

