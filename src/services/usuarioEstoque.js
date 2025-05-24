import api from "./api";

export async function getUsuarioEstoque(userId) {
    try {
        const response = await api.get(`/usuario-estoque/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
}
export async function createUsuarioEstoque(usuarioEstoque) {
    try {
        const response = await api.post(`/usuario-estoque`, usuarioEstoque);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
}