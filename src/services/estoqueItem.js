import api from "./api";


const getEstoqueMaterial = async () => {
    try {
        const response = await api.get(`/estoqueItem`);

        return response.data;
    } catch (error) {
        // console.error("Erro ao buscar:", error);
        return [];
    }
};

export { getEstoqueMaterial };
