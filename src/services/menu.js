import api from "./api";


export async function getMenus() {
    try {
        const response = await api.get(`/menu`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
}

export async function getEmpresaMenu(id_empresa_emp) {
    try {
        const response = await api.get(`/empresa-menu/${id_empresa_emp}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
}

export async function salvarEmpresaMenu(empresas) {
    try {
        const response = await api.post(`/empresa-menu`, empresas);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }

}