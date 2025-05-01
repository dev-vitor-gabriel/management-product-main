
import api from "./api";


const getCargo = async () => {
    try {
        const response = await api.get("/cargo");

        return response.data.items;
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
};

const deleteCargo = async (id) => {
    try {
        await api.delete(`/cargo/${id}`)
        return true
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
};
const saveCargo = async (obj) => {
    try {
        if(obj.id_cargo_tcg){
            await api.put(`/cargo/${obj.id_cargo_tcg}`, obj, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }else{
            await api.post("/cargo", obj, {
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


export { deleteCargo, getCargo, saveCargo };

