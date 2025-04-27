
import api from "./api";


const getUnidade = async () => {
    try {
        const response = await api.get("/unidade");
        
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar:", error);
        return [];
    }
};

const deleteUnidade = async (id) => {
    try {
        await api.delete(`/unidade/${id}`)
        return true
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
};
const saveUnidade = async (obj) => {
    try {
        if(obj.id_unidade_und){
            await api.put(`/unidade/${obj.id_unidade_und}`, obj, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }else{
            await api.post("/unidade", obj, {
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


export { deleteUnidade, getUnidade, saveUnidade };

