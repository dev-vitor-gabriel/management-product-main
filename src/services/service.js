
import api from "./api";


const getServices = async () => {
    try {
        const response = await api.get("/servico/");
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
};

const deleteService = async (id) => {
    try {
        await api.delete(`/servico/${id}`)
        return true
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
};

const finalizarService = async (id) => {
    try {
        await api.patch(`/servico/${id}`)
        return true
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
};

const saveServices = async (obj) => {
    try {
        if(obj.id_servico_ser){
            const response = await api.put(`/servico/${obj.id_servico_ser}`, obj);
            return response;
        }else{
            const response = await api.post("/servico", obj);
            return response;
        }
    } catch (error) {
        console.error("Erro ao buscar:", error);
        return { error: error.message, message: error?.response?.data };
    }
};

export { getServices, saveServices, deleteService, finalizarService };
