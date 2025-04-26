
import api from "./api";


const getFuncionario = async () => {
    try {
        const response = await api.get("/funcionario");

        return response.data;
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
};

const deleteFuncionario = async (id) => {
    try {
        await api.delete(`/funcionario/${id}`)
        return true
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
};
const saveFuncionario = async (obj) => {
    try {
        const response = await api.post("/funcionario", obj, {
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


export { deleteFuncionario, getFuncionario, saveFuncionario };

