import api from "./api";

let cachedPageNumber = 1;
let cachedPerPage = 10;
let cachedFilter = 10;

export async function getSales(filter, pageNumber, perPage) {
    cachedFilter = filter || cachedFilter;
    cachedPageNumber = pageNumber || cachedPageNumber;
    cachedPerPage = perPage || cachedPerPage;
    
    try {
        const response = await api.get(`/venda?&per_page=${cachedPerPage}&page_number=${cachedPageNumber}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
};
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