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
export async function getUsuarioMenu(id) {
    try {
        const response = await api.get(`/usuario-menu/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
}

export async function salvarUsuarioMenu(usuario) {
    try {
        const response = await api.post(`/usuario-menu`, usuario);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }

}

export async function getMenusEmpresa()
{
    try {
        const response = await api.get(`/empresa-menu`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
}