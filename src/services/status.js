import api from "./api";

export class OrigemStatus {
    static Venda = 0
}

export class StatusVenda {
    static Aberta = 0
    static Negociando = 1
    static Finalizada = 2
}

export async function getStatusByOrigem(origem_sts) {
    const response = await api.get(`/status/${origem_sts}/getByOrigem`);
    return response.data;
}