import api from "./api";

const getServiceDashboard = async (cost_center, initial_date, final_date) => {
    try {
        const response = await api.get(`/servico/dashboard?centros_custo=${cost_center}&data_inicio=${initial_date}&data_fim=${final_date}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
};

const getTopSevenServicesTypes = async (cost_center, initial_date, final_date) => {
    try {
        const response = await api.get(`/servico/topSevenServiceTypes?centros_custo=${cost_center}&data_inicio=${initial_date}&data_fim=${final_date}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
};

const getServicesByEmployee = async (cost_center, initial_date, final_date) => {
    try {
        const response = await api.get(`/servico/servicesByEmployee?centros_custo=${cost_center}&data_inicio=${initial_date}&data_fim=${final_date}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
};

export { getServiceDashboard, getTopSevenServicesTypes, getServicesByEmployee };