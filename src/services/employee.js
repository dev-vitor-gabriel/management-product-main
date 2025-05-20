
import api from "./api";


const getEmployee = async (id_centro_custo) => {
    try {
        const response = await api.get(`/funcionario?id_centro_custo_tfu=${id_centro_custo}`);

        return response.data;
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
};

const getEmployeeById = async (id) => {
    try {
        const response = await api.get("/funcionario");

        return response.data;
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
};


export { getEmployee };
