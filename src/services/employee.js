
import api from "./api";


const getEmployee = async () => {
    try {
        const response = await api.get("/funcionario");

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
