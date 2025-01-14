import api from "./api";

export async function getSales() {
    return await api.get("/venda");
}

export function getSaleProducts(saleId) {
    return []
}

export function saveSales() {
    return;
}