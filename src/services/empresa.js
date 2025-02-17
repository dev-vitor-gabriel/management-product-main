import api from "./api";

let cachedPageNumber = 1;
let cachedPerPage = 10;
let cachedFilter = '';

export async function getCompanies(filter, pageNumber, perPage) {
    cachedFilter = filter ?? cachedFilter
    cachedPageNumber = pageNumber ?? cachedPageNumber;
    cachedPerPage = perPage ?? cachedPerPage;
    
    try {
        const response = await api.get(`/empresa?&filter=${cachedFilter}&per_page=${cachedPerPage}&page_number=${cachedPageNumber}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
};