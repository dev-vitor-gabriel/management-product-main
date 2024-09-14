import api from "./api";


const getEstoqueMaterial = async () => {
    try {
        const response = await api.get(`/estoqueQuantidadeMaterial/estoque-materiais`);

        return response.data;
    } catch (error) {
        // console.error("Erro ao buscar:", error);
        return [];
    }
};

export { getEstoqueMaterial };
