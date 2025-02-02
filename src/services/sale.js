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

export function saveSales() {
    return;
}