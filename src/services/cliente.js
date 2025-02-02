
import api from "./api";


const getCliente = async () => {
    try {
        const response = await api.get("/cliente");
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

