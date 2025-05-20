
import api from "./api";


const getMaterial = async (verificarEstoque = false, id_centro_custo = null) => {
    try {
        const response = await api.get(`/material?verificarEstoque=$verificarEstoque${verificarEstoque}&id_centro_custo_mte=${id_centro_custo}` );

        return response.data;
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
};
const deleteMaterial = async (id) => {
    try {
        await api.delete(`/material/${id}`)
        return true
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
};
const saveMaterial = async (obj) => {
    try {
        const response = await api.post("/material", obj, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
        const success = true;
        return success;
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
};

export { deleteMaterial, getMaterial, saveMaterial };

