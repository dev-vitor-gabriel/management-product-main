import api from "./api";

export async function getSales() {
    return await api.get("/venda");
}

export async function getSale(saleId) {
    return await api.get(`/venda/${saleId}`);
}

export async function getSaleProducts(saleId) {
    const response = await api.get(`/venda/${saleId}/materiais`);
    return response.data;
}

export async function finalizarSale(saleId) 
{
    const response = await api.patch(`/venda/${saleId}/finalizar`);
    return response.data;
}

export async function cancelarSale(saleId) 
{
    const response = await api.patch(`/venda/${saleId}/cancelar`);
    return response.data;
}