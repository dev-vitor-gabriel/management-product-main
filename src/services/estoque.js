
import api from "./api";


const getEstoque = async () => {
    try {
        const response = await api.get("/estoque");
        return response.data.data;
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
};

const deleteEstoque = async (id) => {
    try {
        await api.delete(`/estoque/${id}`)
        return true
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
};
const saveEstoque = async (obj) => {
    try {
        if(obj.id_estoque_est){
            await api.put(`/estoque/${obj.id_estoque_est}`, obj, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }else{
            await api.post("/estoque", obj, {
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


export { deleteEstoque, getEstoque, saveEstoque };

