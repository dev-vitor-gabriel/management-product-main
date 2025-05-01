
import api from "./api";


const getMaterial = async () => {
    try {
        const response = await api.get("/material");

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

