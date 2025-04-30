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
        const response = await api.get(`/servico/topThreeEmployees?centros_custo=${cost_center}&data_inicio=${initial_date}&data_fim=${final_date}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
};

const getTopTenSaleMaterialsDashboard = async (cost_center, initial_date, final_date) => {
    try {
        const response = await api.get(`/venda/topMateriaisVendidos?centros_custo=${cost_center}&data_inicio=${initial_date}&data_fim=${final_date}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
};

const getTopTenSaleValueDashboard = async (cost_center, initial_date, final_date) => {
    try {
        const response = await api.get(`/venda/topValorMateriaisVendidos?centros_custo=${cost_center}&data_inicio=${initial_date}&data_fim=${final_date}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
};

const getTopFuncionariosPorVenda = async (cost_center, initial_date, final_date) => {
    try {
        const response = await api.get(`/venda/topFuncionariosPorVenda?centros_custo=${cost_center}&data_inicio=${initial_date}&data_fim=${final_date}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
};

const getTopVendasPorCentroCusto = async (cost_center, initial_date, final_date) => {
    try {
        const response = await api.get(`/venda/topVendasPorCentroCusto?centros_custo=${cost_center}&data_inicio=${initial_date}&data_fim=${final_date}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
};

const getTopVendasPorCliente = async (cost_center, initial_date, final_date) => {
    try {
        const response = await api.get(`/venda/topVendasPorCliente?centros_custo=${cost_center}&data_inicio=${initial_date}&data_fim=${final_date}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
};

const getTotalVendasPorOrigemCliente = async (cost_center, initial_date, final_date) => {
    try {
        const response = await api.get(`/venda/totalVendasPorOrigemCliente?centros_custo=${cost_center}&data_inicio=${initial_date}&data_fim=${final_date}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
};

export {
    getServiceDashboard,
    getTopSevenServicesTypes,
    getServicesByEmployee,
    getTopTenSaleMaterialsDashboard,
    getTopTenSaleValueDashboard,
    getTopFuncionariosPorVenda,
    getTopVendasPorCentroCusto,
    getTopVendasPorCliente,
    getTotalVendasPorOrigemCliente
};