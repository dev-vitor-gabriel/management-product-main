import api from "./api";

export async function getCentroCustoUsuario(userId) {
    try {
        const response = await api.get(`/usuarioCentroCusto/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
}
export async function createCentroCustoUsuario(usuarioCentroCusto) {
    try {
        const response = await api.post(`/usuarioCentroCusto`, usuarioCentroCusto);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
}